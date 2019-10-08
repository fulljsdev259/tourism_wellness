import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import { Formik, Form } from "formik";
import FacebookLogin from "react-facebook-login";
import Loader from "react-loader-spinner";
import { withRouter, Route, Link } from "react-router-dom";
import {GoogleLogin} from 'react-google-login';

class Login extends Component {
  componentDidUpdate(prevProps) {
    // if (
    //   this.props.signup.isSuccess &&
    //   this.props.signup.isSuccess !== prevProps.signup.isSuccess
    // ) {
    //   this.props.history.push("/auth/");
    //   // this.props.modalStateHandler(false, false, false, false);
    // }
    if (
      this.props.login.isSuccess &&
      this.props.login.isSuccess !== prevProps.login.isSuccess
    ) {
      this.props.history.push("/");
    }

    const { socialLoginData } =this.props;
    if(socialLoginData.isSuccess !== prevProps.socialLoginData.isSuccess){
      this.props.history.push("/");
    }
  }
  responseGoogle = (response) => {
    if(response && response.profileObj){
      const payload ={
        "email": response.profileObj.email,
        "name": {first: response.profileObj.name, last: ""},
        "receiveEmails": true
      }
      this.props.socialLogin(payload)
    }
  }
  render() {
    const { socialLoginData } =this.props;
    return (
      <>
        {/* <div className="col-12">
        <svg
          className="cross"
          onClick={() => closeModal()}
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M0 1.93L1.93 0l6.088 6.088L14.106 0l1.93 1.93L9.95 8.018l6.088 6.088-1.93 1.93-6.089-6.088-6.087 6.088L0 14.106l6.088-6.088z"
          />
        </svg>
      </div> */}
        {/* <img className="logo" src={logo}
            onClick={e => {
              e.preventDefault();
              modalStateHandler(false, false, false, false);
              this.props.history.push("/");
            }}
          /> */}
        <div className="fb-btn">
          {/* <FacebookLogin
            appId="2194646720630049" //APP ID NOT CREATED YET
            fields="name,email,picture"
            callback={this.responseFacebook}
          /> */}
          <div className="google-login-button-container">
          {socialLoginData.isLoading && <div style={{background:"rgba(0,0,0,.32)"}} className="google-button-overlay">
           <div className="loader-container">
          <Loader type="Oval" color="#000000" height="20" width="20" />
          </div>
          </div>}
          <GoogleLogin
            clientId={"459954917978-uh7khb6rp6fgom8jn5s5oags3m7uu75t.apps.googleusercontent.com"}
            buttonText="Login With Google"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            className="google-button-for-customization"
            // cookiePolicy={'single_host_origin'}
          />
          </div>
          {/* <button>
              <img src={fbWhite} /> Log in with Facebook{" "}
            </button> */}
        </div>
        {/* </div> */}
        {/* </div> */}
        <div className="row or-section">
          <div className="col-lg-5 col-md-4 col-sm-4 col-xs-5 hr-line-section">
            <div className="hr-line" />
          </div>
          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 or">
            <div className="or-text">or</div>
          </div>
          <div className="col-lg-5 col-md-4 col-sm-4 col-xs-5 hr-line-section">
            <div className="hr-line" />
          </div>
        </div>
        <Formik
          initialValues={{
            email: "",
            password: "",
            rememberMe: false
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
            if (!values.password) {
              errors.password = "Required";
            }
            return errors;
          }}
          onSubmit={(values, actions) => {
            this.props.loginRequest(values);
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
              <div className="input-fields">
                <label>Email</label>
                <div>
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
              <div className="input-fields">
                <label>Password</label>
                <div>
                  <input
                    name="password"
                    value={values.password}
                    type="password"
                    placeholder=""
                    onChange={handleChange}
                  />
                  {errors.password && touched.password && (
                    <label className="error">{errors.password}</label>
                  )}
                </div>
              </div>
              <div className="remember-me">
              <div>
                  <input
                    type="checkbox"
                    id="RememberMe"
                    name="rememberMe"
                    value="rememberMe"
                    checked={values.rememberMe}
                    onChange={handleChange}
                  />
                  <label htmlFor="RememberMe" />
                  <label className="remember-text">Remember me</label>
                </div>
                <span
                  className="forgot-password"
                  onClick={e => {
                    e.preventDefault();
                    // modalStateHandler(false, false, true, true);
                  }}
                >
                  <Link to="forgotPassword"> Forgot password?</Link>
                </span>
              </div>
              <div className="login-btn">
                <button
                  type="submit"
                  // onClick={() => {
                  //   this.props.login.isSuccess && this.props.history.push("/");
                  // }}
                >
                  {this.props.login.isLoading ? (
                    <div className="loader-div">
                      <Loader type="Oval" color="#fff" height="20" width="20" />
                    </div>
                  ) : (
                    "Log in"
                  )}
                </button>
              </div>
              {/* <div className="signup-Btn">
                <button
                  onClick={e => {
                    e.preventDefault();
                    // modalStateHandler(false, true);
                  }}
                >
                  <span>Sign up</span>
                </button>
              </div> */}
            </Form>
          )}
        />
        {/* <div className=" sign-up-btn">
          <div>
            <button
              className="signup-Btn"
              onClick={e => {
                e.preventDefault();
                // modalStateHandler(false, true);
              }}
            >
              <span>Sign up</span>
            </button>
          </div>
        </div> */}
      </>
    );
  }
}
const mapStateToProps = state => ({
  login: state.auth.login,
  //   userdata: state.auth.userdata
  socialLoginData: state.auth.socialLogin
});

const mapDispatchToProps = dispatch => ({
  loginRequest: data => dispatch(actions.loginRequest(data)),
  signupRequest: data => dispatch(actions.signupRequest(data)),
  socialLogin: data => dispatch(actions.socialLoginRequest(data)),
  //   getUserData: data => dispatch(actions.getUserDataRequest(data)),
  //   socialLogin: data => dispatch(actions.socialLoginRequest(data))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);
