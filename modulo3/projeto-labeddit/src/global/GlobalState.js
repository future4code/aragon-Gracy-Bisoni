import React from "react";
import { useState } from "react";
import axios from "axios";
import { GlobalContext } from "./GlobalContext";
import { BASE_URL } from "../constants/urls";
import { createTheme } from "@mui/material";
import '@fontsource/roboto/500.css'

export const GlobalState = (props) => {
    const theme = createTheme({
        typography: {
            fontFamily: 'Roboto'
        }
    })

    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [page, setPage] = useState(1);

    const getPosts = (currentPage) => {
        const headers = {
            headers: {
                authorization: localStorage.getItem("token")
            }
        }

        axios
        .get(`${BASE_URL}/posts?page=${currentPage}`, headers)
        .then((res) => {
            setPosts(res.data)
        })
        .catch((err) => {
            alert("Error! Can't load the posts list")
        })
    }
    
    const getComments = (postId) => {
        const headers = {
          headers: {
            authorization: localStorage.getItem("token")
          }
        };
    
        axios
        .get(`${BASE_URL}/posts/${postId}/comments`, headers)
        .then((res) => {
            setComments(res.data);
          })
        .catch((err) => {
            alert("Error in loading comments, try again");
          });
      };

    const states = { posts, post, comments, page }
    const setters = { setPosts, setPost, setComments, setPage }
    const getters = { getPosts, getComments }

    return(
       <GlobalContext.Provider value={{states, setters, getters}}>
           {props.children}
       </GlobalContext.Provider>
    )
} 