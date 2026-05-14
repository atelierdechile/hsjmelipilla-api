# Autenticación Google OAuth + Roles
## Propuesta de Implementación

**Proyecto:** Hospital San José — Melipilla  
**Mayo 2026**

---

## Situación Actual

| | |
|---|---|
| Login | `admin` / `1234` — hardcodeado en el código |
| Seguridad | ❌ Cualquiera con la URL puede acceder a datos clínicos |
| Roles | ❌ Existen en el mock pero no se aplican |
| APIs | ❌ Completamente públicas — sin autenticación |

---

## Lo que ya tenemos (aprovechable)

✅ Django + DRF en el backend  
✅ JWT configurado (solo falta activarlo)  
✅ PostgreSQL en Render  
✅ Frontend con estructura de rutas protegidas  
✅ Roles ya definidos: `admin`, `medico`, `enfermeria`

---

## Solución Propuesta

```
USUARIO ───► Google ───► Frontend ───► Backend Django
(Gmail)     (OAuth)      (React)       (valida token +
                                        emite JWT +
                                        controla roles)
```

**El usuario entra con su Gmail. El backend sabe quién es y qué puede hacer.**

---

## Cómo funciona

1. Usuario hace clic en **"Ingresar con Google"**
2. Selecciona su cuenta de Gmail
3. Google firma digitalmente su identidad
4. Backend valida la firma con Google
5. Backend crea o recupera el usuario + su rol
6. Backend entrega un token JWT al frontend
7. Cada llamada a la API lleva ese token
8. Backend solo permite lo que el rol del usuario puede hacer

---

## Beneficios

| Antes | Después |
|---|---|
| `admin:1234` | Cada quien entra con su Gmail |
| Cualquiera accede a todo | Solo lo que su rol permite |
| Sin registro de actividad | Trazabilidad completa |
| Agregar usuario = editar código | Admin asigna roles desde el panel |

---

## Costos

| Concepto | Costo |
|---|---|
| Google OAuth | **$0** — gratuito |
| Google Cloud Console | **$0** |
| Desarrollo (~22 hrs hombre) | Inversión interna |

**No hay costos recurrentes ni licencias.**

---

## Timeline — 3 días hábiles

```
DÍA 1 (8 hrs)
  ├── Configurar Google Cloud (1.5 hrs)
  ├── Agregar JWT al backend (0.5 hrs)
  ├── Modelo de roles en base de datos (1.5 hrs)
  ├── Endpoint de login con Google (3 hrs)
  └── Sistema de permisos por rol (2 hrs)

DÍA 2 (7.5 hrs)
  ├── Botón "Ingresar con Google" (2 hrs)
  ├── Flujo de autenticación frontend (2 hrs)
  ├── APIs protegidas con token (1.5 hrs)
  └── Interfaz según rol del usuario (2 hrs)

DÍA 3 (5 hrs)
  ├── Variables de entorno y configuración (0.5 hrs)
  ├── Testing completo (2 hrs)
  └── Deploy a producción (0.5 hrs)
```

---

## ¿Hay riesgo de romper algo?

**No.** Se implementa en 3 fases sin afectar lo existente:

```
FASE 0 ──► Solo preparamos el backend
           APIs siguen públicas. Nada cambia.

FASE 1 ──► Agregamos login con Google
           Convive con el login actual. El usuario elige.

FASE 2 ──► Activamos seguridad por endpoint
           Migramos uno por uno. Si algo falla,
           revertimos en 5 minutos.
```

---

## Veredicto

**Factibilidad:** 10/10 — Django + Google OAuth es un combo probado.

**Riesgo:** Bajo — implementación aditiva, no destructiva.

**Tiempo:** 3 días hábiles.

**Inversión:** Solo horas de desarrollo. Google no cobra.

**¿Por qué hacerlo?** Porque tener `admin:1234` protegiendo datos de un hospital no es aceptable en producción.
