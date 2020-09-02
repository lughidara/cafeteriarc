import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import {NavLink} from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="#home">Cafeteria</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink exact={true} to="/" className="nav-link">Inicio</NavLink>
                        <NavLink exact={true} to="/productos" className="nav-link">Productos</NavLink>
                        <NavLink exact={true} to="/productos/nuevo" className="nav-link">Agregar Productos</NavLink>

                    </Nav>  
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Header;