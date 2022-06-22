import React from "react";
import { Header } from "../components/Header";
import { PostCard } from "../components/PostCard";
import { CommentCard } from "../components/CommentCard";
import { useProtectedPage } from "../hooks/useProtectedPage";
import { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { requestCreateComment } from "../services/requests";
import { goToFeed } from "../routes/coordinator";
import { GlobalContext } from "../global/GlobalContext";

export const PostDetails = () => {
    useProtectedPage()
    const navigate = useNavigate()
    const params = useParams()

    const {form, onChange, clear} = useForm({body:""})
    const {states, getters} = useContext(GlobalContext)
    const {post, comments} = states
    const {getComments} = getters

    useEffect(()=> {
        if(post.id && post.id === params.postId){
            getComments(post.id)
        } else {
            alert("Oops! Something got wrong, your going back to feed.")
            goToFeed(navigate)
        }
    }, [])

    const createComment = (e) => {
        e.preventDefault()
        requestCreateComment(form, clear, getComments, post.id)
    }

    const renderComments = comments.length? comments.map((comment)=> {
        return(
            <CommentCard
            key={comment.id}
            comment={comment}
            />
        )
    }) : <p>This post has no comments yet! 😔</p>

    return(
        <>
            <Header
                isProtected={true}
            />
            <hr />
            <button onClick={() => navigate(-1)}>Back previous page</button>
            <section>
                <h2>Post information</h2>
                <PostCard
                    key={post.id}
                    post={post}
                    isFeed={false}
                />
            </section>
            <section>
                <h2>Comment here 👇</h2>
                <form onSubmit={createComment}>
                    <label htmlFor="body">Comment: </label>
                    <input
                        id={"body"}
                        type="text"
                        name="body"
                        value={form.body}
                        onChange={onChange}
                        required
                    />
                    <br/>
                    <br/>
                    <button type={"submit"}>Send comment</button>
                </form>
            </section>
            <hr />
            <section>
                <h2>Comments list</h2>
                {renderComments}
            </section>
        </>
    )
}