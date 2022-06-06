import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_AUTH, BASE_URL } from '../../constants/urls';
import {ProfileTitle, ProfileCard, ProfileImage, Main, Button, ButtonImage} from './styles'

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
            />
            <ProfileTitle>{profile.name},{profile.age}</ProfileTitle>
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
            {profileCard}
        </Main>
    );
};

export default ProfilesPage;