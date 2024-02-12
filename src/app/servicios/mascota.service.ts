import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Mascota } from '../modelos/mascota.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class mascotaService {

  url='http://127.0.0.1:8000/api/auth/Informacion/';
  constructor(private http:HttpClient){
  }

  obtenerOptions(access_token:any):Object{
    const headers = new HttpHeaders({
      'Content-type' : 'application/json',
      'Authorization' : 'Bearer ' + access_token
    });
    return {
      'headers': headers
    }
  }



  getMascotas(access_token:any):Observable<any>{
    return this.http.get<any>(this.url, this.obtenerOptions(access_token));
  }

  addMascota(mascota:Mascota, access_token:any):Observable<any>{
    return this.http.post(this.url, mascota, this.obtenerOptions(access_token));
  }

  getMascota(id:string, access_token:any):Observable<any>{
    return this.http.get(this.url+id, this.obtenerOptions(access_token));
  }

  updateMascota(id:string, mascota:Mascota, access_token:any): Observable<any>{
    return this.http.put(this.url+id, mascota, this.obtenerOptions(access_token));
  }

  deleteMascota(id:string, access_token:any): Observable<any>{
    return this.http.delete(this.url+id, this.obtenerOptions(access_token));
  }

  getMascotasByUserId(id:any, access_token:any) : Observable<any> {
    return this.http.get(this.url+"user/"+id, this.obtenerOptions(access_token));
  }
}
