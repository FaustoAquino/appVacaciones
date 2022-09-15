export class Empleado {
  idEmpleado: number;
  nombreEmpleado: string;
  ci: string;
  nacionalidad: string;
  sexo: string;
  fechaNacimiento: Date;
  fechaInicio: Date;

  constructor(param: Empleado) {
    this.idEmpleado = param.idEmpleado;
    this.nombreEmpleado = param.nombreEmpleado;
    this.ci = param.ci;
    this.nacionalidad = param.nacionalidad;
    this.sexo = param.sexo;
    this.fechaNacimiento = param.fechaNacimiento;
    this.fechaInicio = param.fechaInicio;
  }
}

