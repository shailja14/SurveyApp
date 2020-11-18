import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';
import Login from './components/login/Login';
import Survey from './components/survey/SurveyCreate';
import SurveyList from './components/survey/SurveyList';
import NavBar from './components/navbar/navbar';
import Register from './components/register/register';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: !!Cookies.get('token'),
            token: Cookies.get('token') ? Cookies.get('token') : null,
        };
    }

  setAuthState = (status, token) => {
      this.setState({
          isLoggedIn: status,
          token,
      });
  }

  render() {
      const authProps = {
          setAuthState: this.setAuthState,
          isLoggedIn: this.state.isLoggedIn,
          token: this.state.token,
      };
      return (
          <React.Fragment>
              <BrowserRouter>
                  {<React.Fragment>
                      {this.state.isLoggedIn && <NavBar authProps={authProps} />}
                      <div className="app-content">
                          <Switch>
                              <Route exact path = "/login" render = {(props) => <Login {...props} authProps={authProps}/> }></Route>
                              <Route exact path = "/survey" render = {(props) => <Survey {...props} authProps={authProps} /> }></Route>
                              <Route exact path = "/register" render = {(props) => <Register {...props} authProps={authProps} /> }></Route>
                              <Route exact path = "/surveyList" render = {(props) => <SurveyList {...props} authProps={authProps} /> }></Route>
                              <Route path = "/" render = {(props) => <Survey {...props} authProps={authProps}/> }></Route>
                          </Switch>
                      </div>
                  </React.Fragment>}
              </BrowserRouter>
          </React.Fragment>
      );
  }
}

export default App;
