import React, { useState, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../authcontext/AuthContext';
import TextBlock from '../form/blocks/TextBlock';
import axios from 'axios';

export default function LoginPage() {

    const authData = useContext(AuthContext)
    const navigate = useNavigate();   

    const googleLogin = () => {
        window.open('http://localhost:3000/google-login/auth/google', '_self');
    }

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const verifyUser = useCallback(async () => {


        try {
            const response = await axios.post('http://localhost:3000/user-login/', {
                username,
                password
            }, { withCredentials: true });

            console.log("access token:", response.data.accessToken)

            const token = response.data.accessToken
            authData.updateToken(token)

            if (token) {

                const userData = await axios.get('http://localhost:3000/user-login/profile', {

                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }, { withCredentials: true });

                if (userData) {
                    authData.updateUserDetail(userData.data)
                    authData.updateIsAuth(true)

                    navigate("/")

                } else {
                    console.log("unable to authenticate")
                }

            }

            // Handle the successful login response
        } catch (error) {

            console.log(error)
        }

    }, [password, username, authData, navigate])

    return (
        <>
            <div>
                <TextBlock label={"Username"} updateParentValue={(value) => { setUsername(value) }} />
                <TextBlock label={"Password"} updateParentValue={(value) => { setPassword(value) }} />
            </div>
            <div>
                <button className='btn btn-danger' onClick={verifyUser}>Login</button>
                <button className='btn btn-danger' onClick={googleLogin}>Google Login</button>
            </div>
        </>
    );
}

