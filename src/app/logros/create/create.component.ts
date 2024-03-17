import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { LogrosService } from '../../servicios/logros.service';
import { Logros } from '../../modelos/logros'; 



@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule,
  FormsModule,ReactiveFormsModule],
   providers: [LogrosService],
   templateUrl: './create.component.html',
   styleUrl: './create.component.scss'
  })
export class CreateComponent {
  value='';
  clave: string | null = null; 

  logroForm = this.fb.group({
    tipoLogro:'',
    tiempoSemanal:'',
    //dias:''
    
  })

  id: string | null;

  constructor(private fb: FormBuilder, private _router: Router, private logrosSevice: LogrosService, private aRoute: ActivatedRoute){
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
    if (!this.clave){
      this._router.navigate(['logros/index']);
    }
  
  } 
  
  
  verEditar(): void {
    if (this.id != null) {
      this.logrosSevice.getlogro(this.clave,this.id).subscribe(
        data => {
          console.log(data);
          this.logroForm.setValue({
            tipoLogro: data.tipoLogro,
            tiempoSemanal: data.tiempoSemanal,
            //dias: data.Dias
          })
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  agregarLogro(): void {

    // Obtener el valor de tiempoSemanal y asegurarse de que sea un string
    const tiempoSemanalValue = this.logroForm.get('tiempoSemanal')?.value;
    const tiempoSemanalString: string = typeof tiempoSemanalValue === 'string' ? tiempoSemanalValue : '';

    // Obtener el valor de días
   // const diasString: string | null | undefined = this.logroForm.get('dias')?.value;

  
    const logro: Logros = {
        tipoLogro: this.logroForm.get('tipoLogro')?.value,
        tiempoSemanal: tiempoSemanalString, // Asignar la cadena de tiempo directamente
       // dias: diasString ? parseInt(diasString, 10) : null // Convertir la cadena de días a un número entero o asignar null si no hay valor
    };

   
    if (this.id != null) {
        this.logrosSevice.updatelogro(this.clave, this.id, logro).subscribe(
            data => {
                this._router.navigate(['/logros/index']);
            },
            err => {
                console.log(err);
                this._router.navigate(['/logros/index']);
            }
        );

    } else {
        this.logrosSevice.addlogro(this.clave, logro).subscribe(data => {
            console.log(data);
            this._router.navigate(['/logros/index']);
        },
            err => {
                console.log(err);
                this._router.navigate(['/logros/index']);
            }
        );
    }
}





}

