import React, { Component } from 'react';
import {
    Form, Col, Row, Modal, Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { surveyCreateAPI } from '../../api/surveyApi';

class Survey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            name: '',
            expiryDate: '',
            email: '',
            surveyURL: '',
            caseClosure: false,
            activityClosure: false,
            surveyAccessibility: 'User group 1',
            errors: [],
            showAlert: false,
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

    handelCancel = () => {
        this.setState({
            active: false,
            showAlert: false,
            name: '',
            expiryDate: '',
            email: '',
            surveyURL: '',
            caseClosure: false,
            activityClosure: false,
            surveyAccessibility: '',
            errors: [],
            serverError: null,
        });
    }

    checkBoxChange = (e) => {
        this.setState({
            [e.target.id]: e.target.checked,
        });
    }

    selectionBoxChange = (e) => {
        this.setState({
            [e.target.id]: e.target.selectedOption,
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
        if (this.state.surveyURL === '') {
            errors.push('surveyURL');
        }
        if (this.state.expiryDate === '') {
            errors.push('expiryDate');
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
        const {
            active, name, expiryDate, email, surveyURL, caseClosure,
            activityClosure, surveyAccessibility,
        } = this.state;
        const payload = {
            active,
            name,
            expiry_date: expiryDate,
            email,
            url: surveyURL,
            trigger: { caseClosure, activityClosure },
            accessibility: surveyAccessibility,
        };

        const callback = (type, res) => {
            if (type === 'err') {
                this.setState({ serverError: 'Something Went wrong. Try again Later.' });
            } else if (res.data.success) {
                this.setState({ showAlert: true });
            } else if (!res.data.success) {
                this.setState({ serverError: res.data.message.message });
            }
        };
        surveyCreateAPI(payload, callback, this.props.authProps.token);
    }

    componentDidMount() {
        if (!this.props.authProps.isLoggedIn) {
            this.props.history.push('/login');
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="row justify-content-center create-survey">
                    <Form className="col-sm-8">
                        <Form.Check onChange={this.checkBoxChange} checked={this.state.active} type="checkbox" id="active" label="Active" />
                        <Form.Group as={Row} controlId="name">
                            <Form.Label column sm={4}>Survey Name</Form.Label>
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
                        <Form.Group as={Row} controlId="expiryDate">
                            <Form.Label column sm={4}>Survey Expiry Date</Form.Label>
                            <Col sm={8}><Form.Control className={
                                this.hasError('expiryDate')
                                    ? 'form-control is-invalid'
                                    : 'form-control'
                            } onChange={this.handleChange} value={this.state.expiryDate} type="date" />
                            <div className={ this.hasError('expiryDate') ? 'inline-errormsg' : 'hidden'}>
                                    Please select Date
                            </div>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="email">
                            <Form.Label column sm={4}>
                            Email
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control type="email" className={
                                    this.hasError('email')
                                        ? 'form-control is-invalid'
                                        : 'form-control'
                                } onChange={this.handleChange} value={this.state.email} placeholder="Email" />
                                <div className={ this.hasError('name') ? 'inline-errormsg' : 'hidden'}>
                                    Missing or invalid email
                                </div>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="surveyURL">
                            <Form.Label column sm="4">
                            Survey URL
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control className={
                                    this.hasError('surveyURL')
                                        ? 'form-control is-invalid'
                                        : 'form-control'
                                } onChange={this.handleChange} value={this.state.surveyURL} placeholder="" />
                                <div className={ this.hasError('surveyURL') ? 'inline-errormsg' : 'hidden'}>
                                    Please enter URL
                                </div>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} id="surveyTrigger">
                            <Form.Label column sm="4">
                            Survey Trigger
                            </Form.Label>
                            <Col sm="8">
                                <Form.Check onChange={this.checkBoxChange} checked={this.state.caseClosure} type="checkbox" id="caseClosure" label="Case closure" />
                                <Form.Check onChange={this.checkBoxChange} checked={this.state.activityClosure} type="checkbox" id="activityClosure" label="Activity closure" />
                            </Col>

                        </Form.Group>

                        <Form.Group as={Row} controlId="surveyAccessibility">

                            <Form.Label column sm="4">
                            Survey Accessbility
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control as="select" custom onChange={this.handleChange} value={this.state.surveyAccessibility}>
                                    <option>User group 1</option>
                                    <option>User group 2</option>
                                    <option>User group 3</option>
                                    <option>User group 4</option>
                                </Form.Control>
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
                            <Modal.Body>Survey Created successfully</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handelCancel}>
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
Survey.propTypes = {
    authProps: PropTypes.shape({
        isLoggedIn: PropTypes.bool,
        token: PropTypes.string,
    }).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

export default Survey;
