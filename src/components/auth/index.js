import React, { Component } from "react";
// import logo from "../../images/logo_transparent.png";
// import fbWhite from "../../images/fb-white.svg";
// import whiteCross from "../../images/cross-white.svg";
import "./auth.scss";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import { Formik, Form } from "formik";
import FacebookLogin from "react-facebook-login";
import Loader from "react-loader-spinner";
import { withRouter, Route, Switch } from "react-router-dom";
import Block1 from "../generic/Block1";
import l_img from "../../images/l_img.png";
import login_r_img from "../../images/login_r_img.png";
import signup_r_img from "../../images/signup_r_img.png";
import Login from "../login/index";
import Signup from "../signup";
import { Link } from "react-router-dom";

class Auth extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }
  componentDidMount() {
    window.scrollTo(0,0);
  }
  
  componentDidUpdate(prevProps) {
    // if (
    //   this.props.userdata.isSuccess &&
    //   this.props.userdata.isSuccess !== prevProps.userdata.isSuccess
    // ) {
    //   this.props.modalStateHandler(false, false, false, false);
    // }
  }
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  responseFacebook = response => {
    this.props.socialLogin(response);
  };
  render() {
    const { location } = this.props;
    return (
      <Block1
        l_img={l_img}
        r_img={
          this.props.location.pathname === "/auth" ? login_r_img : signup_r_img
        }
      >
        <div className="container ">
          <div className="row login-form-row">
            <div className="col-lg-6 offset-lg-4 col-md-8 offset-md-2 col-sm-12 col-xs-12 login-form register-form">
              <div className="row">
                <div className="col-md-10 offset-md-1 col-sm-10 offset-sm-1 center-align">
                  <nav>
                    <span
                      className={`form-title ${
                        location.pathname === "/auth/" ? " active" : ""
                      }`}
                    >
                      <Link to="/auth/">Log in</Link>
                    </span>
                    <span
                      className={`form-title ${
                        location.pathname === "/auth/register" ? " active" : ""
                      }`}
                    >
                      <Link to="/auth/register">Sign up</Link>
                    </span>
                  </nav>

                  <Switch>
                    <Route path="/auth/register" render={() => <Signup />} />
                    <Route path="/auth/" render={() => <Login />} />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Block1>
    );
  }
}

export default Auth;
