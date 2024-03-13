export class Reporte {

    id?:number;
    mes : string | undefined| null;
    porcentaje_cumplimiento: number | undefined; 
    total_agendamientos_cumplidos:  number | null |undefined;
    agendamientos_no_cumplidos: number | null |undefined;
    user_id: number | undefined;

    constructor(id?:number, mes?:string, porcentaje_cumplimiento?:number, total_agendamientos_cumplidos?:number, agendamientos_no_cumplidos?:number, user_id?:number){
        this.id = id;
        this.mes = mes;
        this.porcentaje_cumplimiento = porcentaje_cumplimiento;
        this.total_agendamientos_cumplidos = total_agendamientos_cumplidos;
        this.agendamientos_no_cumplidos = agendamientos_no_cumplidos;

        this.user_id = user_id;
    }
}
