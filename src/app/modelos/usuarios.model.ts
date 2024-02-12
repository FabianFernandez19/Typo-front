export class Usuario {
    id?:number;
    nombre:string | null | undefined;
    apellido:string | null | undefined;
    telefono?:number;
    fecha_nacimiento?:Date;
    email:string | null | undefined;
    password:string | null | undefined;


    constructor(id?:number,nombre?: string, apellido?: string, telefono?: number, 
        fecha_nacimiento?: Date, email?:string, password?:string){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.fecha_nacimiento = fecha_nacimiento;
        this.email = email;
        this.password = password;
    }
}
