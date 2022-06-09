import React from "react";
import { Header } from "../components/Header";
import { useProtectedPage } from "../hooks/useProtectedPage";
import { useContext, useEffect } from "react";
import { PostCard } from "../components/PostCard";
import { GlobalContext } from "../global/GlobalContext";
import { useForm } from "../hooks/useForm";
import { requestCreatePost } from "../services/requests";


export const Feed = () => {
    useProtectedPage()

    const {form, onChange, clear} = useForm({title:"", body:""})
    const { states, getters, setters } = useContext(GlobalContext) 
    const { posts, page } = states
    const { setPage } = setters
    const { getPosts } = getters

    useEffect(()=> {
        getPosts()
    }, [])

    const createPost = (e) => {
        e.preventDefault()
        requestCreatePost(form, clear, getPosts)
    }

    const renderPosts = posts.length > 0? posts.map ((post) => {
        return (
            <PostCard
                key={post.id}
                post={post}
                isFeed={true}
            />
        )
    }) : <h4>Loading...</h4>

    const changePage = (sum) => {
        const nextPage = page + sum;
        setPage(nextPage);
        getPosts(nextPage);
    };

    return(
        <main>
            <Header
                isProtected={true}
            />
            <hr/>
            <section>
                <h2>Create new post</h2>
                <form onSubmit={createPost}>
                    <label htmlFor={"title"}>Title: </label>
                    <input
                        id={"title"}
                        name={"title"}
                        value={form.title}
                        onChange={onChange}
                        required
                    />
                    <br />
                    <label htmlFor={"body"}> Post text: </label>
                    <input
                        id={"body"}
                        type={"text"}
                        name={"body"}
                        value={form.body}
                        onChange={onChange}
                        required
                    />
                    <br />
                    <button type={"submit"}>Create Post</button>
                </form>
            </section>
            <hr/>
            <h2>Posts list</h2>
                <nav>
                    <h3>Navigate by feed pages 👇</h3>
                    {page !== 1 &&
                        <button onClick={() => changePage(-1)}>Previous page</button>
                    }
                    <span> Página {page} </span>
                    {posts.length &&
                        <button onClick={() => changePage(1)}>Next page</button>
                    }
                </nav>
                <hr/> 
                {renderPosts}
        </main>
    )
}