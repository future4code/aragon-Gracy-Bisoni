import styled from "styled-components";

const TitleImage = styled.img`
    width: 30px;
`
const HeaderContainer = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0 30px;
`

const Button = styled.button`
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
const Title = styled.h1`
    font-size: xx-large;
    font-family: sans-serif;
`

function Header(props) {
    return(
        <HeaderContainer>
            <Title>Astro
                <TitleImage src="https://purepng.com/public/uploads/large/heart-icon-y1k.png"/>
                Match</Title>
            {props.page === "profiles" ? 
                <Button onClick={props.goToMatches}>Ir para matches</Button> 
                : <Button onClick={props.goToProfiles}>Ir para perfis</Button>
            }   
        </HeaderContainer>
    );
};

export default Header