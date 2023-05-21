import React, { useState, useMemo } from 'react';
import AuthContext from './AuthContext';

export default function AuthContextProvider(props) {

    const [isAuth, setIsAuth] = useState(false);
    const [finishedLoading, setFinishedLoading] = useState(false);
    const [userDetail, setUserDetail] = useState({});
    const [token, setToken] = useState("");

    const context = useMemo(() => {

        return {

            getIsAuth: () => {
                return isAuth;
            },
            updateIsAuth: (value) => {
                return setIsAuth(value);
            },
            getFinishedLoading: () => {
                return finishedLoading;
            },
            updateFinishedLoading: (value) => {
                return setFinishedLoading(value);
            },
            getUserDetail: () => {
                return userDetail;
            },
            updateUserDetail: (value) => {
                return setUserDetail(value);
            },
            getToken: () => {
                return token;
            },
            updateToken: (value) => {
                return setToken(value);
            }
        };

    }, [isAuth, userDetail, token, finishedLoading]);

    return (
        <>
            <AuthContext.Provider value={context}>
                {props.children}
            </AuthContext.Provider>
        </>
    );
};