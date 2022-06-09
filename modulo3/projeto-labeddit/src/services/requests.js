import axios from "axios";
import { goToFeed } from "../routes/coordinator";
import { BASE_URL } from "../constants/urls"

export const requestLogin = (form, clear, navigate) => {
    const body = {
        email: form.email,
        password: form.password
    }

    axios
    .post(`${BASE_URL}/users/login`, body)
    .then((res)=> {
        //aqui eu armazeno no localStorage um token de login/identificação e o email do usuário
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("userEmail", form.email)
        alert("Successful login!")
        //Em seguida, redireciono ele para a página de Feed
        goToFeed(navigate)
    })
    .catch((err)=> {
        alert("Something got wrong, try again!")
        clear()
    })
};

export const requestSignup =(form, clear, navigate) => {
    const body = {
        username: form.name,
        email: form.email,
        password: form.password
    }

    axios
    .post(`${BASE_URL}/users/signup`, body)
    .then((res) => {
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("userEmail", form.email)
        alert("Your user was created, welcome to our community!")
        goToFeed(navigate)
    })
    .catch((err) => {
        alert("Something got wrong, try again!")
        console.log(err.message)
        clear()
    })
}

export const requestCreatePost = (form, clear, getPosts) => {
    const headers = {
        headers: {
            authorization: localStorage.getItem("token")
        }
    }

    const body = {
        title: form.title,
        body: form.body
    }

    axios
    .post(`${BASE_URL}/posts`, body, headers)
    .then((res) => {
        alert(res.data)
        getPosts()
        clear()
    })
    .catch((err) => {
        alert("Something got wrong, try again!")
    })
}

export const requestCreateComment = (form, clear, getPostComments, postId) => {
    const headers = {
        headers:{
            authorization: localStorage.getItem("token")
        }
    }

    const body = {
        body: form.body
    }

    axios
    .post(`${BASE_URL}/posts/${postId}/comments`, body, headers)
    .then((res) => {
        alert("Your comment was created!")
        getPostComments(postId)
        clear();
    })
    .catch((err) => {
        console.log(err.message)
    })
}

export const requestCreatePostVote = (postId, direction, getPosts) => {
    const headers = {
        headers: {
            authorization: localStorage.getItem("token")
        }
    }

    const body = {
        direction: direction
    }
    
    axios
        .post(`${BASE_URL}/posts/${postId}/votes`, body, headers)
        .then(() => {
            alert("Registered vote!");
            getPosts();
        })
        .catch((err) => {
            alert("Something got wrong with your vote. Try again!");
        });

}

export const requestCreateCommentVote = (commentId, direction, getPostComments, postId) => {
    const headers = {
        headers: {
            authorization: localStorage.getItem("token")
        }
    }

    const body = {
        direction: direction
    }

    axios
    .post(`${BASE_URL}/comments/${commentId}/votes`, body, headers)
    .then(() => {
        alert("Your vote was registered")
        getPostComments(postId)
    })
    .catch((err)=> {
        alert("Something got wrong, try again")
        console.log(err.res.message)
    })
}

export const requestChangePostVote = (postId, direction, getPosts) => {
    const headers = {
        headers: {
            authorization: localStorage.getItem("token")
        }
    }

    const body = {
        direction: direction
    }

    axios
    .post(`${BASE_URL}/posts/${postId}/votes`, body, headers)
    .then(()=> {
        alert("Your vote was modified")
        getPosts()
    })
    .catch((err)=> {
        alert("Something got wrong, try again")
    })
}

export const requestChangeCommentVote = (commentId, direction, getPostComments, postId) => {
    const headers = {
        headers: {
            authorization: localStorage.getItem("token")
        }
    };

    const body = {
        direction: direction
    };

    axios
        .put(`${BASE_URL}/comments/${commentId}/votes`, body, headers)
        .then(() => {
            alert("Your vote was modified successfully!");
            getPostComments(postId);
        })
        .catch((err) => {
            alert("Error! Try Again")
            console.log(err.message)
        })
}

export const requestRemovePostVote = (postId, getPosts) => {
    const headers = {
        headers: {
            authorization: localStorage.getItem("token")
        }
    };

    axios
        .delete(`${BASE_URL}/posts/${postId}/votes`, headers)
        .then(() => {
            alert("Your vote was removed");
            getPosts();
        })
        .catch((err) => {
            alert("Error, try again")
        });
};

export const requestRemoveCommentVote = (commentId, getPostComments, postId) => {
    const headers = {
        headers: {
            authorization: localStorage.getItem("token")
        }
    }
    axios
        .delete(`${BASE_URL}/comments/${commentId}/votes`, headers)
        .then(() => {
            alert("Vote removed");
            getPostComments(postId);
        })
        .catch((err) => {
            alert ("Error, try again");
        });
};