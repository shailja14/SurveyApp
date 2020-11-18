import React from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

class NavigationBar extends React.Component {
    handelLogout = () => {
        Cookies.remove('token');
        this.props.authProps.setAuthState(false, null);
        this.props.history.push('/login');
    }

    render() {
        return (<React.Fragment>
            <Navbar bg="primary" expand="lg">
                <Navbar.Brand>SurveyApp</Navbar.Brand>
                {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
                <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
                <Nav className="mr-auto">
                    <NavLink to="/survey">Create Survey</NavLink>
                    <NavLink to="/surveyList">List Survey</NavLink>
                </Nav>
                {/* <Nav className="profile">
                    <NavLink to="/profile">{user.name}</NavLink>
                </Nav> */}
                <Button variant="link" onClick={this.handelLogout}><img alt="image" src="/logout-button.svg" width="20" height="20" /></Button>
            </Navbar>
        </React.Fragment>);
    }
}
NavigationBar.propTypes = {
    authProps: PropTypes.shape({
        isLoggedIn: PropTypes.bool,
        token: PropTypes.string,
        setAuthState: PropTypes.func,
    }).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

export default withRouter(NavigationBar);
