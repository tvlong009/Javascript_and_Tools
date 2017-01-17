import React from 'react'
import {Link} from 'react-router'
import {Navbar, Nav, NavItem} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

export const NavbarView = () => {
    return (
        <Navbar inverse fixedTop fluid>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to='/dashboard'>Dashboard</Link>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <LinkContainer to='/about'>
                    <NavItem>About Us</NavItem>
                </LinkContainer>
            </Nav>
        </Navbar>
    )
}
