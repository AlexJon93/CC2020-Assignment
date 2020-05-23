import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import docCookies from 'doc-cookies';
import { TOKEN } from './constants/cookies';

class MyNav extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            loggedIn: docCookies.getItem(TOKEN)
        };
    }

    render() {
        if (this.state.loggedIn) {
            return (
                <Navbar bg="light" variant="light">
                    <Navbar.Brand as={Link} to="/">Groupr</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                        <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                        <Nav.Link as={Link} to="/group">Groups</Nav.Link>
                    </Nav>
                </Navbar>
            );
        }
        return (
            <Navbar bg="light" variant="light">
                <Navbar.Brand as={Link} to="/">Groupr</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    <Nav.Link as={Link} to="/register">Register</Nav.Link>
                </Nav>
            </Navbar>
        );
    }
}
export default MyNav;