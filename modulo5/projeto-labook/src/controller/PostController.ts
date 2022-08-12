import { Request,Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { IPostInputDTO } from "../models/Post";

export class PostController {
    constructor(
        private postBusiness: PostBusiness
    ) {}

    public createPost = async(req:Request, res:Response) => {
        try {
            const input:IPostInputDTO = {
                content: req.body.content,
                token: req.headers.authorization
            }

            const response = await this.postBusiness.createPost(input)
            res.status(200).send(response)
        } catch (error) {
            res.status(400).send({
                message: error.message
            })
        }
    }

}