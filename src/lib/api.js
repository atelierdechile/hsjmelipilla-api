const API_URL = import.meta.env.VITE_API_URL || "https://api-hospital-melipilla.onrender.com/api";

async function request(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const msg = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(msg.error || msg.detail || `Error ${res.status}`);
  }
  return res.json();
}

export function getNiveles() {
  return request("/niveles/");
}

export function getDashboardKPI() {
  return request("/dashboard/");
}

export function getCamas(filters = "") {
  return request(`/camas/${filters}`);
}

export function createCama(data) {
  return request("/camas/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateCama(id, data) {
  return request(`/camas/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function getServicios() {
  return request("/servicios/");
}

export function getServiciosGrd(filters = "") {
  return request(`/servicios-grd/${filters}`);
}

export function getOportunidadHospitalizacion(filters = "") {
  return request(`/oportunidad-hospitalizacion/${filters}`);
}
