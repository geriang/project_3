import React, { useContext } from 'react';
import AuthContext from '../authcontext/AuthContext';



export default function Dashboard() {

    const authData = useContext(AuthContext);

    return (
        <>
            <h1>Dashboard</h1>
            <h4>Hi, Welcome back {authData.getUserDetail().username}!</h4>
        </>
    )
}