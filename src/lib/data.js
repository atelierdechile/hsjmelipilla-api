import { getNiveles } from "./api";

const GLOSAS_BASE = [
  { titulo: "Días Cama Disponibles", clave: "dias_cama_disponibles", descripcion: "Total de días disponibles." },
  { titulo: "Días Cama Ocupados", clave: "dias_cama_ocupados", descripcion: "Total de días ocupados." },
  { titulo: "Días de Estada", clave: "dias_estada", descripcion: "Días de hospitalización." },
  { titulo: "Promedio Cama Disponibles", clave: "promedio_camas", descripcion: "Promedio de camas disponibles." },
  { titulo: "Número de Egresos", clave: "numero_egresos", descripcion: "Total de egresos." },
  { titulo: "Egresos Fallecidos", clave: "fallecidos", descripcion: "Pacientes fallecidos." },
  { titulo: "Índice Ocupacional", clave: "indice_ocupacional", descripcion: "Porcentaje de ocupación." },
  { titulo: "Promedio Días de Estada", clave: "promedio_estada", descripcion: "Promedio de días de hospitalización." },
  { titulo: "Letalidad", clave: "letalidad", descripcion: "Porcentaje de fallecidos." },
  { titulo: "Índice de Rotación", clave: "indice_rotacion", descripcion: "Rotación de camas." },
  { titulo: "Traslados", clave: "traslados", descripcion: "Pacientes trasladados." },
];

export async function fetchHospitalData() {
  const niveles = await getNiveles();
  return {
    niveles: niveles.map((n) => ({
      codigo: n.codigo,
      nombre: n.nombre,
      nivel_cuidado: { tipo: n.tipo, color: n.color },
      egresos: n.egresos.map((e) => ({
        mes: e.mes.slice(0, 7),
        altas: e.altas,
        traslados: e.traslados,
        fallecidos: e.fallecidos,
        dias_cama_disponibles: e.dias_cama_disponibles,
        dias_cama_ocupados: e.dias_cama_ocupados,
        dias_estada: e.dias_estada,
      })),
    })),
    glosas_base: GLOSAS_BASE,
  };
}

export const MONTH_OPTIONS = [
  { value: "01", label: "Enero" },
  { value: "02", label: "Febrero" },
  { value: "03", label: "Marzo" },
  { value: "04", label: "Abril" },
  { value: "05", label: "Mayo" },
  { value: "06", label: "Junio" },
  { value: "07", label: "Julio" },
  { value: "08", label: "Agosto" },
  { value: "09", label: "Septiembre" },
  { value: "10", label: "Octubre" },
  { value: "11", label: "Noviembre" },
  { value: "12", label: "Diciembre" },
];

export function monthLabel(value, format = "short") {
  const month = value.includes("-") ? value.split("-")[1] : value;
  const found = MONTH_OPTIONS.find((item) => item.value === month);

  if (!found) {
    return value;
  }

  if (format === "long") {
    return found.label;
  }

  return found.label.slice(0, 3);
}

export function sum(items, key) {
  return items.reduce((total, item) => total + Number(item[key] || 0), 0);
}
