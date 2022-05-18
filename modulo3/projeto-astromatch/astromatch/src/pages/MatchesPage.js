import React from "react";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";
import { BASE_URL, API_AUTH } from "../constants/urls";

function MatchesPage () {
    const [matches, setMatches] = useState (undefined)

    useEffect(() => {
        getMatches ()
    }, [])

    const getMatches = () => {
        const url = `${BASE_URL}/${API_AUTH}/matches`;

        axios.get(url)
            .then((res) => {
                setMatches(res.data.matches);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const showMatches = matches && matches.map ((match) => {
        return <div key= {match.id}>
            <img 
                    src={match.photo}
                    alt={`foto de ${match.name}`}
                    height={"30px"}
                ></img>
                <p>{match.name}</p>
                <hr />
        </div>
    })

    return (
        <>
            <h2>Matches</h2>
            {showMatches}
        </>
    );
}

export default MatchesPage