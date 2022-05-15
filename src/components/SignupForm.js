import React, { useState, useEffect } from "react";

function SignupForm() {
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phoneNumber: "",
    terms: false,
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
  };

  const validate = (values) => {
    const errors = {};
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;
    const phoneRegex = /^\d{10}$/;

    errors.email = !values.email
      ? "email address cannot be empty"
      : !emailRegex.test(values.email)
      ? "email is not valid"
      : "";

    errors.password = !values.password
      ? "password cannot be empty"
      : values.password.length < 6
      ? "password must contain 6 characters."
      : "";

    errors.confirmPassword = !values.confirmPassword
      ? "confirm password cannot be empty"
      : values.password !== values.confirmPassword
      ? "passwords doesn't match"
      : "";

    errors.fullName = !values.fullName ? "full name cannot be empty" : "";

    errors.phoneNumber = !values.phoneNumber
      ? "phone number cannot be empty"
      : !phoneRegex.test(values.phoneNumber)
      ? "phone number must contain 10 digits"
      : "";
    return errors;
  };

  return (
    <div>
      <form className="" onSubmit={handleSubmit}>
        <h2>Create an account</h2>
        <div>
          <label>Your email address</label>
          <input
            type="text"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />
          <br />
          <span>{formErrors.email}</span>
        </div>
        <div>
          <label>Your password</label>
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
          />
          <br />
          <span>{formErrors.password}</span>
        </div>
        <div>
          <label>Confirm your password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formValues.confirmPassword}
            onChange={handleChange}
          />
          <br />
          <span>{formErrors.confirmPassword}</span>
        </div>
        <div>
          <label>Your full name</label>
          <input
            type="text"
            name="fullName"
            value={formValues.fullName}
            onChange={handleChange}
          />
          <br />
          <span>{formErrors.fullName}</span>
        </div>
        <div>
          <label>Your phone number</label>
          <input
            name="phoneNumber"
            value={formValues.phoneNumber}
            onChange={handleChange}
          />
          <br />
          <span>{formErrors.phoneNumber}</span>
        </div>
        <div className="form__input__div">
          <label>
            <input
              type="checkbox"
              name="terms"
              className="form__input--checkbox"
              value={formValues.terms}
              onChange={handleChange}
            />
            I read and agree Terms and Conditions
          </label>
          <br />
          <span>{formErrors.terms}</span>
        </div>
        <button>Create account</button>
      </form>
    </div>
  );
}

export default SignupForm;
