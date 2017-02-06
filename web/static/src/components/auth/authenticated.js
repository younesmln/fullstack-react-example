import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { loggedIn } from '../../selectors/authSelector';

/**
 * actually I use this component for mainly 2 purposes, this first is the hide things that shouldn't appear
 * when the user isConnected (request register or login but you are already logged in) the second purpose
 * is to hide things that shouldn't appear whe the user is not logged (mainly the app components thar require authentication)
 * @param {boolean} authRequired a flag that specify if the component is use the hide auth stuff or to show them
 */
function Authenticated({component, authRequired, loggedIn, ...rest}) {
  const flag = (authRequired && loggedIn) || !(authRequired || loggedIn);
  return (
    <Route {...rest} render={props => (
      flag ? (
        React.createElement(component, props)
      ) : (
        <Redirect to={authRequired ? '/login' : '/'} />
      )
    )} />
  )
}

function mapStateToProps(state) {
  return {
    loggedIn: loggedIn(state)
  };
}
Authenticated.propTypes = {
  authRequired: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired
};

export default connect(mapStateToProps)(Authenticated);


