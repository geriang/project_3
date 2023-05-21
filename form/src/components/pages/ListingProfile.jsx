import React, { useContext } from 'react';
import AuthContext from '../authcontext/AuthContext';



export default function ListingProfile() {

    const authData = useContext(AuthContext);

    return (
        <>
            <h1>Listing Profile</h1>
            <h4>Hi, Welcome back {authData.getUserDetail().username}!</h4>
        </>
    )
}