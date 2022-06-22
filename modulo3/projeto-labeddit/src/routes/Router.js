import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";
import { Feed } from "../pages/Feed";
import { ErrorPage } from "../pages/ErrorPage";
import { PostDetails } from "../pages/PostDetails";

export const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route index element={<Feed/>}/>
                <Route path={"/signup"} element={<SignUp/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/post/:postId"} element={<PostDetails/>}/>
                <Route path={"*"} element={<ErrorPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}