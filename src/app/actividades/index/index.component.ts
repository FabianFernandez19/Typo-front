import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActividadService } from '../../servicios/actividad.service';
import { Actividad } from '../../modelos/actividad';
import { tipomascotaService } from '../../servicios/tipomascota.service';
import { tipomascota } from '../../modelos/tipomascota';

import { Router } from '@angular/router';
import { Usuario } from '../../modelos/usuarios.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule],
  providers: [ActividadService, tipomascotaService],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

  @ViewChild('tipo') tipo !: ElementRef; 

  listaactividades:Actividad []=[];
  listaTiposMascota: tipomascota[] = [];

  clave: string | null = null;
  usuario: Usuario | null = null;

  constructor(private actividadesService: ActividadService, private tipomascotaService: tipomascotaService,
    private _router: Router){}

    ngOnInit(): void {
      this.validarToken();
      this.cargarActividades();
      this.cargarTipos();
      
    }

    /*validarToken(): void {
      this._router.navigate(['actividad/index']);
    }*/

    validarToken(): void {
      if (this.clave == null) {
        this.clave = localStorage.getItem('access_token');
      }
      if (!this.clave) {
        this._router.navigate(['/inicio/body']);
      }
  
      //console.log(this.clave);
  
  
    }

    cargarTipos(): void {
      if (this.clave) {
        this.tipomascotaService.gettipoMascotas(this.clave).subscribe(
          data => {
            this.listaTiposMascota = data;
            //console.log('tipos',this.listaTiposMascota);
          },
          err => {
            console.log(err);
          }
        );
      } else {
        console.log("this.clave es null");
      }
    }




    cargarActividades(): void {
      if (this.clave) {
        this.actividadesService.getactividades(this.clave).subscribe(
          data => {
            this.listaactividades = data;
            //console.log('actividades',this.listaactividades);
          },
          err => {
            console.log(err);
          }
        );
      } else {
        console.log("this.clave es null");
      }
    }

    

    eliminarActividad(id:any): void {
      this.actividadesService. deleteactividades(this.clave, id).subscribe(data=>{
        this.cargarActividades();
      },
      err =>{
        console.log(err);
      });
    }

    editarActividad(id:any): void {
      this._router.navigateByUrl("/actividad/editar/"+id);
  
    
    }

    agregarActividad(): void {
      this._router.navigateByUrl("/actividad/create");
    }

    cargarActividadesPorTipoMascota(): void {
      var id = this.tipo.nativeElement.value;
      this.actividadesService.obtenerActividadesPorTipoMascota(id).subscribe(
        (data: Actividad[]) => {
          this.listaactividades = data;
          
        },
        (error) => {
          console.error(error);
        }
      );
    }
    

    


}
