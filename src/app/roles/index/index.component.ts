import { Component } from '@angular/core';
import { Rol } from '../../modelos/roles.model';
import { Router } from '@angular/router';
import { RolService } from '../../servicios/roles.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule],
  providers: [RolService],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  listaRoles : Rol[] = [];
  clave: string | null = null;

  constructor(private _router: Router, private rolService: RolService){}

  ngOnInit():void{
    this.validarToken();
    this.cargarRoles();
  }

  validarToken(): void {
    if (this.clave==null) {
      this.clave = localStorage.getItem('access_token');
    } 
    if (!this.clave) {      
      this._router.navigate(['/inicio/body']);
    }
  }

  cargarRoles(){
    this.rolService.getRoles(this.clave).subscribe(
      data => {
        this.listaRoles = data;
      }, 
      err => {
        console.log(err);
      });
  }

  editarRol(id:any):void{
    this._router.navigateByUrl('/rol/edit/'+id);
  }

  eliminarRol(id:any):void{
    this.rolService.deleteRol(id, this.clave).subscribe(
      data => {
        this.cargarRoles();
      }, err => {
        console.log(err);   
      }
    );
  }
}
