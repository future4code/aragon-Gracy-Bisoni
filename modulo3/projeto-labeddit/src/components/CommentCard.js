import React from "react";
import { format, set } from "date-fns";
import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../global/GlobalContext";
import { requestChangeCommentVote, requestCreateCommentVote, requestRemoveCommentVote } from "../services/requests";

export const CommentCard = (props) => {
    const {getters} = useContext(GlobalContext)
    const {getComments} = getters
    const { id, userId, postId, body, createdAt, voteSum, userVote } = props.comment

    const [isLiked, setIsLiked] = useState(false)
    const [isDisliked, setIsDisliked] = useState(false)

    const formatedDate = createdAt && format(new Date(createdAt), "dd/MM/yyyy");

    useEffect(() => {
        if (userVote) {
            userVote === 1 ? setIsLiked(true) : setIsDisliked(true);
        };
    }, [userVote]);

    const chooseVote = (typeVote) => {
        if(typeVote === "like") {
            if(isDisliked){
                requestChangeCommentVote(id,1, getComments, postId)
                setIsLiked(true)
                setIsDisliked(false)
            } else{
                requestCreateCommentVote(id, 1, getComments, postId)
                setIsLiked(true)
            }
        } else{
            if(isLiked){
                requestChangeCommentVote(id, -1, getComments, postId)
                setIsDisliked(true)
                setIsLiked(false)
            } else{
                requestCreateCommentVote(id, -1, getComments, postId)
                setIsDisliked(true)
            }
        }
    }

    const removeVote = (typeVote) => {
        requestRemoveCommentVote(id, getComments, postId)
        typeVote === "like"? setIsLiked(false) : setIsDisliked(false)
    }

    const renderVoteButtons = (
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
            <h3>{body}</h3>
            <p>Author:{userId}</p>
            <p>Created at: {formatedDate}</p>

        
            <p>Votes: {voteSum? voteSum : 0}</p>
            {/* <button>Dislike</button>
            <br />
            <button>Like</button> */}
            {renderVoteButtons}
            <hr />
        </>
    );
};