import { throws } from "assert"
import { PostDatabase } from "../database/PostDatabase"
import { UserDatabase } from "../database/UserDatabase"
import { IDeletePostInputDTO, IGetPostsDBDTO, IGetPostsInputDTO, ILikeDB, ILikePostInputDTO, IPostDB, IPostInputDTO, Post } from "../models/Post"
import { USER_ROLES } from "../models/User"
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

            return post
        })

        for(let post of posts){
            const likes:any = await this.postDatabase.getLikes(post.getId())

            post.setLikes(likes)
        }
        

        const response = {
            posts
        }

        return response

    }

    public async deletePost(input:IDeletePostInputDTO){
        const token = input.token
        const id = input.id

        const payload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new Error("Missing token")
        }

        const postDB= await this.postDatabase.findById(id)

        if(!postDB){
            throw new Error("Post not found");
        }

        if(payload.role === USER_ROLES.NORMAL){
            if(payload.id !== postDB.user_id){
                throw new Error("Normal users can only delete their own posts");
            }
        }

        await this.postDatabase.deletePostById(id)
        
        const response = {
            message: "Post deleted successfully"
        }

        return response
    }

    public likePost = async (input: ILikePostInputDTO) => {
        const token = input.token
        const id = input.id

        const payload = this.authenticator.getTokenPayload(token)

        if(!payload){
            throw new Error("Invalid token");
        }

        const searchPost = await this.postDatabase.findById(id)

        if(!searchPost){
            throw new Error("Post not found");  
        }

        const isLiked = await this.postDatabase.isLiked(id, payload.id)

        if(isLiked){
            throw new Error("You already liked this post");
        }

        const postId = this.idGenerator.generate()

        const newLike: ILikeDB = {
            id: postId,
            post_id: id,
            user_id: payload.id
        }

        await this.postDatabase.likePost(newLike)

        const response = {
            message: "Post liked!"
        }

        return response
    }

}