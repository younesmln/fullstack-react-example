import React from 'react';
import { Form } from 'semantic-ui-react';

function FormField( {input, type, placeholder, meta: {touched, error}}) {
  return (
    <Form.Input {...input} placeholder={placeholder} type={type} error={touched && !!error} />
    // {touched && (error && <Message>{error}</Message>)}
  )
}

export default FormField;