import { Request, Response } from "express"
import { StudentDatabase } from "../../database/StudentDatabase"


export const getStudents = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const search = req.query.search as string

        if(search){
            const studentDatabase = new StudentDatabase()
            const result = await studentDatabase.getStudentByname(search)
            res.status(200).send({ students: result })
        } else{
            const studentDatabase = new StudentDatabase()
            const result = await studentDatabase.getAll()
            res.status(200).send({ students: result })
        }
    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
}
