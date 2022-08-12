import { throws } from "assert"
import { PostDatabase } from "../database/PostDatabase"
import { UserDatabase } from "../database/UserDatabase"
import { IGetPostsDBDTO, IGetPostsInputDTO, IPostInputDTO, Post } from "../models/Post"
import { Authenticator } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"

export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase,
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

        const addPost = await this.postDatabase.createPost(post)

        const response = {
            message: "Post created",
            post: post
        }

        return response

    }

    public async getPosts(input:IGetPostsInputDTO){
        const token = input.token
        const search = input.search || ""
        const order = input.order || "content"
        const sort = input.sort || "ASC"
        const limit = Number(input.limit) || 10
        const page = Number(input.page) || 1

        const offset = limit * (page - 1)

        const payload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new Error("Missing token")
        }

        const getPostsInputDB: IGetPostsDBDTO = {
            search,
            order,
            sort,
            limit,
            offset
        }

        const postsDB = await this.postDatabase.getPosts(getPostsInputDB)

        const posts = postsDB.map(postDB => {
            const post = new Post(
                postDB.id,
                postDB.content,
                postDB.user_id
            )

            const postResponse = {
                id: post.getId(),
                content: post.getContent(),
                userId: post.getUserId()
            }

            return postResponse
        })

        const response = {
            posts
        }

        return response

    }

}