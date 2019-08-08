import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from 'yup';
import axios from 'axios';


function FormCreator({errors, touched, values, status}) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if(status) setUsers([...users, status])
  }, [status])

  console.log(users, 'formcreator users')
  return (
    <div>
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
        <div>
          <label>
            <Field type="checkbox" name="tos" checked={values.tos} />
            Terms of Service
          </label>
        </div>
        <button type="submit">Submit</button>
      </Form>
      <div>
        {users.map((user, key) =>
          <div key={key}>
            {user.name} : {user.email}
          </div>
        )}
      </div>
    </div>
  );
}

const FormikOnboardForm = withFormik({
  mapPropsToValues({name, email, password, tos}) {
    return {
      name: name || '',
      email: email || '',
      password: password || '',
      tos: tos || false
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
  handleSubmit(values, { resetForm, setStatus }) {
    console.log(values)
    axios.post('https://reqres.in/api/users', values)
      .then(response => {
        console.log(response);
        setStatus(response.data);
        resetForm();
      }).catch(err => {
        console.log(err);
      });
  }
})(FormCreator);

export default FormikOnboardForm;
