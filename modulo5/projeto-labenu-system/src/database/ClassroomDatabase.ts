import { Classroom, IClassroomDB, MODULE } from "../models/Classroom";
import { BaseDatabase } from "./BaseDatabase";

export class ClassroomDatabase extends BaseDatabase{
    TABLE_NAME = "Labe_Classrooms";
    public static TABLE_CLASSROOMS = 'Labe_Classrooms'
    public async getAll() {
        return super.getAll()
    }

    public async getActiveClasses() {
        const result = await BaseDatabase
        .connection(ClassroomDatabase.TABLE_CLASSROOMS)
        .select()
        .where("module", ">", "0")

        return result
    }

    public async create(classroom:Classroom){
        return super.create(classroom)
    }

    public async findById(id:string){
        const findClass = await BaseDatabase
        .connection(ClassroomDatabase.TABLE_CLASSROOMS)
        .where({id})
        .select()

        return findClass
    }

    public async update(id:string, module:string){
    
        const result = await BaseDatabase
        .connection(ClassroomDatabase.TABLE_CLASSROOMS)
        .where({id})
        .update({module})

    }

}