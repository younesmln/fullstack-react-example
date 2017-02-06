import React from 'react';
import { Field} from 'redux-form';
import { Form, Button, Grid, Message } from 'semantic-ui-react';
import FormField from '../common/formField';
import { required, notEmail, minLength } from '../../utils/validation';

class Signup extends React.Component {
  constructor(props){
    super(props);
    console.log(this.props);
  }
  render() {
    const {handleSubmit, submitting, submitFailed, invalid, touched} = this.props;
    return (
      <Grid centered>
        <Grid.Column mobile={14} tablet={8} computer={5}>
          <Message attached header='Register' />
          <Form className="attached fluid segment" onSubmit={handleSubmit} error={submitFailed && !submitting} loading={submitting}>
            <Field component={FormField} validate={[required]} name="name" placeholder="name" type="text"/>
            <Field component={FormField} validate={[required]} name="username" placeholder="username" type="text"/>
            <Field component={FormField} validate={[required, notEmail]} name="email" placeholder="email" type="email"/>
            <Field component={FormField} validate={[minLength(4)]} name="password" placeholder="password" type="password"/>
            <Message error header='check form errors' />
            <Button disabled={submitting} >register</Button>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }

}

export default Signup;