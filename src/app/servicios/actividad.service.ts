import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Actividad } from '../modelos/actividad';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ActividadService {


  private apiUrl = 'http://192.168.56.1:8000/api'; // URL base de tu API Laravel

  constructor(private http:HttpClient) {}

  obtenerOptions(access_token:any):Object{
    const headers = new HttpHeaders({
      'Content-type' : 'application/json',
      'Authorization' : 'Bearer ' + access_token
    });
    return {
      'headers': headers
    }
  }

  getactividades(access_token:any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/auth/Actividad`, this.obtenerOptions(access_token));
  }

  addactividades(access_token:any, actividad: Actividad): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/Actividad`, actividad, this.obtenerOptions(access_token));
  }

  getactividad(access_token:any, id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/Actividad/${id}`, this.obtenerOptions(access_token));
  }

  updateactividades(access_token:any, id: string, actividad: Actividad): Observable<any> {
    return this.http.put(`${this.apiUrl}/auth/Actividad/${id}`, actividad, this.obtenerOptions(access_token));
  }

  deleteactividades(access_token:any, id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/auth/Actividad/${id}`, this.obtenerOptions(access_token));
  }

  obtenerActividadesPorTipoMascota(id: number): Observable<Actividad[]> {
    return this.http.get<Actividad[]>(`${this.apiUrl}/obtenerActividadesMascota/${id}`);
  }

  asignarActividadTipoMascota(actividadId: number, tipoMascotaId: any[], access_token: any): Observable<any> {
    const body = {
      actividad_id: actividadId,
      tipo_mascota_id: tipoMascotaId
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    });

    return this.http.post<any>(`${this.apiUrl}/asignar-actividad-tipo-mascota`, body, { headers });
  }

  

}
