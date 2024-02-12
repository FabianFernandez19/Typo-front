import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tipomascotaService } from '../../servicios/tipomascota.service';
//import { Tipomascota } from '../../modelos/tipomascota.model';
import { tipomascota } from '../../modelos/tipomascota';
import { Router } from '@angular/router';
import { Usuario } from '../../modelos/usuarios.model';


@Component({
  selector: 'app-index',
  standalone: true,
  providers: [tipomascotaService],
  imports: [CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  listaTipomascotas:tipomascota []=[];

  clave: string | null = null;
  usuario: Usuario | null = null;

  constructor(private tipomascotasService: tipomascotaService,
    private _router: Router){}

    ngOnInit(): void {
      this.validarToken();
      this.cargarTipomascotas();
    }
    validarToken(): void{
      if(this.clave==null){
        this.clave=localStorage.getItem("access_token");
    
      }
        //console.log(this.clave);
      if (!this.clave){
        this._router.navigate(['tipomascota/index']);
      }
    
    }  

  cargarTipomascotas():void{
    this.tipomascotasService.gettipoMascotas(this.clave).subscribe(data=>{
      this.listaTipomascotas = data;
    },
    err =>{
      console.log(err);
    });
  }
  eliminarTipomascota(id:any): void {
    this.tipomascotasService. deletetipoMascota(this.clave, id).subscribe(data=>{
      this.cargarTipomascotas();
    },
    err =>{
      console.log(err);
    });
  }

  editarTipomascota(id:any): void {
    this._router.navigateByUrl("/tipomascota/editar/"+id);

  
  }

  agregarTipomascota(): void {
    this._router.navigateByUrl("/tipomascota/create");
  }
  
}
