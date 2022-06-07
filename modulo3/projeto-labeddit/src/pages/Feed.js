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
            
        </main>
    )
}