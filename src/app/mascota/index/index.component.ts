import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { mascotaService } from '../../servicios/mascota.service';
import { Mascota } from '../../modelos/mascota.model';
import { ActivatedRoute, Router } from '@angular/router';
//import { GlobalComponent } from '../../global/global.component';



@Component({
  selector: 'app-index',
  standalone: true,
  providers: [mascotaService],
  imports: [CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  listaMascotas: Mascota[] = [];
  user_id: string | null;
  clave: string | null = null;



  constructor(private mascotasService: mascotaService,
    private _router: Router, private aRoute: ActivatedRoute) {
    this.user_id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.validarToken();
    this.cargarMascotas();

  }

  validarToken(): void {
    if (this.clave == null) {
      this.clave = localStorage.getItem('access_token');
    }
    if (!this.clave) {
      this._router.navigate(['/inicio/body']);
    }

    console.log(this.clave);


  }


  cargarMascotas(): void {
    this.mascotasService.getMascotasByUserId(this.user_id, this.clave).subscribe(data => {
      this.listaMascotas = data;
    },
      err => {
        console.log(err);
      });
  }
  eliminarMascota(id: any): void {
    this.mascotasService.deleteMascota(id, this.clave).subscribe(data => {
      this.cargarMascotas();
    },
      err => {
        console.log(err);
      });
  }

  editarMascota(id: any): void {
    this._router.navigateByUrl("/mascota/editar/" + id+ "/"+this.user_id);
  }
}
