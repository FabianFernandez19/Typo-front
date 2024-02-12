import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from '../modelos/roles.model';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  url = 'http://127.0.0.1:8000/api/auth/rol/';
  
  obtenerOptions(access_token:any):Object{
    const headers = new HttpHeaders({
      'Content-type' : 'application/json',
      'Authorization' : 'Bearer ' + access_token
    });
    return {
      'headers': headers
    }
  }

  constructor(private http:HttpClient) { }

  getRoles(access_token:any): Observable<any>{ 
    return this.http.get(this.url, this.obtenerOptions(access_token));
  }

  addRol(rol: Rol, access_token:any): Observable<any>{
    return this.http.post(this.url, rol, this.obtenerOptions(access_token));
  }

  getRol(id:any, access_token:any):Observable<any>{
    return this.http.get(this.url+id, this.obtenerOptions(access_token));
  }

  updateRol(rol:Rol, id:string, access_token:any): Observable<any>{
    return this.http.put(this.url+id, rol, this.obtenerOptions(access_token));
  }
  
  deleteRol(id:string, access_token:any):Observable<any>{
    return this.http.delete(this.url+id, this.obtenerOptions(access_token));
  }

  getPermisos(access_token:any): Observable<any>{ 
    return this.http.get(this.url, this.obtenerOptions(access_token));
  }
}
