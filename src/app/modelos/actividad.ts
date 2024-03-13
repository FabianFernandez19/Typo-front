export class Actividad {

    id?: number; 
    nombre_actividad: string | undefined | null;
    //tiempoSemanal: string | undefined | null; // Cambiado a tipo string
    descripcion_actividad: string | undefined | null; 

    constructor(id?: number, nombre_actividad?: string, descripcion_actividad?: string){
        this.id = id;
        this.nombre_actividad = nombre_actividad;
        this.descripcion_actividad = descripcion_actividad;
       
    }


}
