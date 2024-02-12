import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { tipomascotaService } from '../../servicios/tipomascota.service';
//import { tipomascota } from '../../modelos/tipomascota.model';
import { tipomascota } from '../../modelos/tipomascota';


@Component({
  selector: 'app-create',
  standalone: true,
  providers: [tipomascotaService],
  imports: [CommonModule,
  FormsModule,ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  value='';
  clave: string | null = null;

  tipomascotaForm = this.fb.group({
    Tipo_Mascota:''
    
  })

  id: string | null;

  constructor(private fb: FormBuilder, private _router: Router, private tipomascotasSevice: tipomascotaService, private aRoute: ActivatedRoute){
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.validarToken();
    this.verEditar();
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

  verEditar(): void {
    if (this.id != null) {
      this.tipomascotasSevice.gettipoMascota(this.clave,this.id).subscribe(
        data => {
          this.tipomascotaForm.setValue({
            Tipo_Mascota: data.Tipo_Mascota
          
          })
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  agregarTipomascota(): void {
    const tipomascota: tipomascota = {
      Tipo_Mascota: this.tipomascotaForm.get('Tipo_Mascota')?.value,
 
    }
    console.log("Inicio",tipomascota);

    if (this.id != null) {
      console.log("eeeeeee");
      this.tipomascotasSevice.updatetipoMascota(this.clave, this.id, tipomascota).subscribe(
        data => {
          this._router.navigate(['/tipomascota/index']);
        },
        err => {
          console.log(err);
          this._router.navigate(['/tipomascota/index']);
        }
      );

    } else {
      console.log("-----------");
      this.tipomascotasSevice.addtipoMascota(this.clave,tipomascota).subscribe(data => {
        console.log(data);
        this._router.navigate(['/tipomascota/index']);
      },
        err => {
          console.log(err);
          this._router.navigate(['/tipomascota/index']);
        }
      );
    }
  }
}


