import { throws } from "assert"
import { PostDatabase } from "../database/PostDatabase"
import { UserDatabase } from "../database/UserDatabase"
import { IPostInputDTO, Post } from "../models/Post"
import { Authenticator } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"

export class PostBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator
    ) {}

    public createPost = async(input:IPostInputDTO)=> {
        const content = input.content
        const token = input.token

        if(!token){
            throw new Error("Missing token");
        }

        if(!content){
            throw new Error("Missing params");
        }

        if(typeof content !== 'string' || content.length < 1){
            throw new Error("Content must be string type and at least 1 character");
            
        }

        const payload = this.authenticator.getTokenPayload(token)

        if(!payload){
            throw new Error("Invalid token");
        }

        const id = this.idGenerator.generate()

        const post = new Post(
            id,
            content,
            payload.id
        )

        const postDatabase = new PostDatabase()
        const addPost = await postDatabase.createPost(post)

        const response = {
            message: "Post created",
            post: post
        }

        return response

    }

}