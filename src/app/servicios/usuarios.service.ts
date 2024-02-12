import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../modelos/usuarios.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = 'http://127.0.0.1:8000/api/auth/Usuario/';
  
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

  getUsuarios(access_token:any): Observable<any>{ 
    return this.http.get(this.url, this.obtenerOptions(access_token));
  }

  addUsuario(usuario: Usuario, access_token:any): Observable<any>{
    return this.http.post(this.url, usuario, this.obtenerOptions(access_token));
  }


  updateUsuario(usuario:Usuario, id:string, access_token:any): Observable<any>{
    return this.http.put(this.url+id, usuario, this.obtenerOptions(access_token));
  }
  
  deleteUsuario(id:string, access_token:any):Observable<any>{
    return this.http.delete(this.url+id, this.obtenerOptions(access_token));
  }
  
}