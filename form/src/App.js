import React, { useContext, useEffect } from 'react';
import AuthContext from './components/authcontext/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddPropertyPage from './components/pages/AddPropertyPage';
import LoginPage from './components/pages/LoginPage';
import Header from './components/layout/Header';
import Landing from './components/pages/Landing';
import UnAuth from './components/pages/UnAuth';
import Dashboard from './components/pages/Dashboard';
import AboutUs from './components/pages/AboutUs';
import PropertyListing from './components/pages/PropertyListing';
import Cart from './components/pages/Cart';
import Loading from './components/pages/Loading';
import axiosInstance from './axiosInstance';
import axios from 'axios';

function App() {

  const authData = useContext(AuthContext);

  useEffect(() => {

    const refresh = async () => {
      try {


        // await authData.updateIsLoading(true)
        const response = await axios.post('http://localhost:3000/user-login/refresh', {}, { withCredentials: true })
        const getAccessToken = response.data.accessToken
        console.log("****new Access Token:", getAccessToken)
        authData.updateToken(getAccessToken)


        if (getAccessToken) {
          const userData = await axios.get('http://localhost:3000/user-login/profile', {
            headers: {
              'Authorization': `Bearer ${getAccessToken}`
            }
          }, { withCredentials: true });
          authData.updateUserDetail(userData.data)

          if (getAccessToken && userData) {
            await authData.updateIsAuth(true)
            authData.updateFinishedLoading(true)



          } else {
            console.log("unable to authenticate as no access token or user details are found")
            authData.updateFinishedLoading(true)
          }

        } else {
          console.log("unable to authenticate or please log in again as no refresh token or access token are found")
          authData.updateFinishedLoading(true)
        }

      } catch (error) {
        console.error(error)

      }
    }

    refresh()
    // eslint-disable-next-line
  }, [])


  return (
    <>
      {!authData.getFinishedLoading() ?
        <Loading />
        :
        <Router>
          <Header />

          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/aboutus' element={<AboutUs />} />
            <Route path='/propertylisting' element={<PropertyListing/>} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/login' element={authData.getIsAuth() ? null : <LoginPage />} />
            <Route path='/dashboard' element={authData.getIsAuth() ? <Dashboard /> : <UnAuth />} />
            <Route path='/addproperty' element={authData.getIsAuth() ? <AddPropertyPage /> : <UnAuth />} />

          </Routes>

          <div className='container'>
            <h6>CopyRight 2023</h6>
          </div>
        </Router>
      }
    </>
  );
}

export default App;
