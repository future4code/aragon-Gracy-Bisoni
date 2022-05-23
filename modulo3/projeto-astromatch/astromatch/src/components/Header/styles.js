import styled from "styled-components";

export const TitleImage = styled.img`
    width: 30px;
`
export const HeaderContainer = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0 30px;
`

export const Button = styled.button`
    height: 40%;
    padding: 1%;
    border: solid orange 5px;
    border-radius: 10%;
    background-color: white;
    cursor: pointer;
    text-transform: uppercase;

    &:hover{
        background-color: orange;
        color: white;
    }

`
export const Title = styled.div`
    font-size: xx-large;
    font-family: sans-serif;
    font-weight: bold;
    cursor: pointer;
`