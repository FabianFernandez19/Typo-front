export class Agendamiento {

    id?:number;
    tiempo_asignado_actividad : string | undefined| null;
    Fecha_Agendamiento: Date; 
    cumplida: boolean;
    infomascota_id: number;
    actividades_id: number;
    user_id: number;
    Nombre_Mascota: string | undefined | null;
    name: string | undefined | null;
    nombre_actividad: string | undefined | null;
    
    

    constructor(id:number, tiempo_asignado_actividad:string, Fecha_Agendamiento:Date, cumplida:boolean, infomascota_id:number, actividades_id:number,
        user_id:number, Nombre_Mascota:string | undefined | null, name:string | undefined, nombre_actividad:string){
            this.id = id;
            this.tiempo_asignado_actividad = tiempo_asignado_actividad;
            this.Fecha_Agendamiento = Fecha_Agendamiento;
            this.cumplida = cumplida;
            this.infomascota_id = infomascota_id;
            this.actividades_id = actividades_id;
            this.user_id = user_id;
            this.Nombre_Mascota=Nombre_Mascota;
            this.name=name;
            this.nombre_actividad=nombre_actividad;
        }


}
