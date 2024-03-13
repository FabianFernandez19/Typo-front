import { Component } from '@angular/core';
import { ReporteService } from '../../servicios/reporte.service';
import { Reporte } from '../../modelos/reporte';
import { Router } from '@angular/router';
import { Usuario } from '../../modelos/usuarios.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule],
  providers: [ReporteService],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

  listareportes:Reporte []=[];

  clave: string | null = null;
  usuario: Usuario | null = null;


  constructor(private reporteservice: ReporteService,
    private _router: Router){}

    ngOnInit(): void {
      this.validarToken();
      this.cargarReportes();
    }

    validarToken(): void{
   
      if(this.clave==null){
        this.clave=localStorage.getItem("access_token");
    
      }
      if (!this.clave){
        this._router.navigate(['reporte/index']);
      }
    
    }


    cargarReportes(): void {
      this.reporteservice.getreportes(this.clave).subscribe(
        data => {
          console.log(data);
          this.listareportes = data; // Asigna los datos a listaagendamientos
        },
        err => {
          console.log(err);
        }
      );
    }
    




}
