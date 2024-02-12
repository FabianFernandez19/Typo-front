export class tipomascota {

    id?:number;
    Tipo_Mascota : string | undefined| null;

    constructor(id?:number, Tipo_Mascota?: string){
        this.id = id;
        this.Tipo_Mascota = Tipo_Mascota;
    }

}
