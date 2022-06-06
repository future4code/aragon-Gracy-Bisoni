import {HeaderContainer, Title, TitleImage, Button} from './styles'

function Header(props) {
    return(
        <HeaderContainer>
            <Title onClick={props.goToProfiles}>Astro
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