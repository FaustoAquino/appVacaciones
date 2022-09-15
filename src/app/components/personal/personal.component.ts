import { Empleado } from './../../models/empleado.model';
import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  listEmpleados: any[] = [];
  accion = 'Agregar';
  form: FormGroup;
  id: number | undefined;
  myDate = new Date();
  isVacation: boolean;
  sentId: number;

  constructor(private fb: FormBuilder,
    private empleadoService: EmpleadoService,
    private datePipe: DatePipe) {
    this.form = this.fb.group({
    nombreEmpleado:['', Validators.required],
    ci:['', Validators.required],
    fechaNacimiento:['', Validators.required],
    nacionalidad:['', Validators.required],
    sexo:['', Validators.required],
    fechaInicio:['', Validators.required]
    })
    //this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  }
  ngOnInit(): void{
    console.log(this.myDate);
      this.obtenerDatosEmpleados();
  }

  obtenerDatosEmpleados(){
    this.empleadoService.obtenerTodosLosEmpleados().subscribe(data =>{
      console.log(data);
      this.listEmpleados = data;
    }, error => {
      console.log(error);
    }
    )
  }
  agregarEmpleado(){
    const empleado : any ={
      nombreEmpleado: this.form.get('nombreEmpleado')?.value,
      ci: this.form.get('ci')?.value,
      fechaNacimiento: this.form.get('fechaNacimiento')?.value,
      nacionalidad: this.form.get('nacionalidad')?.value,
      sexo: this.form.get('sexo')?.value,
      fechaInicio: this.form.get('fechaInicio')?.value
    }
    if(this.id == undefined){
      this.empleadoService.saveEmpleado(empleado).subscribe(data =>{
        alert("registro exitoso");
        this.obtenerDatosEmpleados();
        this.form.reset();
      }, error => {
        console.log(error);
      })
    }else{
      this.empleadoService.updateEmpleado(this.id, empleado).subscribe(data =>{
        this.form.reset();
        this.accion = 'Agregar';
        this.id = undefined;
        alert ("Los datos fueron actualizados ");
        this.obtenerDatosEmpleados();
      }, error => {
        console.log(error);
      }
      )
    }



  }
  eliminarEmpleado(id : number){
  this.empleadoService.deleteEmpleado(id).subscribe(data =>{
    alert("registro eliminado con exito");
    this.obtenerDatosEmpleados();
  }, error => {
    console.log(error);
  })

  }

  solicitarVacaciones(id: number) {
    this.isVacation = true;
    this.sentId = id;
  }

  editarDatosEmpleado(empleado:any){
    this.accion = 'Editar';
    this.id = empleado.id;

    //dia mes anio
    const A = new Date(empleado.fechaNacimiento);
    const B = new Date(this.myDate);
    const Timee = B.getTime() - A.getTime();
    const totalDaysWorked = Math.trunc(Timee / (1000 * 3600 * 24));
    const totalYearWorked = Math.trunc(totalDaysWorked / 365);

    if (totalYearWorked <= 5) {
      console.log('Años trabajados: '+totalYearWorked);
      console.log('Dias de vacacion: 15 dias de vacacion');
    } else if(totalYearWorked <= 10){
      console.log('Años trabajados: '+totalYearWorked);
      console.log('Dias de vacacion: 20 dias de vacacion');
    } else {
      console.log('Años trabajados: '+totalYearWorked);
      console.log('Dias de vacacion: 30 dias de vacacion');
    }

    this.form.patchValue({
      nombreEmpleado: empleado.nombreEmpleado,
      ci: empleado.ci,
      fechaNacimiento: formatDate(empleado.fechaNacimiento, 'yyyy-MM-dd', 'en'),
      nacionalidad: empleado.nacionalidad,
      sexo: empleado.sexo,
      fechaInicio: formatDate(empleado.fechaInicio, 'yyyy-MM-dd', 'en')
    })
  }

  onShowForm() : void {
    this.isVacation = false;
  }
}
