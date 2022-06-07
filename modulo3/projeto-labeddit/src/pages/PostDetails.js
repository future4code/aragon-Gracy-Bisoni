import React from "react";
import { Header } from "../components/Header";
import { useProtectedPage } from "../hooks/useProtectedPage";

export const PostDetails = () => {
    useProtectedPage()

    return(
        <>
            <Header
                isProtected={true}
            />
            <hr />
            <section>
                <h2>Post information</h2>
            </section>
            <hr />
            <section>
                <h2>Comment here!</h2>
            </section>
            <hr />
            <section>
                <h2>Comments list</h2>
            </section>
        </>
    )
}