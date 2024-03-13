import { Routes } from '@angular/router';
import { BodyComponent } from './inicio/body/body.component';
import { IndexComponent as IndexUsuario } from './usuarios/index/index.component';
import { IndexComponent as IndexRol } from './roles/index/index.component';
import { IndexComponent as IndexMascota } from './mascota/index/index.component';
import { CreateComponent as CreateMascota } from './mascota/create/create.component';
import { IndexComponent as IndexTipomascota } from './tipomascota/index/index.component';
import { CreateComponent as CreateTipomascota } from './tipomascota/create/create.component';
import { IndexComponent as Indexlogros } from './logros/index/index.component';
import { CreateComponent as Createlogros} from './logros/create/create.component';

import { IndexComponent as Indexactividad } from './actividades/index/index.component';
import { CreateComponent as Createactividad} from './actividades/create/create.component';

import { IndexComponent as Indexagendamiento } from './agendamiento/index/index.component';

import { IndexComponent as Indexreporte } from './reporte/index/index.component';











export const routes: Routes = [
    { path: '', redirectTo: 'inicio/body', pathMatch: 'full' },
    { path: 'inicio/body', component: BodyComponent },

    { path: 'usuario/index', component: IndexUsuario},

    { path: 'rol/index', component: IndexRol},
    { path: 'rol/index', component: IndexRol},
    { path: 'rol/index', component: IndexRol},

    {path: 'mascota/index/:id', component:IndexMascota},

    { path: 'tipomascota/index', component: IndexTipomascota },
    { path: 'tipomascota/index/:id', component: IndexTipomascota },
    { path: 'tipomascota/editar/:id', component: CreateTipomascota },
   { path: 'tipomascota/create', component: CreateTipomascota },


   { path: 'logros/index', component: Indexlogros },
   { path: 'logros/index/:id', component: Indexlogros },
   { path: 'logros/editar/:id', component: Createlogros },
  { path: 'logros/create', component: Createlogros },



  { path: 'actividad/index', component: Indexactividad },
  { path: 'actividad/index/:id', component: Indexactividad },
  { path: 'actividad/editar/:id', component: Createactividad },
 { path: 'actividad/create', component: Createactividad },




    {path: 'mascota/create/:user_id', component: CreateMascota},

    {path: 'mascota/editar/:id/:user_id', component: CreateMascota },



    { path: 'agendamiento/index', component: Indexagendamiento },
    { path: 'agendamiento/index/:id', component: Indexagendamiento },
    { path: 'agendamiento/editar/:id', component: Createactividad },
    { path: 'agendamiento/create', component: Createactividad },

    { path: 'reporte/index', component: Indexreporte },
    { path: 'reporte/index/:id', component: Indexreporte },





];
