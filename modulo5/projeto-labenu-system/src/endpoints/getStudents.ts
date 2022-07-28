import { Request, Response } from "express"
import { StudentDatabase } from "../database/StudentDatabase"

export const getUsers = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const studentDatabase = new StudentDatabase()
        const result = await studentDatabase.getAllStudents()
        
        res.status(200).send({ students: result })
    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
}
