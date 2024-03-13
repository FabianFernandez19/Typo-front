import { Component } from '@angular/core';
import { AgendamientoService } from '../../servicios/agendamiento.service';
import { Agendamiento } from '../../modelos/agendamiento';
import { Router } from '@angular/router';
import { Usuario } from '../../modelos/usuarios.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule],
  providers: [AgendamientoService],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

  listaagendamientos:Agendamiento []=[];

  clave: string | null = null;
  usuario: Usuario | null = null;

  constructor(private agendamientoservice: AgendamientoService,
    private _router: Router){}

    ngOnInit(): void {
      this.validarToken();
      this.cargarAgendamientos();
    }

    validarToken(): void{
   
      if(this.clave==null){
        this.clave=localStorage.getItem("access_token");
    
      }
      if (!this.clave){
        this._router.navigate(['agendamiento/index']);
      }
    
    }




    cargarAgendamientos(): void {
      this.agendamientoservice.getagendamientos(this.clave).subscribe(
        data => {
          this.listaagendamientos = data; // Asigna los datos a listaagendamientos
        },
        err => {
          console.log(err);
        }
      );
    }
    


}
