import React, { Component } from "react";
import "./forgotPass.scss";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import { Formik, Form } from "formik";
import Loader from "react-loader-spinner";
import { withRouter } from "react-router-dom";

class ForgotPass extends Component {
  constructor() {
    super();
    this.state = {
      email: ""
    };
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.userdata.isSuccess &&
      this.props.userdata.isSuccess !== prevProps.userdata.isSuccess
    ) {
      this.props.modalStateHandler(false, false, false);
    }
  }
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { closeModal, modalStateHandler, forgot } = this.props;
    const { email } = this.state;
    return (
      <div className="">
        <div className="col-md-4 offset-md-4 col-sm-6 offset-sm-3 forgot-form">
          <div className="center-align">
            <div className="form-title">Forgot Password</div>
          </div>
          <Formik
            initialValues={{
              email: ""
            }}
            validate={values => {
              let errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
            onSubmit={(values, actions) => {
              this.props.forgotRequest(values);
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
                <div className="">
                  <div className=" ">
                    <div className="input-fields">
                      <label>Email</label>
                      <div className="input-box">
                        <input
                          name="email"
                          value={values.email}
                          type="email"
                          placeholder=""
                          onChange={handleChange}
                        />
                        {errors.email && touched.email && (
                          <label className="error">{errors.email}</label>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="">
                    <div className="forgot-btn">
                      <button type="submit">
                        {this.props.forgot.isLoading ? (
                          <div className="loader-div">
                            <Loader
                              type="Oval"
                              color="#fff"
                              height="20"
                              width="20"
                            />
                          </div>
                        ) : (
                          "Submit"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  forgot: state.auth.forgotPassword,
  userdata: state.auth.userdata
});

const mapDispatchToProps = dispatch => ({
  forgotRequest: data => dispatch(actions.forgotPasswordRequest(data)),
  getUserData: data => dispatch(actions.getUserDataRequest(data))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ForgotPass)
);
