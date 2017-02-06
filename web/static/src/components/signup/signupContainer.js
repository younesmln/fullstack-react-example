import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import Signup from './signup';
import { signupStart } from '../../reducers/authReducer';

const FORM_NAME = 'signup';

class SignupForm extends React.Component {
  constructor(props){
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(values){
    const {signupStart} = this.props;
    return new Promise((resolve, reject) => {
      signupStart(values, {resolve, reject})
    });
  }
  render() {
    const {handleSubmit} = this.props;
    return (
      <Signup {...this.props} handleSubmit={handleSubmit(this.submit)} />
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({signupStart}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({form: FORM_NAME})(SignupForm));