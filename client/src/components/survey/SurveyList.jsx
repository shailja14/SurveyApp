import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';
import { surveyListAPI } from '../../api/surveyApi';

class SurveyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            surveyList: [],
            serverError: null,
        };
        this.onSurveySucess = this.onSurveySucess.bind(this);
    }

    onSurveySucess(type, res) {
        if (type === 'err') {
            this.setState({ serverError: 'Something Went wrong. Try again Later.' });
        } else if (res.data.success) {
            this.setState({ surveyList: res.data.message });
        }
    }

    componentDidMount() {
        if (!this.props.authProps.isLoggedIn) {
            this.props.history.push('/login');
        }
        surveyListAPI(null, this.onSurveySucess, this.props.authProps.token);
    }

    render() {
        const { surveyList = [] } = this.state;
        return (
            <React.Fragment>
                <div className="row justify-content-center">

                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Accessibility</th>
                                <th>Is Active</th>
                                <th>Created By</th>
                            </tr>
                        </thead>
                        <tbody>
                            {surveyList.length > 0 && surveyList.map((item) => (
                                <tr key={item.name}>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.accessibility}</td>
                                    <td>{item.active.toString()}</td>
                                    <td>{item.created_by.name}</td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>
                    <div className="inline-errormsg" align="center" margin="10px">
                        {this.state.serverError}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
SurveyList.propTypes = {
    authProps: PropTypes.shape({
        isLoggedIn: PropTypes.bool,
        token: PropTypes.string,
    }).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};
export default SurveyList;
