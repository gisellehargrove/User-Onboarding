import React from 'react';
import { withFormik, Form, Field } from "formik";


function FormCreator() {

  return (
    <Form>
      <Field type="text" name="name" placeholder="Name" />
      <Field type="text" name="email" placeholder="email" />
      <Field type="password" name="password" placeholder="password" />
      <button>Submit</button>
    </Form>
  )
}

const FormikOnboardForm = withFormik({
  mapPropsToValues({name, username, password}) {
    return {
      name: name || '',
      username: username || '',
      password: password || ''
    };
  },

  handleSubmit(values) {
    console.log(values);
  }
})(FormCreator);

export default FormikOnboardForm;
