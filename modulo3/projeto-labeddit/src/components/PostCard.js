import React from "react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../global/GlobalContext";
import { goToPostDetails } from "../routes/coordinator";
import {format} from "date-fns"
import { requestChangePostVote, requestCreatePostVote, requestRemovePostVote } from "../services/requests";
import { Typography,Button, Stack, Avatar } from "@mui/material";

export const PostCard = (props) => {
    const navigate = useNavigate()

    // desestruturações do contexto
    const {setters, getters}= useContext(GlobalContext)
    const {setPost} = setters
    const {getPosts} = getters
    
    // estados
    const [isLiked, setIsLiked] = useState(false)
    const [isDisliked, setIsDisliked] = useState(false)

    // desestruturação do post, recebido por props
    const { id, userId, title, body, createdAt, voteSum, commentCount, userVote } = props.post

    const formatedDate = createdAt && format(new Date(createdAt), "dd/MM/yyyy");

    // aqui eu digo que vai atualizar o PostCard quando tiver um voto
    useEffect(() => {
        if (userVote) {
            userVote === 1 ? setIsLiked(true) : setIsDisliked(true);
        };
    }, [userVote]);

    const goToComments = () => {
        setPost(props.post);
        goToPostDetails(navigate, id);
    };

    const chooseVote = (typeVote) => {
        if(typeVote === "like"){
            if(isDisliked) {
                requestChangePostVote(id,1,getPosts)
                setIsLiked(true)
                setIsDisliked(false)
            } else{
                requestCreatePostVote(id,1,getPosts)
                setIsLiked(true)
            }
        } else {
            if(isLiked){
                requestChangePostVote(id,-1,getPosts)
                setIsLiked(false)
                setIsDisliked(true)
            } else {
                requestCreatePostVote(id, -1, getPosts)
                setIsDisliked(true)
            }
        }
    }

    const removeVote = (typeVote) => {
        requestRemovePostVote (id, getPosts)
        typeVote === "like"? setIsLiked(false) : setIsDisliked(false)
    }

    const renderVoteButtons = props.isFeed && (
        <Stack
            sx={{
                display:'flex', 
                flexDirection:'row', 
                alignItems:'center', 
                justifyContent:'center',
            }}
        >
            {userVote && isDisliked? 
                <Button 
                    sx={{width:'200px'}}
                    onClick={() => removeVote("dislike")}>Remove dislike</Button>
                : <Button
                    sx={{width:'200px'}} 
                    onClick={() => chooseVote("dislike")}>
                    {isLiked? `Change your vote to DISLIKE`
                        : `Dislike`
                    }
                </Button>
            }
            {userVote && isLiked?
                <Button 
                    sx={{width:'200px'}}
                    onClick={()=> removeVote("like")}>Remove like</Button>
                : <Button 
                    sx={{width:'200px'}}
                    onClick={() => chooseVote("like")}>
                    {isDisliked? `Change your vote to LIKE`
                        : `Like`
                    }
                </Button>
            }
        
        </Stack>
    )

    return (
        <Stack
            sx={{
                marginLeft:'20px',
                border:'1px dashed darkgrey'
            }}
            
        >
            <Typography 
                align="center"
                variant="h5"
                sx={{
                    marginLeft:'20px'
                }}                
                >"{title.toUpperCase()}"</Typography>
            <Typography>Author: </Typography>{userId}
            <Typography>Created at {formatedDate}</Typography>

            {/* Gerar imagem aleatória no picsum:                
                Coloca a query 'random', em seguida passa o id do usuário. O retorno é que 
                cada post vai ter uma foto aleatória característica.*/}

            <Avatar
                sx={{
                    width: '200px',
                    height: '200px',
                    alignSelf:'center'
                }}

                src={"https://picsum.photos/200/200?random=" + id} alt=""/>
            <Typography>Description: {body}</Typography>

            <Typography>Votes: {voteSum ? voteSum : 0}</Typography>
            {/* <button>Dislike</button>
            <br />
            <button>Like</button> */}

            {/* RENDERIZAÇÃO CONDICIONAL DOS BOTÕES DE REAÇÃO */}
            {renderVoteButtons}


            <Typography>Comments: {commentCount ? commentCount : 0}</Typography>

            {props.isFeed && 
            <Button 
                onClick={goToComments}
                sx={{width:'200px', alignSelf:'center'}}
                >Open comments</Button>}
            <hr />
        </Stack>
    );
}