# Informe: Implementación de Autenticación Google OAuth + Sistema de Roles

> **Proyecto:** Hospital San José — Melipilla  
> **Fecha:** Mayo 2026  
> **Propósito:** Evaluar viabilidad, complejidad y timeline de implementación

---

## 1. Diagnóstico del Estado Actual

### Arquitectura del proyecto

```
                   ┌──────────────────────┐
                   │   Frontend (Vite)     │
                   │  React + Vanilla HTML │
                   └──────┬───────────────┘
                          │ APIs HTTP
                          ▼
              ┌───────────────────────┐
              │  Backend Render (PROD)│  ← El que realmente usa el frontend
              │  Django + PostgreSQL  │
              │  SIN AUTENTICACIÓN    │
              └───────────────────────┘

              ┌───────────────────────┐
              │  Backend Local (DEV)  │  ← No conectado al frontend
              │  Django + SQLite      │
              │  CON JWT (no usado)   │
              └───────────────────────┘
```

### Problemas identificados

| Problema | Riesgo |
|---|---|
| Login hardcodeado: `admin:1234`, `doctor:1234` | Cualquiera con acceso a la URL entra al sistema |
| Sin sesiones reales | No hay forma de saber quién hizo qué |
| Sin roles funcionales | Los roles existen en el mock pero no se aplican en backend |
| APIs completamente públicas | Cualquiera puede leer/modificar datos clínicos |
| Backend local con JWT aislado | Tiene la estructura pero no está integrado |

### Lo que ya existe (aprovechable)

- ✅ Django + DRF en ambos backends
- ✅ `rest_framework_simplejwt` ya configurado en backend local
- ✅ PostgreSQL en Render lista para migraciones
- ✅ `django-cors-headers` ya instalado
- ✅ Frontend React con sistema de rutas protegidas (mock)
- ✅ Estructura de roles definida: `admin`, `medico`, `enfermeria`

---

## 2. Solución Propuesta

### Arquitectura final

```
  ┌──────────────┐     Google OAuth     ┌──────────────────┐
  │   USUARIO    │◄────────────────────►│  Google Cloud    │
  │  (Gmail)     │                      │  OAuth 2.0       │
  └──────┬───────┘                      └──────────────────┘
         │
    ID Token (JWT de Google)
         │
         ▼
  ┌──────────────────────────────────────┐
  │     Frontend (Vite + React)          │
  │  - Botón "Ingresar con Google"       │
  │  - Envía token a backend             │
  │  - Recibe JWT propio + rol            │
  │  - UI condicional según rol          │
  └──────────────┬───────────────────────┘
                 │ Authorization: Bearer <JWT>
                 ▼
  ┌──────────────────────────────────────┐
  │     Backend Render (Django)          │
  │  - Valida token de Google            │
  │  - Crea/recupera usuario + rol       │
  │  - Emite JWT propio (simplejwt)      │
  │  - Protege endpoints por rol         │
  └──────────────────────────────────────┘
```

### Flujo de autenticación

```
1. Usuario hace clic en "Ingresar con Google"
2. Google muestra selector de cuentas
3. Usuario selecciona su Gmail corporativo
4. Google devuelve un ID Token (JWT firmado por Google)
5. Frontend envía el ID Token al backend: POST /api/auth/google/
6. Backend valida el token (firma + expiración) con Google
7. Backend busca usuario por email; si no existe, lo crea
8. Backend asigna rol (definido por admin en panel)
9. Backend devuelve: { access_token, refresh_token, user: { name, email, rol } }
10. Frontend guarda tokens + rol en localStorage/memory
11. Todas las API calls incluyen: Authorization: Bearer <access_token>
12. Backend verifica el JWT + permisos de rol en cada request
```

---

## 3. Plan de Implementación — Ruta más rápida

### Enfoque: Implementación paralela + MVP por fases

```
SEMANA 1:        │ SEMANA 2:
─────────────────┼─────────────────
Backend MVP      │ Frontend MVP
Google Cloud     │ Roles UI
                 │ Testing + Deploy
```

### DÍA 1 — Backend + Google Cloud (paralelo)

| Tarea | Detalle | Dependencias | Horas |
|---|---|---|---|
| **A. Google Cloud Console** | Crear proyecto, configurar pantalla consentimiento (Internal), credenciales OAuth 2.0, dominios autorizados | Ninguna | 1.5 |
| **B. Backend: JWT** | Agregar `rest_framework_simplejwt` a `settings.py`, configurar ACCESS_TOKEN_LIFETIME=8h, REFRESH_TOKEN_LIFETIME=24h | Ninguna | 0.5 |
| **C. Backend: UserProfile** | Modelo con `user (FK)`, `rol (CharField choices)`, migración + admin | Ninguna | 1.5 |
| **D. Backend: Google endpoint** | Endpoint `POST /api/auth/google/` — recibe token, valida con `google-auth`, crea usuario, emite JWT + rol | A, B, C | 3 |
| **E. Backend: permisos** | Custom permission class `HasRole('admin')`, decoradores por endpoint | C | 2 |

**Total Día 1: ~8 horas** (paralelizable: A y B simultáneos)

### DÍA 2 — Frontend

| Tarea | Detalle | Dependencias | Horas |
|---|---|---|---|
| **F. Google Login button** | Instalar `@react-oauth/google`, envolver `<App />` con `GoogleOAuthProvider`, botón en LoginPage | A (Client ID) | 2 |
| **G. Auth flow frontend** | Enviar token a backend, recibir JWT, guardar sesión, redirigir | D, F | 2 |
| **H. API auth layer** | Modificar `api.js` para incluir `Authorization: Bearer` en headers, refrescar token si expira | G | 1.5 |
| **I. UI por roles** | Mostrar/ocultar menús, secciones y acciones según `rol` | G | 2 |

**Total Día 2: ~7.5 horas**

### DÍA 3 — Pulido + Deploy

| Tarea | Detalle | Horas |
|---|---|---|
| **J. Sincronizar login legacy** | Adaptar `login.html` y `js/auth.js` al mismo flujo (opcional, se puede dejar mock) | 2 |
| **K. Variables de entorno** | Configurar `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` en Render Dashboard | 0.5 |
| **L. Testing** | Probar flujo completo en staging + producción | 2 |
| **M. Deploy** | `git push` → Render auto-deploy, verificar | 0.5 |

**Total Día 3: ~5 horas**

### RESUMEN DE TIEMPO

| Fase | Horas | Días |
|---|---|---|
| Backend | 8 hrs | 1 día |
| Google Cloud | 1.5 hrs (paralelo) | — |
| Frontend | 7.5 hrs | 1 día |
| Deploy + testing | 5 hrs | 0.5 día |
| **Total neto** | **~22 hrs** | **~2.5 días** |
| **Total cronológico** | | **3 días hábiles** |

---

## 4. Riesgos y Mitigación

### ¿Se rompe algo existente?

| Riesgo | Probabilidad | Mitigación |
|---|---|---|
| APIs dejan de funcionar si cambiamos a `IsAuthenticated` | Alta si se hace de golpe | **Estrategia gradual**: primero agregar auth sin强制, luego migrar endpoint por endpoint |
| Base de datos actual se corrompe | Cero | Solo se agrega tabla `UserProfile`, no se modifican tablas existentes |
| Google OAuth no funciona en desarrollo local | Media | Usar `ngrok` o configurar redirect URIs localhost |
| Token de Google expira | Baja | Los ID tokens duran 1 hora; usar refresh token de Google para sesiones largas |

### Plan de mitigación principal

```
FASE 0 (Preparación - 0 riesgo)
└── Agregar JWT + UserProfile al backend
    └── APIs siguen públicas (AllowAny)
    └── Frontend sigue funcionando igual

FASE 1 (Google login - bajo riesgo)
└── Agregar endpoint /api/auth/google/
└── Agregar botón Google en frontend
    └── Convive con login mock actual
    └── Usuario elige cómo entrar

FASE 2 (Proteger APIs - riesgo controlado)
└── Endpoint por endpoint: AllowAny → IsAuthenticated
└── Frontend ya envía tokens en FASE 1
└── Rollback: git revert + redeploy en 5 min
```

---

## 5. Beneficios Cuantitativos

| Métrica | Antes | Después |
|---|---|---|
| Seguridad de acceso | ❌ `admin:1234` hardcodeado | ✅ OAuth Google con 2FA corporativo |
| Roles funcionales | ❌ Mock en frontend | ✅ Validados en backend por endpoint |
| Trazabilidad | ❌ Ninguna | ✅ Cada request tiene usuario autenticado |
| Cumplimiento normativo | ❌ No aplica | ✅ Resolución 3280 (trazabilidad de accesos) |
| Mantenimiento | ❌ Passwords en código fuente | ✅ Gestión centralizada vía Google Workspace |
| Onboarding de personal | ❌ Crear usuario manual en código | ✅ Auto-registro con Gmail corporativo |
| Tiempo de login | ~2 seg (mock simulado) | ~1 seg (Google One Tap) |

---

## 6. Recomendación Final

**Factibilidad:** 10/10 — Django tiene soporte nativo para OAuth, JWT y roles. El proyecto ya tiene toda la infraestructura.

**Riesgo:** Bajo — implementación aditiva sin tocar la lógica de negocio existente.

**Tiempo mínimo:** **3 días hábiles** con un desarrollador full-stack.

**Costo estimado (desarrollo):** ~22 horas hombre.

**Veredicto:** Implementar Google OAuth es la mejora con mayor impacto en seguridad por menor esfuerzo que se puede hacer en este proyecto. No hay razón técnica para no hacerlo.

---

*¿Necesitas que ajuste algo o profundice en alguna sección específica?*
