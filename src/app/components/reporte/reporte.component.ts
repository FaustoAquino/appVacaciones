import { Empleado } from './../../models/empleado.model';
import { Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { formatDate } from '@angular/common';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {
  @Output() showForm = new EventEmitter<boolean>();
  @Input() idEmpleado : number;
  empleado: Empleado;
  myDate = new Date();

  constructor(private empleado$: EmpleadoService) { }

  ngOnInit(): void {
    console.log(this.idEmpleado);
    this.empleado$.obtenerEmpleado(this.idEmpleado).subscribe(r => {
      this.empleado = r;
    })
  }

  createReporte(){
    let dateBegin = new Date(this.empleado.fechaInicio);
    const dateCurrent = new Date(this.myDate);
    const Timee = dateCurrent.getTime() - dateBegin.getTime();
    const totalDaysWorked = Math.trunc(Timee / (1000 * 3600 * 24));
    const totalYearWorked = Math.trunc(totalDaysWorked / 366);
    const formatedBegin = formatDate(this.empleado.fechaInicio, 'yyyy-MM-dd', 'en')
    const pdfDefinition: any ={
      content: [
        {text: 'Recibo tiempo de vacaciones', style: 'header', fontSize: 30, alignment: 'center'},
        {text: 'Tabla de informacion de vacaciones: ', style: 'header', fontSize: 15, alignment: 'center'},
        {
          table: {
            body: [
              ['Nombre del empleado', 'CI', 'Inicio trabajo', 'Vacaciones correspondidas'],
              [this.empleado.nombreEmpleado, this.empleado.ci, formatedBegin, totalYearWorked == 0 ? 'No tienes vacaciones' :
                                                                              totalYearWorked <= 5 ? '  15 dias de vacacion' : totalYearWorked <= 10 ?
                                                                              '15 dias de vacacion' :'30 dias de vacacion']
            ]
          }
        }
      ]
    }

    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
  }

  volver() : void {
    this.showForm.emit(true);
  }

}
