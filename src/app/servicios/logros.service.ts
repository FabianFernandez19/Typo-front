import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Logros } from '../modelos/logros';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LogrosService {

  url='http://127.0.0.1:8000/api/auth/logros/';
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

  getlogros(access_token:any):Observable<any>{
    //console.log(access_token);
    return this.http.get(this.url, this.obtenerOptions(access_token));
  }

  addlogro(access_token:any, logro:Logros):Observable<any>{
    const options = this.obtenerOptions(access_token);
    return this.http.post(this.url, logro, options);
  }

  getlogro(access_token:any, id:string ):Observable<any>{
    const options = this.obtenerOptions(access_token);
    return this.http.get(this.url+id, options);
  }

  updatelogro(access_token:any, id:string, logro:Logros): Observable<any>{
    const options = this.obtenerOptions(access_token);
    return this.http.put(this.url+id, logro, options);
  }

  deletelogro(access_token:any, id:string): Observable<any>{
    const options = this.obtenerOptions(access_token);
    return this.http.delete(this.url+id, options);
  }




}
