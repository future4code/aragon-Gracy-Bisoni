import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_AUTH, BASE_URL } from '../constants/urls';
import styled from 'styled-components';

const Main = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: url(https://img.myloview.com.br/adesivos/cute-cartoon-style-smiling-fire-flame-characters-and-red-hearts-vector-seamless-pattern-background-400-261869500.jpg);
`
const ProfileCard = styled.figure `
    border: 10px solid orange;
    border-radius: 10%;
    width: 30vw;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
    background-color: white;

`
const Subtitle = styled.h2 `
    font-family: sans-serif;
    background-color: white;
    padding: 2%;
`
const ButtonImage = styled.img`
    width: 6vw;
`
const Button = styled.button `
    border: none;
    background-color: white;
    cursor: pointer;

    &:hover{
        border: solid 2px orange;
        border-radius: 100%;
    }
`

const ProfileImage = styled.img `
    /* border-radius: 100%; */
    height: 20vw;
    width: 20vw;
    margin-top: 30px;
`

function ProfilesPage() {
  
    const [profile, setProfile] = useState(undefined);

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = () => {

        const url = `${BASE_URL}/${API_AUTH}/person`;

        axios.get(url)
            .then((res) => {
                setProfile(res.data.profile);
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    const chooseProfile = (profileId, choice) => {
        const url = `${BASE_URL}/${API_AUTH}/choose-person`;

        const body = {
            id: profileId,
            choice: choice
        };

        axios.post(url, body)
            .then((res) => {
                if (body.choice && res.data.isMatch) {
                    alert("Deu match!");
                };

                getProfile();
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const refreshProfiles = () => {
        const url = `${BASE_URL}/${API_AUTH}/clear`;

        axios.put(url)
            .then(() => {
                alert("Comece do zero");
                getProfile();
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const profileCard = profile ? (
        <ProfileCard>
            <ProfileImage
                src={profile.photo}
                alt={profile["photo_alt"]}
                height={"200px"}
            />
            <h3>{profile.name}, {profile.age}</h3>
            <p>{profile.bio}</p>
            <div>
            <Button onClick={() => { chooseProfile(profile.id, false) }}>
                <ButtonImage src="https://cdn-icons-png.flaticon.com/512/2919/2919922.png" alt="círculo vermelho com uma mão branca, de polegar para baixo"/>
            </Button>
            <Button onClick={() => { chooseProfile(profile.id, true) }}>
                <ButtonImage src="https://purepng.com/public/uploads/large/heart-icon-y1k.png" alt="circulo rosa com coração branco"/>
            </Button>
            </div>
        </ProfileCard>
    ): (
        <>
            <h3>Acabaram os matches! Clique em 'Começar de novo'</h3>
            <button onClick={() => refreshProfiles()}>Começar de novo</button>
        </> 
    )

    return (
        <Main>
            <Subtitle>Catch your match! ⬇</Subtitle>
            {profileCard}
        </Main>
    );
};

export default ProfilesPage;