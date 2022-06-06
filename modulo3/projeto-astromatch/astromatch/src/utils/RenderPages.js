import { useEffect, useState } from "react";
import Header from '../components/Header'
import MatchesPage from '../pages/MatchesPage'
import ProfilesPage from '../pages/ProfilesPage'

function RenderPages (){
    const [page, setPage] = useState("profiles")

    const renderCurrentPage = () => {
        switch (page) {
            case 'profiles':
                return <ProfilesPage/>
            case 'matches':
                return <MatchesPage/>
            default:
                return <ProfilesPage/>
        }
    }

    const goToProfiles = () => {
        setPage ('profiles')
    }

    const goToMatches = () => {
        setPage ('matches')
    }

    return (
        <>
        <Header
            page= {page}
            goToMatches={goToMatches}
            goToProfiles={goToProfiles}
        />
        <hr/>
        <main>
            {renderCurrentPage()}
        </main>
        </>
    )
}

export default RenderPages