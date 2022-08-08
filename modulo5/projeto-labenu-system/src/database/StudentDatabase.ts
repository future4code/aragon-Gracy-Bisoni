import { IStudentDB, Student } from "../models/Student";
import { BaseDatabase } from "./BaseDatabase";

export class StudentDatabase extends BaseDatabase{
    TABLE_NAME = "Labe_Students";
    public static TABLE_STUDENTS = 'Labe_Students'
    public static TABLE_HOBBIES = 'Labe_Hobbies'
    public static STUDENTS_HOBBIES = 'Students_Hobbies'

    public async getAll() {
        return super.getAll()
    }

    public async getStudentByname(name: string) {
        const result = await BaseDatabase
        .connection(StudentDatabase.TABLE_STUDENTS)
        .select()
        .where("name", "LIKE", `%${name}%`)

        return result
    }

    public async create(student:Student){
        return super.create(student)
    }

    public async findById(id:string){
        const findClass = await BaseDatabase
        .connection(StudentDatabase.TABLE_STUDENTS)
        .where({id})
        .select()

        return findClass
    }

    public async updateClass(id:string, newClassroom:string){
        const result = await BaseDatabase
        .connection(StudentDatabase.TABLE_STUDENTS)
        .update({
            classroom_id: newClassroom
        })
        .where({id})
    }
}