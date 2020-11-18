import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';
import LoginAPI from '../../api/loginApi';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: [],
            serverError: null,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    hasError(key) {
        return this.state.errors.indexOf(key) !== -1;
    }

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value,
        });
    }

    handleRegister() {
        this.props.history.push('/register');
    }

    isInvalid = () => {
        const errors = [];
        const expression = /\S+@\S+/;
        const validEmail = expression.test(String(this.state.email).toLowerCase());
        if (!validEmail) {
            errors.push('email');
        }
        if (this.state.password === '') {
            errors.push('password');
        }
        this.setState({
            errors,
        });
        return errors.length > 0;
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.isInvalid()) {
            return;
        }
        const callback = (type, res) => {
            if (type === 'err') {
                this.props.authProps.setAuthState(false, null);
                this.setState({ serverError: 'Invalid Credentials' });
            } else if (res.data.success) {
                this.props.authProps.setAuthState(true, res.data.data.token);
                this.props.history.push('/surveyList');

                // dispatch({ type: 'LOGIN', payload: res.data });
                Cookies.set('token', res.data.data.token, { expires: 1 });
            }
        };
        LoginAPI({
            emailOrId: this.state.email,
            password: this.state.password,
        }, callback);
    }

    render() {
        return (
            <div className="row justify-content-center">
                <Form className="col-sm-8">
                    <Form.Group as={Row} controlId="email">
                        <Form.Label column sm={4}>
                            Email
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control className={
                                this.hasError('email')
                                    ? 'form-control is-invalid'
                                    : 'form-control'
                            } type="email" onChange={this.handleChange} placeholder="Email" />
                            <div className={this.hasError('email') ? 'inline-errormsg' : 'hidden'}>
                                    Email is invalid or missing
                            </div>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="password">
                        <Form.Label column sm={4}>
                            Password
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control className={
                                this.hasError('password')
                                    ? 'form-control is-invalid'
                                    : 'form-control'
                            } type="password" onChange={this.handleChange} placeholder="password" />
                            <div className={this.hasError('password') ? 'inline-errormsg' : 'hidden'}>
                                    Enter Password
                            </div>
                        </Col>
                    </Form.Group>
                    <div className="btn-toolbar row justify-content-center">
                        <button type="button" id="btnLogin" className="btn btn-primary btn-sm" onClick={this.handleSubmit}>Login</button>
                        <button type="button" id="btnRegister" className="ml-4 btn btn-primary btn-sm" onClick={this.handleRegister}>SignUp</button>
                    </div>
                    <div className="inline-errormsg" align="center" margin="10px">
                        {this.state.serverError}
                    </div>
                </Form>
            </div>
        );
    }
}
Login.propTypes = {
    authProps: PropTypes.shape({
        isLoggedIn: PropTypes.bool,
        token: PropTypes.string,
        setAuthState: PropTypes.func,
    }).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};
export default Login;
