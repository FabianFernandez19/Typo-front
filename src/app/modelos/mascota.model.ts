export class Mascota {
    id?:number;
    Nombre_Mascota : string | undefined| null;
    Edad :number;
    Raza: string | undefined| null;
    Peso: number;
    Tamaño: number;
    Sexo: string | undefined| null;
    //tiempo_total: string | undefined| null;
    user_id: number;
    id_tipomascota: number;

    constructor(id:number, Nombre_Mascota:string, Edad:number, Raza:string, Peso:number, Tamaño:number,Sexo:string
        , user_id:number, id_tipomascota:number){
            this.id = id;
            this.Nombre_Mascota = Nombre_Mascota;
            this.Edad = Edad;
            this.Raza = Raza;
            this.Peso = Peso;
            this.Tamaño = Tamaño;
            this.Sexo =Sexo;
            this.user_id= user_id;
            this.id_tipomascota = id_tipomascota;
        }

}
