import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Agendamiento } from '../modelos/agendamiento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendamientoService {

  url='http://127.0.0.1:8000/api/auth/Agendamiento';
  constructor(private http:HttpClient) {  
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

  getagendamientos(access_token:any):Observable<any>{
    return this.http.get(this.url, this.obtenerOptions(access_token));
  }

  getagendamiento(access_token:any, id:string ):Observable<any>{
    const options = this.obtenerOptions(access_token);
    return this.http.get(this.url+id, options);
  }





}
