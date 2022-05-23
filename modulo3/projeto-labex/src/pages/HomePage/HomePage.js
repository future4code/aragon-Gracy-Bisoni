import React from "react";
import Header from '../../components/Header/Header'

const HomePage = () => {
    return (
        <>
        <Header currentPage={"homepage"}/>
        <hr/>
        <main>
            <div>
                <h2>Subscribe to your new trip!</h2>
            </div>
            <hr/>
            <div>
                <h2>Trips List</h2>
            </div>
        </main>

        </>
    )
}

export default HomePage;
