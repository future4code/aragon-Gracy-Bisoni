export enum MODULE{
    ZERO = "0",
    UM = "1",
    DOIS = "2",
    TRÊS = "3",
    QUATRO = "4",
    CINCO = "5",
    SEIS = "6"
}

export interface IClassroomDB {
    id: string,
    name: string,
    module: MODULE
}

export class Classroom{
    constructor(
        private id:string,
        private name: string,
        private module: MODULE
    ){}

    public getId(){
        return this.id
    }

    public getName(){
        return this.name
    }

    public getModule(){
        return this.module
    }

    public setId(newId: string) {
        this.id = newId
    }

    public setName(newName: string) {
        this.name = newName
    }

    public setModule(newModule: MODULE) {
        this.module = newModule
    }
}