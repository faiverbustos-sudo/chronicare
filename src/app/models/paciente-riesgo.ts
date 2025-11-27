export interface PacienteRiesgoDTO {
  id_paciente: string;
  nombre: string;
  estado: string;
  nivel_riesgo: 'rojo' | 'amarillo' | 'verde';
  tipo_alerta: string | null;
  alerta_descripcion: string | null;
  fecha_alerta: string | null;
  tipo_registro: string | null;
  ultimo_valor: string | null;
}