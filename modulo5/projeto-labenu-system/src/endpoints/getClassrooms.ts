import { Request, Response } from "express"
import { ClassroomDatabase } from "../database/ClassroomDatabase"


export const getClassrooms = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const classroomsDatabase = new ClassroomDatabase()
        const result = await classroomsDatabase.getAll()
        
        res.status(200).send({ classrooms: result })
    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
}