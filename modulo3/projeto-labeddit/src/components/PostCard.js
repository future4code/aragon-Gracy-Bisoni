import React from "react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../global/GlobalContext";
import { goToPostDetails } from "../routes/coordinator";
import {format} from "date-fns"
import { requestChangePostVote, requestCreatePostVote, requestRemovePostVote } from "../services/requests";

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
        <>
            {userVote && isDisliked? 
                <button onClick={() => removeVote("dislike")}>Remove dislike</button>
                : <button onClick={() => chooseVote("dislike")}>
                    {isLiked? `Change your vote to DISLIKE`
                        : `Dislike`
                    }
                </button>
            }
            {userVote && isLiked?
                <button onClick={()=> removeVote("like")}>Remove like</button>
                : <button onClick={() => chooseVote("like")}>
                    {isDisliked? `Change your vote to LIKE`
                        : `Like`
                    }
                </button>
            }
        
        </>
    )

    return (
        <>
            <h3>{title}</h3>
            <h5>Author: </h5>{userId}
            <p>Created at {formatedDate}</p>

            {/* Gerar imagem aleatória no picsum:                
                Coloca a query 'random', em seguida passa o id do usuário. O retorno é que 
                cada post vai ter uma foto aleatória característica.*/}

            <img src={"https://picsum.photos/200/200?random=" + id} alt=""/>
            <p>Description: {body}</p>

            <p>Votes: {voteSum ? voteSum : 0}</p>
            {/* <button>Dislike</button>
            <br />
            <button>Like</button> */}

            {/* RENDERIZAÇÃO CONDICIONAL DOS BOTÕES DE REAÇÃO */}
            {renderVoteButtons}


            <p>Comments: {commentCount ? commentCount : 0}</p>

            {props.isFeed && <button onClick={goToComments}>Open comments</button>}
            <hr />
        </>
    );
}