import React, { useContext, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../authcontext/AuthContext';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function Header() {

    const authData = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = useCallback(async () => {
        // withCredentials is to send session/cookie info to server
        await axios.post('http://localhost:3000/user-logout', {}, { withCredentials: true })
        navigate("/")
        authData.updateIsAuth(false)
        authData.updateUserDetail(null)
        authData.updateToken(null)
    }, [navigate, authData])

    return (
        <>
            {['lg'].map((expand) => (
                <Navbar key={expand} bg="light" expand={expand} className="mb-3">
                    <Container fluid>
                        <Link className="nav-link" to="/"><Navbar.Brand>HSA</Navbar.Brand></Link>
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end">
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    Quick Links
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                {(authData.getIsAuth()) ?
                                    <Nav className="justify-content-start flex-grow-1 pe-3">
                                        <Link className="nav-link" to="/aboutus">About Us</Link>
                                        <Link className="nav-link" to="/propertylisting">Property Listings</Link>
                                        <Link className="nav-link" to="/dashboard">Dashboard</Link>
                                        <Link className="nav-link" to="/addproperty">Add Property</Link>
                                        <Link className="nav-link" to="/">Edit Property</Link>
                                    </Nav>
                                    :
                                    <Nav className="justify-content-start flex-grow-1 pe-3">
                                        <Link className="nav-link" to="/aboutus">About Us</Link>
                                        <Link className="nav-link" to="/propertylisting">Property Listings</Link>
                                    </Nav>
                                }
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                        <Nav className="justify-content-end ms-auto pe-3">
                            {(authData.getIsAuth()) ?
                                <button className="btn btn-danger btn-sm" onClick={logout}>Logout</button>
                                :
                                <Link className="btn btn-danger btn-sm" to="/login">Login</Link>
                            }
                        </Nav>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                    </Container>
                </Navbar>
            ))}
            <div className='d-flex justify-content-end pe-4'>
            <Link className="btn btn-warning btn-sm" to="/cart">Cart</Link>
            </div>

        </>
    );
}


