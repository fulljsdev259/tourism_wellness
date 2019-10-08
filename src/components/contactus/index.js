import React, { Component } from "react";
import Block1 from "../generic/Block1";
import l_img from "../../images/l_img.png";
import contact_r_img from "../../images/contact_r_img.png";
import { Formik, Form } from "formik";
import "./contactus.scss";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import * as actions from "../../redux/actions";

class ContactUs extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <Block1 l_img={l_img} r_img={contact_r_img}>
        <div className="">
          <div className="row  contact-block">
            <div className="col-lg-6 offset-lg-4 col-md-6 offset-md-4 col-sm-10 col-sm-offset-1 contact-div">
              {!this.props.contactUs.isSuccess ? (
                <>
                  <div className="title">Contact Us</div>
                        <div className="contact-address mtn-contact mtn font-controler"><strong className="mtn-contact">Address:</strong><span className="contact-address">60 Knutford Boulevard, Kingston 5 Jamaica, West Indies</span></div>
                        <div className="font-controler"><strong className="mtn-contact">Tele:</strong> (876) 920-4926-30</div>
                        <div className="font-controler"><strong className="mtn-contact">Fax:</strong> (876) 920-4944</div><br></br>
                  <div className="desc">
                    <div className="info">
                      Thank you for visiting our website. If you would you like
                      to share your thoughts with us or have a question, please
                      complete the form below and we will respond as soon as we
                      can.
                    </div>
                    <Formik
                      initialValues={{
                        name: "",
                        email: "",
                        message: ""
                      }}
                      validate={values => {
                        let errors = {};
                        if (!values.email) {
                          errors.email = "Required";
                        } else if (
                          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                            values.email
                          )
                        ) {
                          errors.email = "Invalid email address";
                        }
                        if (!values.name) {
                          errors.name = "Required";
                        }
                        if (!values.message) {
                          errors.message = "Required";
                        }
                        return errors;
                      }}
                      onSubmit={(values, actions) => {
                        actions.resetForm();
                        this.props.contactUsRequest(values);
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
                            <div className="label">
                              <label>Your Name</label>
                            </div>
                            <div className="field-block">
                              <input
                                name="name"
                                value={values.name}
                                type="text"
                                placeholder=""
                                onChange={handleChange}
                              />
                              {errors.name && touched.name && (
                                <label className="error">{errors.name}</label>
                              )}
                            </div>
                          </div>
                          <div className="input-fields">
                            <div className="label">
                              <label>Your Email</label>
                            </div>
                            <div className="field-block">
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
                            <div className="label">
                              <label>Your Message here</label>
                            </div>
                            <div className="field-block">
                              <textarea
                                name="message"
                                value={values.message}
                                type="text"
                                placeholder=""
                                onChange={handleChange}
                              />
                              {errors.message && touched.message && (
                                <label className="error">
                                  {errors.message}
                                </label>
                              )}
                            </div>
                          </div>
                          <div>
                            <button type="submit">
                            {this.props.contactUs.isLoading ? (
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
                        </Form>
                      )}
                    />
                  </div>
                </>
              ) : (
                <div className="contact-notification">
                  {/* <div className="contact-message">
                    Thank you for visiting our site. We hope that the experience
                    was enjoyable. If you’d like to get in touch with us, please
                    complete the form below. Don’t stop now, keep checking for top
                    weekly and monthly events.
                  </div>
                  <div className="contact-social">
                    Follow us on Facebook, Instagram and Twitter
                  </div>
                  <div className="contact-email">
                    {" "}
                    Email - info@topeventsinjamaica.com
                  </div> */}
                  <div className="contact-message">
                    Your request has been submitted.
                    <p>
                      Thanks for reaching out to us. We will review your request
                      and one of our representatives will respond to you in the
                      shortest possible time.
                    </p>
                    <p>The Top Event In Jamaica Team</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Block1>
    );
  }
}
const mapStateToProps = state => ({
  contactUs: state.auth.contactUs
});

const mapDispatchToProps = dispatch => ({
  contactUsRequest: values => dispatch(actions.contactUsRequest(values))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactUs);
