import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phoneNumber: "",
    terms: false,
  };

  const [isSubmit, setIsSubmit] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    let isEmpty = false;
    isEmpty = Object.values(formErrors).every((x) => x === "");
    if (isEmpty && isSubmit) {
      navigate("/chart");
    }
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

    errors.terms = !values.terms ? "please agree our terms & conditions" : "";
    return errors;
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <h2>Create an account</h2>
        <div className="form__group">
          <label>Your email address</label>
          <input
            className="form__input"
            type="text"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />
          <br />
          <span>{formErrors.email}</span>
        </div>
        <div className="form__group">
          <label>Your password</label>
          <input
            className="form__input"
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
          />
          <br />
          <span>{formErrors.password}</span>
        </div>
        <div className="form__group">
          <label>Confirm your password</label>
          <input
            className="form__input"
            type="password"
            name="confirmPassword"
            value={formValues.confirmPassword}
            onChange={handleChange}
          />
          <br />
          <span>{formErrors.confirmPassword}</span>
        </div>
        <div className="form__group">
          <label>Your full name</label>
          <input
            className="form__input"
            type="text"
            name="fullName"
            value={formValues.fullName}
            onChange={handleChange}
          />
          <br />
          <span>{formErrors.fullName}</span>
        </div>
        <div className="form__group">
          <label>Your phone number</label>
          <input
            className="form__input"
            name="phoneNumber"
            value={formValues.phoneNumber}
            onChange={handleChange}
          />
          <br />
          <span>{formErrors.phoneNumber}</span>
        </div>
        <div className="form__group">
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
        <button className="form__btn">Create account</button>
      </form>
    </div>
  );
}

export default SignupForm;
