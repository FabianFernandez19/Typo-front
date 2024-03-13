import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ActividadService } from '../../servicios/actividad.service';
import { Actividad } from '../../modelos/actividad';
import { tipomascota } from '../../modelos/tipomascota';
import { tipomascotaService } from '../../servicios/tipomascota.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule,
  FormsModule,ReactiveFormsModule],
   providers: [tipomascotaService, ActividadService],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  actividadForm = this.fb.group({
    nombre_actividad: ['', Validators.required],
    descripcion_actividad: ['', Validators.required],
    checkArray: this.fb.array([], [Validators.required])
  })

  listaTiposMascota: tipomascota[]=[];
  clave: string | null = null;
  id: string | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private actividadService: ActividadService,
    private tipoMascotaService: tipomascotaService,
    ){

    this.id = this.aRoute.snapshot.paramMap.get('id');
    }

  ngOnInit(): void {
    this.validarToken();
    this.cargarTiposMascota();
    this.verEditar();
  }

  validarToken(): void {
    this.clave = localStorage.getItem('access_token') ;
  
    if (!this.clave) {
      this.router.navigate(['/actividad/index']);
    }
  }

  verEditar(): void {
    if (this.id != null) {
      this.actividadService.getactividad(this.clave,this.id).subscribe(
        data => {
          var tipos = data.tipomascota;
          var lista : string[] = [];
          tipos.forEach((element: { tipomascota_id: any; }) => {
            lista.push(""+element.tipomascota_id);
          });
          const dataLista: FormArray = new FormArray([...lista.map(item => new FormControl(item))]);
          this.actividadForm.setValue({
            nombre_actividad: data.nombre_actividad,
            descripcion_actividad: data.descripcion_actividad,
            checkArray: []
          });
          this.actividadForm.setControl('checkArray', dataLista);
          //console.log(dataLista);
          /*
          var tipos = data.tipomascota;
          var tiposMascotas = this.actividadForm.controls.checkArray;
          tiposMascotas.clear();
          tipos.forEach((element: { tipomascota_id: any; }) => {
            tiposMascotas.push(new FormControl(element.tipomascota_id));
          });
          console.log("tipoMascota", tiposMascotas);*/

          
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  

  cargarTiposMascota(): void {
    if (this.clave) {
      this.tipoMascotaService.gettipoMascotas(this.clave).subscribe(
        (data: tipomascota[]) => {
          this.listaTiposMascota = data;
        },
        error => {
          console.log(error);
        }
      );
    } else {
      console.log('No se encontró el token de acceso.');
    }
  }

  agregarActividad(): void {
    const actividad: Actividad = {
      nombre_actividad: this.actividadForm.get('nombre_actividad')?.value,
      descripcion_actividad: this.actividadForm.get('descripcion_actividad')?.value
    };

    //const tipoMascotaId = this.actividadForm.get('tipoMascota')?.value;
    var valuesTipo: any[] = [];
    const checkArray: FormArray = this.actividadForm.get('checkArray') as FormArray;
    //console.log(checkArray);
      checkArray.controls.forEach((item) => {
          valuesTipo.push(item.value);
      });

      //console.log(valuesTipo);
      //return;
      if (this.id != null) {
        this.actividadService.updateactividades(this.clave, this.id , actividad).subscribe(
          data => {
            console.log(data);
            // Una vez que se ha agregado la actividad, podemos asignarla al tipo de mascota
            this.asignarActividadTipoMascota(data.id, valuesTipo);
            this.router.navigate(['/actividad/index']);
          },
          error => {
            console.log(error);
          }
        );
      } else {
        this.actividadService.addactividades(this.clave, actividad).subscribe(
          data => {
            console.log(data);
            // Una vez que se ha agregado la actividad, podemos asignarla al tipo de mascota
            this.asignarActividadTipoMascota(data.id, valuesTipo);
            this.router.navigate(['/actividad/index']);
          },
          error => {
            console.log(error);
          }
        );
      }

    
  }

  asignarActividadTipoMascota(actividadId: number, tipoMascotaId: any[]): void {
    this.actividadService.asignarActividadTipoMascota(actividadId, tipoMascotaId, this.clave).subscribe(
      data => {
        console.log('Actividad asignada al tipo de mascota correctamente');
      },
      error => {
        console.log('Error al asignar la actividad al tipo de mascota:', error);
      }
    );
  }

  exist(e:any) {
    //console.log(e);
    const checkArray: FormArray = this.actividadForm.get('checkArray') as FormArray;
    let i: number = 0;
    checkArray.controls.forEach((item) => {
      if (item.value == e) {
        console.log(item.value);
        i++;
        return
      }
    });
    if (i==1) {
      return true;
    } else {
      return false;
    }
  }

  onCheckboxChange(e:any) {
    const checkArray: FormArray = this.actividadForm.get('checkArray') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
}
