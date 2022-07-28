import { Student } from "../models/Student";
import { BaseDatabase } from "./BaseDatabase";

export class StudentDatabase extends BaseDatabase{
    public static TABLE_STUDENTS = 'Labe_Students'
    public static TABLE_HOBBIES = 'Labe_Hobbies'
    public static STUDENTS_HOBBIES = 'Students_Hobbies'
}