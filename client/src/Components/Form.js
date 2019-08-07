import React from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from 'yup';


function FormCreator({errors, touched}) {

  return (
    <Form>
      <div>
        {touched.name && errors.name && <p>{errors.name}</p>}
        <Field type="text" name="name" placeholder="Name" />
      </div>
      <div>
        {touched.email && errors.email && <p>{errors.email}</p>}
        <Field type="email" name="email" placeholder="Email" />
      </div>
      <div>
        {touched.password && errors.password && <p>{errors.password}</p>}
        <Field type="password" name="password" placeholder="Password" />
      </div>
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
  //======Validation Schema=======
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Email is not valid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be 6 characters or more')
      .required('Password is required'),
    name: Yup.string()
      .required()
  }),
  handleSubmit(values) {
    console.log(values);
  }
})(FormCreator);

export default FormikOnboardForm;
