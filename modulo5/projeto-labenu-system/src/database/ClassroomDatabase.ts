import { Classroom } from "../models/Classroom";
import { BaseDatabase } from "./BaseDatabase";

export class ClassroomDatabase extends BaseDatabase{
    TABLE_NAME = "Labe_Classrooms";
    public static TABLE_CLASSROOMS = 'Labe_Classrooms'

    public async getAll() {
        return super.getAll()
    }
}