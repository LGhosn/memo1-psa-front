export interface Usuario {
  nombre: string
  apellido: string
  legajo: number
}

export interface Cliente {
  id: string
  razon_social: string
  cuit: number
}

export enum Status {
  NOT_STARTED = "NO INICIADO",
  IN_PROGRESS = "EN PROGRESO",
  COMPLETED = "COMPLETADO",
  BLOCKED = "BLOQUEADO"
}


export enum StatusPath {
  NOT_STARTED = "notStarted",
  IN_PROGRESS = "inProgress",
  COMPLETED = "completed",
  BLOCKED = "blocked"
}