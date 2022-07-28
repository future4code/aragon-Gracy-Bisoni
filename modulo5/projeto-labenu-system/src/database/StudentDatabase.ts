import { Student } from "../models/Student";
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
}