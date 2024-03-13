import { Component } from '@angular/core';
import { Usuario } from '../../modelos/usuarios.model';
import { Router } from '@angular/router';
import { UsuarioService } from '../../servicios/usuarios.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule],
  providers: [UsuarioService],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  listaUsuarios : Usuario[] = [];
  clave: string | null = null;

  constructor(private _router: Router, private usuarioService: UsuarioService){}

  ngOnInit():void{
    this.validarToken();
    console.log(this.clave);
    
    this.cargarUsuarios();
  }

  validarToken(): void {
    if (this.clave==null) {
      this.clave = localStorage.getItem('access_token');
    }
    if (!this.clave) {
      this._router.navigate(['/inicio/body']);
    }

  }

  cargarUsuarios(){
    this.usuarioService.getUsuarios(this.clave).subscribe(

      data => {
      console.log(data);

        this.listaUsuarios = data;
      },
      err => {
        console.log(err);
      });
  }

  editarUsuario(id:any):void{
    this._router.navigateByUrl('/usuario/edit/'+id);
  }

  eliminarUsuario(id:any):void{
    this.usuarioService.deleteUsuario(id, this.clave).subscribe(
      data => {
        this.cargarUsuarios();
      }, err => {
        console.log(err);
      }
    );
  }

  verMascotas(id:any):void{
    this._router.navigateByUrl('/mascota/index/'+id);
  }
}
