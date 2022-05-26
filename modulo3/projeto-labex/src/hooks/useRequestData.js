import axios from "axios";
import React from "react";
import { useEffect, useState} from 'react'
import { BASE_URL, API_AUTH } from "../constants/urls";

export const useRequestData = (way, initialState) => {
    const [data, setData] = useState(initialState)

    const getData = () => {
        const headers = {
            headers: {
                auth:localStorage.getItem('token')
            }
        }

        axios
        .get (`${BASE_URL}/${API_AUTH}/${way}`, headers)
        .then ((res) => {
            setData(res.data)
        })
        .catch ((err) => {
            alert (`Error (400)`)
        });

    }

    useEffect(() => {
        getData()
    }, [way]);

    return [data, getData];
}