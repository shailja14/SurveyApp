import React, { Component } from 'react';
import {
    Form, Col, Row, Modal, Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import registerUserAPI from '../../api/userApi';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            showAlert: false,
            email: '',
            password: '',
            errors: [],
            serverError: null,
        };
    }

    hasError(key) {
        return this.state.errors.indexOf(key) !== -1;
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    }

    isInvalid = () => {
        const errors = [];
        if (this.state.name === '') {
            errors.push('name');
        }
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

    handelSubmit = (event) => {
        event.preventDefault();
        if (this.isInvalid()) {
            return;
        }
        const callback = (type, res) => {
            if (type === 'err') {
                this.setState({ serverError: 'Something Went wrong. Try again Later.' });
            } else if (res.data.success) {
                this.setState({ showAlert: true });
            }
        };
        registerUserAPI(this.state, callback);
    }

    handleClose = () => {
        this.setState({ showAlert: false });
        this.props.history.push('/login');
    }

    handelCancel = () => {
        this.setState({
            name: '',
            email: '',
            password: '',
            errors: [],
        });
        this.props.history.push('/login');
    }

    render() {
        return (
            <React.Fragment>
                <div className="row justify-content-center create-survey">
                    <Form className="col-sm-8">
                        <Form.Group as={Row} controlId="name">
                            <Form.Label column sm={4}>Name</Form.Label>
                            <Col sm={8}><Form.Control className={
                                this.hasError('name')
                                    ? 'form-control is-invalid'
                                    : 'form-control'
                            } value={this.state.name} onChange={this.handleChange} placeholder="Name" />
                            <div className={ this.hasError('name') ? 'inline-errormsg' : 'hidden'}>
                                    Please enter name
                            </div>
                            </Col>

                        </Form.Group>
                        <Form.Group as={Row} controlId="email">
                            <Form.Label column sm={4}>
                            Email
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control className={this.hasError('email')
                                    ? 'form-control is-invalid'
                                    : 'form-control'
                                } type="email" onChange={this.handleChange} placeholder="Email" />
                                <div className={this.hasError('email') ? 'inline-errormsg' : 'hidden'}>
                                    Email is invalid or missing
                                </div>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="password">
                            <Form.Label column sm="4">
                            Password
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control className={this.hasError('password')
                                    ? 'form-control is-invalid'
                                    : 'form-control'
                                } type="password" onChange={this.handleChange} placeholder="" />
                                <div className={ this.hasError('password') ? 'inline-errormsg' : 'hidden'}>
                                    Please enter password
                                </div>
                            </Col>
                        </Form.Group>

                        <div className="btn-toolbar row justify-content-center">
                            <button type="button" id="btnSubmit" className="btn btn-primary btn-sm" onClick={this.handelSubmit}>Submit</button>
                            <button type="button" id="btnCancel" className="ml-4 btn btn-primary btn-sm" onClick={this.handelCancel}>Cancel</button>
                        </div>
                        <div className="inline-errormsg" align="center" margin="10px">
                            {this.state.serverError}
                        </div>
                        <Modal show={this.state.showAlert}>
                            <Modal.Header closeButton>
                                <Modal.Title>Success</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>User Created successfully</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose}>
                                Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Form>
                </div>
            </React.Fragment>
        );
    }
}
Register.propTypes = {
    authProps: PropTypes.shape({
        isLoggedIn: PropTypes.bool,
        token: PropTypes.string,
    }).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};
export default Register;
