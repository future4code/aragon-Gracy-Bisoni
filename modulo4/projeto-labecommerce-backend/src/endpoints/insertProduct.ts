import { Request, Response } from "express";

export const insertProduct = async(req:Request, res:Response)=> {
    let errorCode = 400
    try {
        const { name, price } = req.body
         

        
    } catch (error) {
        res.status(errorCode).send({
            message: error.message
        })
    }
}