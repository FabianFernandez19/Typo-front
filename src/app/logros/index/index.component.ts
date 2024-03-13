import { Component } from '@angular/core';
import { LogrosService } from '../../servicios/logros.service';
import { Logros } from '../../modelos/logros';
import { Router } from '@angular/router';
import { Usuario } from '../../modelos/usuarios.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule],
  providers: [LogrosService],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
  
  listalogros:Logros []=[];

  clave: string | null = null;
  usuario: Usuario | null = null;

  constructor(private logrosService: LogrosService,
    private _router: Router){}

    ngOnInit(): void {
      this.validarToken();
      this.cargarLogros();
    }

    validarToken(): void{
      //console.log("Token is valid");
      if(this.clave==null){
        this.clave=localStorage.getItem("access_token");
    
      }
      if (!this.clave){
        this._router.navigate(['logros/index']);
      }
    
    }
    
    cargarLogros():void{
      //console.log("Clave: " + this.clave);
      this.logrosService.getlogros(this.clave).subscribe(data=>{
        //console.log(data);
        this.listalogros = data;
      },
      err =>{
        console.log(err);
      });
    }

    eliminarLogros(id:any): void {
      this.logrosService. deletelogro(this.clave, id).subscribe(data=>{
        this.cargarLogros();
      },
      err =>{
        console.log(err);
      });
    }

    editarLogros(id:any): void {
      this._router.navigateByUrl("/logros/editar/"+id);
  
    
    }

    agregarLogros(): void {
      this._router.navigateByUrl("/logros/create");
    }







}
