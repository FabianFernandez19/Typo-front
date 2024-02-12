import { Component } from '@angular/core';
import { Rol } from '../../../modelos/roles.model';
import { Router } from '@angular/router';
import { RolService } from '../../../servicios/roles.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [RolService],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  id: string | null = null;
  listaRoles : Rol[] = [];
  clave: string | null = null;

  rolForm = this.fb.group({
    name: ''
  });

  constructor(private fb: FormBuilder, private _router: Router, private rolService: RolService){}

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

  editarRoles(id:any):void{
    this._router.navigateByUrl('/rol/edit/'+id);
  }

  CrearRol(): void {
    const rol: Rol = {
      name:this.rolForm.get('name')?.value,
    };
    console.log(rol);
  
    if (this.id !== null) {
      this.rolService.updateRol(rol, this.id, this.clave).subscribe(
        data => {
          this._router.navigate(['/rol/index']);
        },
        err => {
          console.log(err);
          this._router.navigate(['/rol/index']);
        }
      );
    } else {
      this.rolService.addRol(rol, this.clave).subscribe(
        data => {
          console.log(data);
          this._router.navigate(['/rol/index']);
        },
        err => {
          console.log(err);
          this._router.navigate(['/rol/index']);
        }
      );
    }
  }

  eliminarRoles(id:any):void{
    this.rolService.deleteRol(id, this.clave).subscribe(
      data => {
        this.cargarRoles();
      }, err => {
        console.log(err);   
      }
    );
  }
}
