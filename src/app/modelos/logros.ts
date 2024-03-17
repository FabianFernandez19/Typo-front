export class Logros {
    id?: number; 
    tipoLogro: string | undefined | null;
    tiempoSemanal: string | undefined | null; // Cambiado a tipo string
    //dias: number | undefined | null;

    constructor(id?: number, tipoLogro?: string, tiempoSemanal?: string, dias?: number) {
        this.id = id;
        this.tipoLogro = tipoLogro;
        this.tiempoSemanal = tiempoSemanal;
        //this.dias = dias;
    }
}


