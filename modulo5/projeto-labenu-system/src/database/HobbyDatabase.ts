import { BaseDatabase } from "./BaseDatabase";

export class HobbyDatabase extends BaseDatabase{
    TABLE_NAME = "Labe_Hobbies";
    public static TABLE_HOBBIES = 'Labe_Hobbies'
    public static STUDENTS_HOBBIES = 'Students_Hobbies'

    public async getAll() {
        return super.getAll()
    }
}