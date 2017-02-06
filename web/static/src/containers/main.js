import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Login from '../components/login/loginContainer'
import Signup from '../components/signup/signupContainer'
import Navbar from '../components/common/navbar';
import NoMatch from '../components/common/noMatch';
import Authenticated from '../components/auth/authenticated';
import { loading } from '../selectors/uiSelector';
import { loggedIn, userSelector } from '../selectors/authSelector';
import Loading from '../components/common/loading';
import Notification from '../components/common/notification';
import { logout } from '../reducers/authReducer';

//import reactJs from '../../images/reactjs.png';
const Main = ({loading, loggedIn, user, logout}) => (
  <div>
    <Navbar loggedIn={loggedIn} logout={logout} user={user} />
    <Notification />
    {loading ? (
        <Loading  />
      ) : (
        <Switch>
          <Authenticated exact path="/" authRequired component={(props) => (<p>hello from index</p>)}/>
          <Authenticated exact path="/login" component={Login} />
          <Authenticated exact path="/register" component={Signup} />
          <Route component={NoMatch} />
        </Switch>
      )}
  </div>
);

function mapStateToProps(state) {
  return {
    loading: loading(state),
    loggedIn: loggedIn(state),
    user: userSelector(state)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({logout}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
