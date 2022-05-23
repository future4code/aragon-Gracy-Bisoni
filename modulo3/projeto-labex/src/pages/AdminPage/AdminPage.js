import React from "react";
import Header from '../../components/Header/Header'

const AdminPage = () => {
    return (
        <>
        <Header currentPage={"adminpage"}/>
        <hr/>
        <main>
            <div>
                <h2>Create new trip</h2>
            </div>
            <hr/>
            <div>
                <h2>Trips List</h2>
            </div>
        </main>

        </>
    )
}

export default AdminPage;