import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tipomascota } from '../modelos/tipomascota';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class tipomascotaService {

  url='http://127.0.0.1:8000/api/auth/Tipomascota/';
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

  gettipoMascotas(access_token:any):Observable<any>{
    return this.http.get<any>(this.url, this.obtenerOptions(access_token));
  }

  

  /*addtipoMascota(mascota:tipomascota, access_token:any ):Observable<any>{
    return this.http.post(this.url, mascota, this.obtenerOptions(access_token));
  }*/

  addtipoMascota(access_token:any, tipomascota:tipomascota):Observable<any>{
    const options = this.obtenerOptions(access_token);
    return this.http.post(this.url, tipomascota, options);
  }



  gettipoMascota(access_token:any, id:string ):Observable<any>{
    const options = this.obtenerOptions(access_token);
    return this.http.get(this.url+id, options);
  }



  updatetipoMascota(access_token:any, id:string, mascota:tipomascota): Observable<any>{
    const options = this.obtenerOptions(access_token);
    return this.http.put(this.url+id, mascota, options);
  }



  deletetipoMascota(access_token:any, id:string): Observable<any>{
    const options = this.obtenerOptions(access_token);
    return this.http.delete(this.url+id, options);
  }
}
