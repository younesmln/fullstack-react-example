import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { loginStart } from '../../reducers/authReducer';
import Login  from './login';

const LOGIN_FORM = 'login';

class LoginContainer extends React.Component {
  constructor(props){
    super(props);
    this.submit = this.submit.bind(this);
  }
  submit(values){
    const {loginStart} = this.props;
    return new Promise((resolve, reject) => {
      loginStart(values, {resolve, reject})
    })
  }
  render() {
    const {handleSubmit} = this.props;
    return (
      <Login {...this.props} handleSubmit={handleSubmit(this.submit)} />
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({loginStart}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({form: LOGIN_FORM})(LoginContainer));
