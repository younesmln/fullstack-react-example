import React from 'react';
import { Field } from 'redux-form';
import { Form, Button, Grid, Message } from 'semantic-ui-react';
import FormField from '../common/formField';
import { required} from '../../utils/validation';

class Login extends React.Component {

  render() {
    const {handleSubmit, submitting, submitFailed} = this.props;
    return (
      <Grid centered>
        <Grid.Column mobile={14} tablet={8} computer={5}>
          <Message attached header='Login' />
          <Form className="attached fluid segment" onSubmit={handleSubmit} error={submitFailed && !submitting} loading={submitting}>
            <Field component={FormField} validate={[required]} name="login" placeholder="email or username"  type="text"/>
            <Field component={FormField} validate={[required]} name="password" placeholder="password" type="password"/>
            <Message error header='check form errors' />
            <Button disabled={submitting}>Login</Button>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }

}

export default Login;