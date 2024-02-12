export class Rol {
    id?:number;
    name:string | null | undefined;

    constructor(id?:number, name?:string){
        this.id = id;
        this.name = name;
    }
}
