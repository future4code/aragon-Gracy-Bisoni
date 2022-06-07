import React from "react";
import { Header } from "../components/Header";
import { useProtectedPage } from "../hooks/useProtectedPage";

export const Feed = () => {
    useProtectedPage()
    return(
        <main>
            <Header
                isProtected={true}
            />
            <hr/>
            <section>
                <h2>Create new post</h2>
            </section>
            <hr/>
            <h2>Posts list</h2> 
        </main>
    )
}