import React, { Component } from "react";
import "./profile.scss";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import Loader from "react-loader-spinner";

class Profile extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    const { data } = this.props.userdata;
    return (
      <div className="">
        <div className="row profile-row">
          <div className="col-lg-8 offset-lg-2 col-md-8 offset-md-1 col-sm-8 offset-sm-1 profile-form">
            <div className="profile-title">
              <h3>Personal information</h3>
            </div>
            {data && (
              <>
                <Formik
                  initialValues={{
                    name: data.name.first + " " + data.name.last,
                    email: data.email,
                    receiveEmails: data.receiveEmails
                  }}
                  // enableReinitialize
                  validate={values => {
                    let errors = {};
                    if (!values.name) {
                      errors.name = "Required";
                    }
                    if (!values.email) {
                      errors.email = "Required";
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                        values.email
                      )
                    ) {
                      errors.email = "Invalid email address";
                    }
                    return errors;
                  }}
                  onSubmit={(values, actions) => {
                    this.props.updateUser({ id: data._id, data: values });
                  }}
                  render={({
                    values,
                    errors,
                    status,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting
                  }) => (
                    <Form>
                      <div className="input-fields-section">
                        <label className="label">Full Name</label>
                        <input
                          value={values.name}
                          className="input-field"
                          placeholder=""
                          name="name"
                          onChange={handleChange}
                          type="text"
                        />
                        {errors.name && touched.name && (
                          <label className="error">{errors.name}</label>
                        )}
                      </div>
                      <div className="input-fields-section">
                        <label className="label">Email</label>
                        <input
                          value={values.email}
                          className="input-field"
                          name="email"
                          placeholder=""
                          onChange={handleChange}
                          type="email"
                        />
                        {errors.email && touched.email && (
                          <label className="error">{errors.email}</label>
                        )}
                      </div>
                      <div className="notifications-checkmark">
                        <input
                          type="checkbox"
                          id="receiveEmails"
                          name="receiveEmails"
                          value="receiveEmails"
                          checked={values.receiveEmails}
                          onChange={handleChange}
                        />
                        <label htmlFor="receiveEmails">
                          <span className="notification-text">
                            Yes, I want to receive Top Events Jamaica emails
                          </span>
                        </label>
                      </div>
                      <div className="save-changes">
                        <button type="submit" className="save-btn">
                          {this.props.profileUpdate.isLoading ? (
                            <div className="loader-div">
                              <Loader
                                type="Oval"
                                color="#fff"
                                height="30"
                                width="30"
                              />
                            </div>
                          ) : (
                            "Update Profile Info"
                          )}
                        </button>
                      </div>
                    </Form>
                  )}
                />
                <Formik
                  initialValues={{
                    password: "",
                    password_confirm: ""
                  }}
                  // enableReinitialize
                  validate={values => {
                    let errors = {};
                    if (!values.password) {
                      errors.password = "Required";
                    } else {
                      if (!values.password_confirm) {
                        errors.password_confirm = "Required";
                      } else if (values.password !== values.password_confirm) {
                        errors.password_confirm = "Password does not match";
                      }
                    }
                    return errors;
                  }}
                  onSubmit={(values, actions) => {
                    this.props.updatePassword({ id: data._id, data: values });
                  }}
                  render={({
                    values,
                    errors,
                    status,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting
                  }) => (
                    <Form>
                      <div className="hr-div" />
                      <div className="profile-title">
                        <h3>Change password</h3>
                      </div>
                      <div className="input-fields-section">
                        <label className="label">New password</label>
                        <input
                          value={values.password}
                          className="input-field"
                          name="password"
                          placeholder=""
                          onChange={handleChange}
                          type="password"
                        />
                        {errors.password && touched.password && (
                          <label className="error">{errors.password}</label>
                        )}
                      </div>
                      <div className="input-fields-section">
                        <label className="label">Confirm password</label>
                        <input
                          value={values.password_confirm}
                          className="input-field"
                          name="password_confirm"
                          onChange={handleChange}
                          type="password"
                        />
                        {errors.password_confirm &&
                          touched.password_confirm && (
                            <label className="error">
                              {errors.password_confirm}
                            </label>
                          )}
                      </div>
                      <div className="save-changes">
                        <button type="submit" className="save-btn">
                          {this.props.passwordUpdate.isLoading ? (
                            <div className="loader-div">
                              <Loader
                                type="Oval"
                                color="#fff"
                                height="30"
                                width="30"
                              />
                            </div>
                          ) : (
                            "Update password"
                          )}
                        </button>
                      </div>
                    </Form>
                  )}
                />
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userdata: state.auth.userdata.data,
  profileUpdate: state.auth.profileInfoUpdate,
  passwordUpdate: state.auth.passwordUpdate
});

const mapDispatchToProps = dispatch => ({
  getUserData: data => dispatch(actions.getUserDataRequest(data)),
  updateUser: data => dispatch(actions.updateUserRequest(data)),
  updatePassword: data => dispatch(actions.updatePasswordRequest(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
