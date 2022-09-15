import { Empleado } from './../models/empleado.model';
import { Injectable } from "@angular/core";
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class EmpleadoService {
  private appUrl = 'https://localhost:44364/';
  private apiUrl = 'api/empleado/';

  constructor(private http: HttpClient) {}

  obtenerTodosLosEmpleados(): Observable<any>{
    return this.http.get(this.appUrl+ this.apiUrl);
  }

  obtenerEmpleado(idEmpleado: number): Observable<Empleado>{
    return this.http.get<Empleado>('https://localhost:44364/api/Empleado/GetEmpleado/'+idEmpleado);
  }

  deleteEmpleado(id:number): Observable<any>{
    return this.http.delete(this.appUrl + this.apiUrl + id);
  }

  saveEmpleado(empleado: any){
    return this.http.post(this.appUrl + this.apiUrl, empleado);
  }
  updateEmpleado(id: number, empleado: any): Observable<any>{
    return this.http.put(this.appUrl+ this.apiUrl+ id, empleado);
  }
}
