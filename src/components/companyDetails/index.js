import React, { Component } from "react";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import Loader from "react-loader-spinner";
import subCategory from "../subCategory";
import button1 from "../../images/button.svg";
import button2 from "../../images/button2.svg";
import { Button, Collapse } from "react-bootstrap";
import TimePickerUpdate from "../generic/TimePickerUpdate";
import moment from "moment";

class CompanyDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentDidUpdate(){
    let { userdata } = this.props;  
    if (!this.props.post.data && userdata.data) {
      this.props.getUserPostById(userdata.data._id);
    }
  }
  render() {

    const { data } = this.props && this.props.post;
    const { open } = this.state;
    const { categories } = this.props;
    const companyData =
      data && data.find(m => m._id == this.props.match.params.id); 
           
    return (
      <div className="">
        <div className="row profile-row">
          <div className="col-lg-9 offset-lg-2 col-md-9 offset-md-1 col-sm-9 offset-sm-1 profile-form">
            <div className="profile-title">
              <h3>Company information</h3>
            </div>
            {data && companyData 
              ? 
              (
              <>
                <Formik
                  initialValues={{
                    title: companyData.title,
                    categories:
                      companyData.categories && companyData.categories._id,
                    
                    contentBrief: companyData.content && companyData.content.brief,
                    address: companyData.address,
                    phone_number: companyData.phone_number,
                    facebook_url: companyData.facebook_url,
                    insta_url: companyData.insta_url,
                    fax: companyData.fax,
                    website: companyData.website,
                    monStartTime: companyData.monStartTime ? companyData.monStartTime : `12:00 AM`,
                    monEndTime: companyData.monEndTime ? companyData.monEndTime : ``,
                    tueStartTime: companyData.tueStartTime ? companyData.tueStartTime : `12:00 AM`,
                    tueEndTime: companyData.tueEndTime ? companyData.tueEndTime : ``,
                    wedStartTime: companyData.wedStartTime ? companyData.wedStartTime : `12:00 AM`,
                    wedEndTime: companyData.wedEndTime ? companyData.wedEndTime : ``,
                    thrStartTime: companyData.thrStartTime ? companyData.thrStartTime : `12:00 AM`,
                    thrEndTime: companyData.thrEndTime ? companyData.thrEndTime : ``,
                    friStartTime: companyData.friStartTime ? companyData.friStartTime : `12:00 AM`,
                    friEndTime: companyData.friEndTime ? companyData.friEndTime : ``,
                    satStartTime: companyData.satStartTime ? companyData.satStartTime : `12:00 AM`,
                    satEndTime: companyData.satEndTime ? companyData.satEndTime : ``,
                    sunStartTime: companyData.sunStartTime ? companyData.sunStartTime : `12:00 AM`,
                    sunEndTime: companyData.sunEndTime ? companyData.sunEndTime : ``,
                    openMonday: (companyData.monStartTime && companyData.monEndTime ) ? "true" : "false",
                    openTuesday: (companyData.tueStartTime && companyData.tueEndTime ) ? "true" : "false",
                    openWednesday: (companyData.wedStartTime && companyData.wedEndTime ) ? "true" : "false",
                    openThursday: (companyData.thrStartTime && companyData.thrEndTime ) ? "true" : "false",
                    openFriday: (companyData.friStartTime && companyData.friEndTime ) ? "true" : "false",
                    openSaturday: (companyData.satStartTime && companyData.satEndTime ) ? "true" : "false",
                    openSunday: (companyData.sunStartTime && companyData.sunEndTime ) ? "true" : "false"
                  }}
                  // enableReinitialize
                  validate={values => {
                    let errors = {};
                    if (!values.title) {
                      errors.title = "Required";
                    }
                    if (!values.categories) {
                      errors.categories = "Required";
                    }
                    if (!values.contentBrief) {
                      errors.contentBrief = "Required";
                    }
                    if (!values.address) {
                      errors.address = "Required";
                    }
                    if (!values.phone_number) {
                      errors.phone_number = "Required";
                    }
                    if (!values.facebook_url) {
                      errors.facebook_url = "Required";
                    }
                    if (!values.insta_url) {
                      errors.insta_url = "Required";
                    }
                    if (!values.fax) {
                      errors.fax = "Required";
                    }
                    if (!values.website) {
                      errors.website = "Required";
                    }
                    if (values.monStartTime) {
                      if (!values.monEndTime && values.openMonday == "true") {
                        errors.monEndTime = "Enter Closed Time";
                      } else if (
                        moment(values.monStartTime, "hh:mm a").format(
                          "HH:mm"
                        ) >
                        moment(values.monEndTime, "hh:mm a").format("HH:mm")
                      ) {
                        errors.monEndTime = "invalid Time";
                      }
                    }
                    if (values.tueStartTime) {
                      if (!values.tueEndTime && values.openTuesday == "true") {
                        errors.tueEndTime = "Enter Closed Time";
                      } else if (
                        moment(values.tueStartTime, "hh:mm a").format(
                          "HH:mm"
                        ) >
                        moment(values.tueEndTime, "hh:mm a").format("HH:mm")
                      ) {
                        errors.tueEndTime = "invalid Time";
                      }
                    }
                    if (values.wedStartTime) {
                      if (!values.wedEndTime && values.openWednesday == "true") {
                        errors.wedEndTime = "Enter Closed Time";
                      } else if (
                        moment(values.wedStartTime, "hh:mm a").format(
                          "HH:mm"
                        ) >
                        moment(values.wedEndTime, "hh:mm a").format("HH:mm")
                      ) {
                        errors.wedEndTime = "invalid Time";
                      }
                    }
                    if (values.thrStartTime) {
                      if (!values.thrEndTime && values.openThursday == "true") {
                        errors.thrEndTime = "Enter Closed Time";
                      } else if (
                        moment(values.thrStartTime, "hh:mm a").format(
                          "HH:mm"
                        ) >
                        moment(values.thrEndTime, "hh:mm a").format("HH:mm")
                      ) {
                        errors.thrEndTime = "invalid Time";
                      }
                    }
                    if (values.friStartTime) {
                      if (!values.friEndTime && values.openFriday == "true") {
                        errors.friEndTime = "Enter Closed Time";
                      } else if (
                        moment(values.friStartTime, "hh:mm a").format(
                          "HH:mm"
                        ) >
                        moment(values.friEndTime, "hh:mm a").format("HH:mm")
                      ) {
                        errors.friEndTime = "invalid Time";
                      }
                    }
                    if (values.satStartTime) {
                      if (!values.satEndTime && values.openSaturday == "true") {
                        errors.satEndTime = "Enter Closed Time";
                      } else if (
                        moment(values.satStartTime, "hh:mm a").format(
                          "HH:mm"
                        ) >
                        moment(values.satEndTime, "hh:mm a").format("HH:mm")
                      ) {
                        errors.satEndTime = "invalid Time";
                      }
                    }
                    if (values.sunStartTime) {
                      if (!values.sunEndTime && values.openSunday == "true") {
                        errors.sunEndTime = "Enter Closed Time";
                      } else if (
                        moment(values.sunStartTime, "hh:mm a").format(
                          "HH:mm"
                        ) >
                        moment(values.sunEndTime, "hh:mm a").format("HH:mm")
                      ) {
                        errors.sunEndTime = "invalid Time";
                      }
                    }
                    return errors;
                  }}
                  onSubmit={(values, actions) => {                    
                    let form_Data = new FormData();
                    for ( let key in values ) {
                      form_Data.append(key, values[key]);
                    }                  

                    this.props.updateEvent({
                      id: companyData._id,
                      data: form_Data,
                      user_id: this.props.userdata.data._id
                    });
                  }}
                  render={({
                    values,
                    errors,
                    status,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    setFieldValue,
                    ...props
                  }) => {
                    if (this.props.updateEvent.isSuccess) {
                      props.resetForm();
                      this.props.submitEventReset();
                    }
                    
                    return (
                      <Form>
                        <div className="input-fields-section">
                          <label className="label">Company Name</label>
                          <input
                            value={values.title}
                            className="input-field"
                            placeholder=""
                            name="title"
                            onChange={handleChange}
                            type="text"
                          />
                          {errors.title && touched.title && (
                            <label className="error">{errors.title}</label>
                          )}
                        </div>
                        <div className="input-fields-section">
                          <label className="label">Description</label>
                          <input
                            value={values.contentBrief}
                            className="input-field"
                            name="contentBrief"
                            placeholder=""
                            onChange={handleChange}
                            type="text"
                          />
                          {errors.contentBrief && touched.contentBrief && (
                            <label className="error">
                              {errors.contentBrief}
                            </label>
                          )}
                        </div>

                        <div className="input-fields-section">
                          <label className="label">Image</label>
                          <div className="companyImageDiv">
                            <img src={companyData.image && companyData.image.secure_url}/>
                          </div>
                          <label className="label">Change Image</label>
                          <input
                            // value={values.companyImage}
                            // className="input-field"
                            onChange={(event) => {
                              setFieldValue("image", event.currentTarget.files[0]);
                              }
                            }
                            name="image"
                            placeholder=""
                            // onChange={handleChange}
                            type="File"
                          />
                          {errors.companyImage && touched.companyImage && (
                            <label className="error">
                              {errors.companyImage}
                            </label>
                          )}
                        </div>   

                        <div className="input-fields-section">
                          {/* <label className="label">Category</label> */}
                          {/* <input
                          value={values.category}
                          className="input-field"
                          name="category"
                          placeholder=""
                          onChange={handleChange}
                          type="text"
                        />

                           <select
                              name="category"
                              value={values.category}
                              type="text"
                              placeholder=""
                              onChange={handleChange}
                              id="category"
                            >
                              <option value="">Select category</option>
                              {categories && categories.data
                                ? categories.data.map((category, i) => (
                                  <option key={i} value={category._id}>
                                    {category.name.replace("_", " & ")}
                                  </option>
                                ))
                                : null}
                            </select>
                        {errors.category && touched.category && (
                          <label className="error">{errors.category}</label>
                        )}
                      </div>
                      <div className="input-fields-section">
                        <label className="label">SubCategory</label>
                        <input
                          value={values.subCategory}
                          className="input-field"
                          name="subCategory"
                          placeholder=""
                          onChange={handleChange}
                          type="text"
                        />
                        {errors.subCategory && touched.subCategory && (
                          <label className="error">{errors.subCategory}</label>
                        )}
                      </div> */}

                          {categories && categories.data ? (
                            <>
                              <div className="input-fields">
                                <label>Category</label>
                                <div>
                                  <select
                                    name="categories"
                                    value={values.categories}
                                    placeholder=""
                                    onChange={handleChange}
                                    id="categories"
                                  >
                                    <option value="">Select category</option>
                                    {categories.data
                                      .sort((a, b) =>
                                        a.name.localeCompare(b.name)
                                      )
                                      .map((data, i) => (
                                        <option key={i} value={data._id}>
                                          {data.name}
                                        </option>
                                      ))}
                                  </select>
                                  {errors.categories && touched.categories && (
                                    <label className="error">
                                      {errors.categories}
                                    </label>
                                  )}
                                </div>
                              </div>{" "}
                              
                            </>
                          ) : null}
                        </div>

                        <div className="input-fields-section">
                          <label className="label">Phone Number</label>
                          <input
                            value={values.phone_number}
                            className="input-field"
                            name="phone_number"
                            placeholder=""
                            onChange={handleChange}
                            type="text"
                          />
                          {errors.phone_number && touched.phone_number && (
                            <label className="error">
                              {errors.phone_number}
                            </label>
                          )}
                        </div>
                        <div className="input-fields-section">
                          <label className="label">Address</label>
                          <input
                            value={values.address}
                            className="input-field"
                            name="address"
                            placeholder=""
                            onChange={handleChange}
                            type="text"
                          />
                          {errors.address && touched.address && (
                            <label className="error">{errors.address}</label>
                          )}
                        </div>
                        <div className="input-fields-section">
                          <label className="label">Website</label>
                          <input
                            value={values.website}
                            className="input-field"
                            name="website"
                            placeholder=""
                            onChange={handleChange}
                            type="text"
                          />
                          {errors.website && touched.website && (
                            <label className="error">{errors.website}</label>
                          )}
                        </div>
                        <div className="input-fields-section">
                          <label className="label">Facebook URL</label>
                          <input
                            value={values.facebook_url}
                            className="input-field"
                            name="facebook_url"
                            placeholder=""
                            onChange={handleChange}
                            type="text"
                          />
                          {errors.facebook_url && touched.facebook_url && (
                            <label className="error">
                              {errors.facebook_url}
                            </label>
                          )}
                        </div>
                        <div className="input-fields-section">
                          <label className="label">Instagram</label>
                          <input
                            value={values.insta_url}
                            className="input-field"
                            name="insta_url"
                            placeholder=""
                            onChange={handleChange}
                            type="text"
                          />
                          {errors.insta_url && touched.insta_url && (
                            <label className="error">{errors.insta_url}</label>
                          )}
                        </div>
                        <div className="input-fields-section">
                          <label className="label">Fax</label>
                          <input
                            value={values.fax}
                            className="input-field"
                            name="fax"
                            placeholder=""
                            onChange={handleChange}
                            type="text"
                          />
                          {errors.fax && touched.fax && (
                            <label className="error">{errors.fax}</label>
                          )}
                        </div>
                        <Button
                          onClick={() => this.setState({ open: !open })}
                          aria-controls="example-collapse-text"
                          aria-expanded={open}
                          style={{
                            border: "unset",
                            background: "unset",
                            color: "#212529",
                            margin: "10px 0px 30px",
                            paddingLeft: "0px",
                            fontSize: "x-large",
                            fontWeight: "900"
                          }}
                        >
                          <img src={button1} />
                          <a> Edit open Hours</a>
                        </Button>
                        <Collapse in={open}>
                          <div id="example-collapse-text">
                            <div className="weekdayOpen">
                              <div className="input-fields">
                                <label>Monday</label>
                                <div>
                                  <select
                                    name="openMonday"
                                    value={values.openMonday}
                                    placeholder=""
                                    onChange={handleChange}
                                    id="openMonday"
                                  >
                                    <option value={true}>Opened</option>
                                    <option value={false}>Closed</option>
                                  </select>
                                </div>
                              </div>
                              {JSON.parse(values.openMonday) && (
                                <div className="weekdayOpenDiv">
                                  <div className="input-fields">
                                    <label>Open Time</label>
                                    <div>
                                      <TimePickerUpdate
                                        name="monStartTime"
                                        id="monStartTime"
                                        value={values.monStartTime}
                                        onChange={handleChange}
                                      />

                                      {errors.monStartTime &&
                                        touched.monStartTime && (
                                          <label
                                            className="error"
                                            style={{
                                              padding: "8px 5px 8px 5px",
                                              color: "red"
                                            }}
                                          >
                                            {errors.monStartTime}
                                          </label>
                                        )}
                                    </div>
                                  </div>
                                  <div className="input-fields">
                                    <label>Close Time</label>
                                    <div>
                                      <TimePickerUpdate
                                        name="monEndTime"
                                        id="monEndTime"
                                        value={values.monEndTime}
                                        onChange={handleChange}
                                      />

                                      {errors.monEndTime && touched.monEndTime && (
                                        <label
                                          className="error"
                                          style={{
                                            padding: "8px 5px 8px 5px",
                                            color: "red"
                                          }}
                                        >
                                          {errors.monEndTime}
                                        </label>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="weekdayOpen">
                              <div className="input-fields">
                                <label>Tuesday</label>
                                <div>
                                  <select
                                    name="openTuesday"
                                    value={values.openTuesday}
                                    placeholder=""
                                    onChange={handleChange}
                                    id="openTuesday"
                                  >
                                    <option value={true}>Opened</option>
                                    <option value={false}>Closed</option>
                                  </select>
                                </div>
                              </div>
                              {JSON.parse(values.openTuesday) && (
                                <div className="weekdayOpenDiv">
                                  <div className="input-fields">
                                    <label>Open Time</label>
                                    <div>
                                      <TimePickerUpdate
                                        name="tueStartTime"
                                        id="tueStartTime"
                                        value={values.tueStartTime}
                                        onChange={handleChange}
                                      />

                                      {errors.tueStartTime &&
                                        touched.tueStartTime && (
                                          <label
                                            className="error"
                                            style={{
                                              padding: "8px 5px 8px 5px",
                                              color: "red"
                                            }}
                                          >
                                            {errors.tueStartTime}
                                          </label>
                                        )}
                                    </div>
                                  </div>
                                  <div className="input-fields">
                                    <label>Close Time</label>
                                    <div>
                                      <TimePickerUpdate
                                        name="tueEndTime"
                                        id="tueEndTime"
                                        value={values.tueEndTime}
                                        onChange={handleChange}
                                      />

                                      {errors.tueEndTime && touched.tueEndTime && (
                                        <label
                                          className="error"
                                          style={{
                                            padding: "8px 5px 8px 5px",
                                            color: "red"
                                          }}
                                        >
                                          {errors.tueEndTime}
                                        </label>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="weekdayOpen">
                              <div className="input-fields">
                                <label>Wednesday</label>
                                <div>
                                  <select
                                    name="openWednesday"
                                    value={values.openWednesday}
                                    placeholder=""
                                    onChange={handleChange}
                                    id="openWednesday"
                                  >
                                    <option value={true}>Opened</option>
                                    <option value={false}>Closed</option>
                                  </select>
                                </div>
                              </div>
                              {JSON.parse(values.openWednesday) && (
                                <div className="weekdayOpenDiv">
                                  <div className="input-fields">
                                    <label>Open Time</label>
                                    <div>
                                      <TimePickerUpdate
                                        name="wedStartTime"
                                        id="wedStartTime"
                                        value={values.wedStartTime}
                                        onChange={handleChange}
                                      />

                                      {errors.wedStartTime &&
                                        touched.wedStartTime && (
                                          <label
                                            className="error"
                                            style={{
                                              padding: "8px 5px 8px 5px",
                                              color: "red"
                                            }}
                                          >
                                            {errors.wedStartTime}
                                          </label>
                                        )}
                                    </div>
                                  </div>
                                  <div className="input-fields">
                                    <label>Close Time</label>
                                    <div>
                                      <TimePickerUpdate
                                        name="wedEndTime"
                                        id="wedEndTime"
                                        value={values.wedEndTime}
                                        onChange={handleChange}
                                      />

                                      {errors.wedEndTime && touched.wedEndTime && (
                                        <label
                                          className="error"
                                          style={{
                                            padding: "8px 5px 8px 5px",
                                            color: "red"
                                          }}
                                        >
                                          {errors.wedEndTime}
                                        </label>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="weekdayOpen">
                              <div className="input-fields">
                                <label>Thursday</label>
                                <div>
                                  <select
                                    name="openThursday"
                                    value={values.openThursday}
                                    placeholder=""
                                    onChange={handleChange}
                                    id="openThursday"
                                  >
                                    <option value={true}>Opened</option>
                                    <option value={false}>Closed</option>
                                  </select>
                                </div>
                              </div>
                              {JSON.parse(values.openThursday) && (
                                <div className="weekdayOpenDiv">
                                  <div className="input-fields">
                                    <label>Open Time</label>
                                    <div>
                                      <TimePickerUpdate
                                        name="thrStartTime"
                                        id="thrStartTime"
                                        value={values.thrStartTime}
                                        onChange={handleChange}
                                      />

                                      {errors.thrStartTime &&
                                        touched.thrStartTime && (
                                          <label
                                            className="error"
                                            style={{
                                              padding: "8px 5px 8px 5px",
                                              color: "red"
                                            }}
                                          >
                                            {errors.thrStartTime}
                                          </label>
                                        )}
                                    </div>
                                  </div>
                                  <div className="input-fields">
                                    <label>Close Time</label>
                                    <div>
                                      <TimePickerUpdate
                                        name="thrEndTime"
                                        id="thrEndTime"
                                        value={values.thrEndTime}
                                        onChange={handleChange}
                                      />

                                      {errors.thrEndTime && touched.thrEndTime && (
                                        <label
                                          className="error"
                                          style={{
                                            padding: "8px 5px 8px 5px",
                                            color: "red"
                                          }}
                                        >
                                          {errors.thrEndTime}
                                        </label>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="weekdayOpen">
                              <div className="input-fields">
                                <label>Friday</label>
                                <div>
                                  <select
                                    name="openFriday"
                                    value={values.openFriday}
                                    placeholder=""
                                    onChange={handleChange}
                                    id="openFriday"
                                  >
                                    <option value={true}>Opened</option>
                                    <option value={false}>Closed</option>
                                  </select>
                                </div>
                              </div>
                              {JSON.parse(values.openFriday) && (
                                <div className="weekdayOpenDiv">
                                  <div className="input-fields">
                                    <label>Open Time</label>
                                    <div>
                                      <TimePickerUpdate
                                        name="friStartTime"
                                        id="friStartTime"
                                        value={values.friStartTime}
                                        onChange={handleChange}
                                      />

                                      {errors.friStartTime &&
                                        touched.friStartTime && (
                                          <label
                                            className="error"
                                            style={{
                                              padding: "8px 5px 8px 5px",
                                              color: "red"
                                            }}
                                          >
                                            {errors.friStartTime}
                                          </label>
                                        )}
                                    </div>
                                  </div>
                                  <div className="input-fields">
                                    <label>Close Time</label>
                                    <div>
                                      <TimePickerUpdate
                                        name="friEndTime"
                                        id="friEndTime"
                                        value={values.friEndTime}
                                        onChange={handleChange}
                                      />

                                      {errors.friEndTime && touched.friEndTime && (
                                        <label
                                          className="error"
                                          style={{
                                            padding: "8px 5px 8px 5px",
                                            color: "red"
                                          }}
                                        >
                                          {errors.friEndTime}
                                        </label>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="weekdayOpen">
                              <div className="input-fields">
                                <label>Saturday</label>
                                <div>
                                  <select
                                    name="openSaturday"
                                    value={values.openSaturday}
                                    placeholder=""
                                    onChange={handleChange}
                                    id="openSaturday"
                                  >
                                    <option value={true}>Opened</option>
                                    <option value={false}>Closed</option>
                                  </select>
                                </div>
                              </div>
                              {JSON.parse(values.openSaturday)&& (
                                <div className="weekdayOpenDiv">
                                  <div className="input-fields">
                                    <label>Open Time</label>
                                    <div>
                                      <TimePickerUpdate
                                        name="satStartTime"
                                        id="satStartTime"
                                        value={values.satStartTime}
                                        onChange={handleChange}
                                      />

                                      {errors.satStartTime &&
                                        touched.satStartTime && (
                                          <label
                                            className="error"
                                            style={{
                                              padding: "8px 5px 8px 5px",
                                              color: "red"
                                            }}
                                          >
                                            {errors.satStartTime}
                                          </label>
                                        )}
                                    </div>
                                  </div>
                                  <div className="input-fields">
                                    <label>Close Time</label>
                                    <div>
                                      <TimePickerUpdate
                                        name="satEndTime"
                                        id="satEndTime"
                                        value={values.satEndTime}
                                        onChange={handleChange}
                                      />

                                      {errors.satEndTime && touched.satEndTime && (
                                        <label
                                          className="error"
                                          style={{
                                            padding: "8px 5px 8px 5px",
                                            color: "red"
                                          }}
                                        >
                                          {errors.satEndTime}
                                        </label>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="weekdayOpen">
                              <div className="input-fields">
                                <label>Sunday</label>
                                <div>
                                  <select
                                    name="openSunday"
                                    value={values.openSunday}
                                    placeholder=""
                                    onChange={handleChange}
                                    id="openSunday"
                                  >
                                    <option value={true}>Opened</option>
                                    <option value={false}>Closed</option>
                                  </select>
                                </div>
                              </div>
                              {JSON.parse(values.openSunday) && (
                                <div className="weekdayOpenDiv">
                                  <div className="input-fields">
                                    <label>Open Time</label>
                                    <div>
                                      <TimePickerUpdate
                                        name="sunStartTime"
                                        id="sunStartTime"
                                        value={values.sunStartTime}
                                        onChange={handleChange}
                                      />

                                      {errors.sunStartTime &&
                                        touched.sunStartTime && (
                                          <label
                                            className="error"
                                            style={{
                                              padding: "8px 5px 8px 5px",
                                              color: "red"
                                            }}
                                          >
                                            {errors.sunStartTime}
                                          </label>
                                        )}
                                    </div>
                                  </div>
                                  <div className="input-fields">
                                    <label>Close Time</label>
                                    <div>
                                      <TimePickerUpdate
                                        name="sunEndTime"
                                        id="sunEndTime"
                                        value={values.sunEndTime}
                                        onChange={handleChange}
                                      />

                                      {errors.sunEndTime && touched.sunEndTime && (
                                        <label
                                          className="error"
                                          style={{
                                            padding: "8px 5px 8px 5px",
                                            color: "red"
                                          }}
                                        >
                                          {errors.sunEndTime}
                                        </label>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </Collapse>
                        <div className="save-changes">
                          <button type="submit" className="save-btn">
                            Update Company Info
                          </button>
                        </div>
                      </Form>
                    );
                  }}
                />
              </>
            )
            :
            <div className="company-loader-div text-center" >
                <Loader type="Oval" color="#22b5fb" height="40" width="40" />
            </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userdata: state.auth.userdata.data,
  categories: state.event.categories.data,
  post: state.event.postById.data,
  updateEvent: state.event.updateEvent
});

const mapDispatchToProps = dispatch => ({
  updateEvent: data => dispatch(actions.updateEventRequest(data)),
  getUserPostById: data => dispatch(actions.getUserPostByIdRequest(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyDetails);
