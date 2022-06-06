import styled from "styled-components";

export const Main = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: url(https://img.myloview.com.br/adesivos/cute-cartoon-style-smiling-fire-flame-characters-and-red-hearts-vector-seamless-pattern-background-400-261869500.jpg);
`
export const ProfileCard = styled.figure `
    border: 10px solid orange;
    width: 30vw;
    height: fit-content;
    display: flex;
    flex-direction: column;
    /* justify-content: center;
    align-items: center; */
    margin: 10px;
    background-color: white;

`
export const ButtonImage = styled.img`
    width: 6vw;
`
export const Button = styled.button `
    border: none;
    background-color: white;
    cursor: pointer;
    margin: 10px;
    

    &:hover{
        border: solid 2px orange;
        border-radius: 100%;
    }
`

export const ProfileImage = styled.img `
    height: 30vw;
    width: 30vw;
`
export const ProfileTitle = styled.h2`
    text-transform: uppercase;
    font-family: sans-serif;
    justify-content: left;
    margin-left: 2vw;

`
