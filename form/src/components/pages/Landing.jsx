import React, { useCallback, useContext } from 'react';
import AuthContext from '../authcontext/AuthContext';
import axios from 'axios';

export default function Landing() {

    const authData = useContext(AuthContext)



    // useEffect(() => {
    //     authData.getIsAuth()
    // }, [])

    const refreshToken = useCallback(async () => {
        const response = await axios.post('http://localhost:3000/user-login/refresh', {}, { withCredentials: true })
        const getAccessToken = response.data.accessToken
        console.log("****new Access Token:", getAccessToken)
        authData.updateToken(getAccessToken)
    },[authData])
    // useEffect(() => {

    //     const fetchUser = async () => {
    //         console.log("fetch user, checking...")
    //         try {
    //             const response = await axios.get("http://localhost:3000/checkauth", { withCredentials: true });
    //             const data = response.data
    //             console.log("response received from server", data)
    //             if (data.id) {
    //                 authData.updateIsAuth(true)
    //                 authData.updateUserDetail(data)
    //                 console.log("user details is set as:", data)

    //             } else {
    //                 console.log("user is not authenticated")
    //             }
    //         } catch (error) {
    //             console.error("error checking authentication", error)
    //         }

    //     }

    //     fetchUser()

    // }, []);

    return (
        <>
            {!authData.getIsAuth() ?
                <div>
                    <h1>Home Page</h1>
                    <h5>Please Login!</h5>
                </div>
                :
                <div>
                    <h1>Home Page</h1>
                    <h5>Welcome Back! {authData.getUserDetail().username}</h5>
                    <button className='btn btn-success' onClick={refreshToken}>Refresh Token</button>
                </div>
            }
        </>



    )
}