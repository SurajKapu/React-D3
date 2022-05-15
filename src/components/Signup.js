import React from "react";
import SignupForm from "./SignupForm";

function Signup() {
  return (
    <div className="container">
      <div className="container__left">
        <div>
          <img src="https://mydash.report/static/media/date-range.e19fcc46.webp" />
        </div>
        <div>
          <h3>Choose a date range</h3>
          <p>
            Lorem ipsum dolor sit amet,consectetur
            <br /> adipiscing elit.Maurirs imperdiet bibendum.
          </p>
        </div>
      </div>
      <div className="container__right">
        <SignupForm />
      </div>
    </div>
  );
}

export default Signup;
