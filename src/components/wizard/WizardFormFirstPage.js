import React from "react";
import { Field, reduxForm } from "redux-form";
import validate from "./validate";
import { renderField } from "./renderField";
import "./index.scss";

const WizardFormFirstPage = props => {
  const { handleSubmit, userdata } = props;
  return (
    <div>
      <div className="form">
        <div className="form-1">
          <div className="form-header">
            <div className="number">1</div>
            <div className="subHeading">General information</div>
          </div>
          <form onSubmit={handleSubmit}>
            {userdata.data && userdata.data._id ? (
              <div>
                <Field
                  name="title"
                  type="text"
                  component={renderField}
                  label="Your company name"
                  placeholder=""
                />
              </div>
            ) : (
              <div>
                <Field
                  name="fullName"
                  type="text"
                  component={renderField}
                  label="Your full name"
                />
                <Field
                  name="title"
                  type="text"
                  component={renderField}
                  label="Your company name"
                  placeholder=""
                />
                <Field
                  name="email"
                  type="email"
                  component={renderField}
                  label="Email"
                />
                <Field
                  name="password"
                  type="password"
                  component={renderField}
                  label="Password"
                />
              </div>
            )}

            <div>
              <button type="submit" className="nextsignup">
                CONTINUE
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="inActiveHeader">
        <div className="number">2</div>
        <div className="subHeading">About your company</div>
      </div>
      <div className="inActiveHeader">
        <div className="number">3</div>
        <div className="subHeading">Contact information</div>
      </div>
    </div>
  );
};

export default reduxForm({
  form: "wizard", // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  initialValues: {
    title: "",
    monStartTime:"12:00 AM",
    tueStartTime:"12:00 AM",
    wedStartTime:"12:00 AM",
    thrStartTime:"12:00 AM",
    friStartTime:"12:00 AM",
    satStartTime:"12:00 AM",
    sunStartTime:"12:00 AM",
  },  
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormFirstPage);
