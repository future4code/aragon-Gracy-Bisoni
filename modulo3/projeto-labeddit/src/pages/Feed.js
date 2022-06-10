import React from "react";
import { Header } from "../components/Header";
import { useProtectedPage } from "../hooks/useProtectedPage";
import { useContext, useEffect } from "react";
import { PostCard } from "../components/PostCard";
import { GlobalContext } from "../global/GlobalContext";
import { useForm } from "../hooks/useForm";
import { requestCreatePost } from "../services/requests";
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Typography, Input, Stack, Box } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";



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
    }) : <Typography variant="h5">Loading...</Typography>

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
            <Stack>
                <Typography 
                    sx={{margin:'20px'}}
                    variant="h5">Create new post</Typography>
                <Box
                    sx={{ p: 2, border: '1px dashed grey', margin: '0 50px 20px 50px'}}
                >
                <form onSubmit={createPost}>
                    <Typography type={"label"} htmlFor={"title"}>Title: </Typography>
                    <Input
                        sx={{marginBottom:'20px'}}
                        id={"title"}
                        name={"title"}
                        value={form.title}
                        onChange={onChange}
                        required
                    />
                    <br />
                    <Typography htmlFor={"body"}> Post text: </Typography>
                    <Input
                        id={"body"}
                        type={"text"}
                        name={"body"}
                        value={form.body}
                        onChange={onChange}
                        required
                    />
                    <br />
                    <Button 
                        sx={{marginTop:'50px'}}
                        variant="contained"
                        color="primary"
                        type={"submit"}>Create Post</Button>
                </form>
                </Box>
            </Stack>
            <hr/>
            <Stack
                sx={{
                    display: 'flex',
                    flexDirection:'column',
                    margin: '10px',
                    justifyContent:'space-between'
                }}
            >
            <Typography variant="h5">Posts list</Typography>
                <nav>
                    <Typography variant="subtitle1">Navigate by feed pages 👇</Typography>
                    {page !== 1 &&
                        <Button 
                        variant="outlined"
                        color="secondary"
                        onClick={() => changePage(-1)}><ArrowBack/></Button>
                    }
                    <Typography variant="body2"> Página {page} </Typography>
                    {posts.length &&
                        <Button 
                        variant="outlined"
                        color="secondary"
                        onClick={() => changePage(1)}><ArrowForward/></Button>
                    }
                </nav>
                </Stack>
                <hr/> 
                {renderPosts}
        </main>
    )
}