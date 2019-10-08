import React from "react";
import { Field, reduxForm, FieldArray, formValueSelector } from "redux-form";
import validate from "./validate";
import {
  renderField,
  renderSelect,
  renderTextarea,
  renderTimeSelect,
  renderTag
} from "./renderField";
import "./index.scss";
import checkMark from "../../images/icon/checkmark-green.svg";
import { connect } from "react-redux";
import { Button, Collapse } from "react-bootstrap";
import button1 from "../../images/button.svg";
import button2 from "../../images/button2.svg";

const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

const adaptFileEventToValueMulti = delegate => e => delegate(e.target.files);

const FileInput = ({
  input: { value: omitValue, multiple, onChange, onBlur, ...inputProps },
  meta: omitMeta,
  ...props
}) => {
  return (
    <input
      onChange={adaptFileEventToValue(onChange)}
      onBlur={adaptFileEventToValue(onBlur)}
      type="file"
      {...props.input}
      {...props}
    />
  );
};

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <span>{error}</span> : false;
const WizardFormSecondPage = props => {
  let {
    handleSubmit,
    previousPage,
    categories,
    open,
    // selectedCategory,
    open_monday,
    open_tuesday,
    open_wednesday,
    open_thursday,
    open_friday,
    open_saturday,
    open_sunday,
    handleClick
  } = props;  
  
  const arr = [{ name: "Yes", _id: true }, { name: "No", _id: false }];
  return (
    <div>
      <div className="inActiveHeader">
        <div className="number">1</div>
        <div className="subHeading">General information</div>
        <img src={checkMark} />
      </div>
      <div className="form">
        <div className="form-1">
          <div className="form-header">
            <div className="number">2</div>
            <div className="subHeading">About your company</div>
          </div>
          <form onSubmit={handleSubmit}>
            <Field
              name="categories"
              className="custom-select"
              type="select"
              data={categories ? categories.data : []}
              component={renderSelect}
              label="Select Category"
            />
            {/* {selectedCategory && categories.data && (
              <Field
                name="subcategories"
                type="select"
                data={
                  categories.data && categories.data.find(item => selectedCategory === item._id)
                    .subCategory
                }
                component={renderSelect}
                label="Select Sub-Category"
              />
            )} */}
            {/*<Field name="typeOfCompany" type="text" component={ renderField } label="Type of your company" />*/}
            <Field
              name="contentBrief"
              type="textarea"
              component={renderTextarea}
              label="Describe your company"
            />
            <Button
              onClick={() => handleClick()}
              aria-controls="example-collapse-text"
              aria-expanded={open}
              style={{
                border: "unset",
                background: "unset",
                color: "#212529"
              }}
            >
              <img src={button1} />
              <a> Add open Hours</a>
            </Button>
            <Collapse in={open}>
              <div id="example-collapse-text " style={{ marginTop: "30px" }}>
                <div className="weekdayDiv">
                  <h4>Monday</h4>
                  <Field
                    name="mondayOpen"
                    className="custom-select"
                    type="select"
                    data={arr}
                    component={renderSelect}
                    label="Open"
                  />
                  {open_monday == "true" && (
                    <div className="openDiv">
                      <Field
                        name="monStartTime"
                        type="select"
                        component={renderTimeSelect}
                        label="Open Time"
                      />
                      <Field
                        name="monEndTime"
                        type="select"
                        component={renderTimeSelect}
                        label="Closed Time"
                      />
                    </div>
                  )}
                </div>
                <div className="weekdayDiv">
                  <h4>Tuesday</h4>
                  <Field
                    name="tuesdayOpen"
                    className="custom-select"
                    type="select"
                    data={arr}
                    component={renderSelect}
                    label="Open"
                  />
                  {open_tuesday == "true" && (
                    <div className="openDiv">
                      <Field
                        name="tueStartTime"
                        type="select"
                        component={renderTimeSelect}
                        label="Open Time"
                      />
                      <Field
                        name="tueEndTime"
                        type="select"
                        component={renderTimeSelect}
                        label="Closed Time"
                      />
                    </div>
                  )}
                </div>
                <div className="weekdayDiv">
                  <h4>Wednesday</h4>
                  <Field
                    name="wednesdayOpen"
                    className="custom-select"
                    type="select"
                    data={arr}
                    component={renderSelect}
                    label="Open"
                  />
                  {open_wednesday == "true" && (
                    <div className="openDiv">
                      <Field
                        name="wedStartTime"
                        type="select"
                        component={renderTimeSelect}
                        label="Open Time"
                      />
                      <Field
                        name="wedEndTime"
                        type="select"
                        component={renderTimeSelect}
                        label="Closed Time"
                      />
                    </div>
                  )}
                </div>
                <div className="weekdayDiv">
                  <h4>Thursday</h4>
                  <Field
                    name="thursdayOpen"
                    className="custom-select"
                    type="select"
                    data={arr}
                    component={renderSelect}
                    label="Open"
                  />
                  {open_thursday == "true" && (
                    <div className="openDiv">
                      <Field
                        name="thrStartTime"
                        type="select"
                        component={renderTimeSelect}
                        label="Open Time"
                      />
                      <Field
                        name="thrEndTime"
                        type="select"
                        component={renderTimeSelect}
                        label="Closed Time"
                      />
                    </div>
                  )}
                </div>
                <div className="weekdayDiv">
                  <h4>Friday</h4>
                  <Field
                    name="fridayOpen"
                    className="custom-select"
                    type="select"
                    data={arr}
                    component={renderSelect}
                    label="Open"
                  />
                  {open_friday == "true" && (
                    <div className="openDiv">
                      <Field
                        name="friStartTime"
                        type="select"
                        component={renderTimeSelect}
                        label="Open Time"
                      />
                      <Field
                        name="friEndTime"
                        type="select"
                        component={renderTimeSelect}
                        label="Closed Time"
                      />
                    </div>
                  )}
                </div>
                <div className="weekdayDiv">
                  <h4>Saturday</h4>
                  <Field
                    name="saturdayOpen"
                    className="custom-select"
                    type="select"
                    data={arr}
                    component={renderSelect}
                    label="Open"
                  />
                  {open_saturday == "true" && (
                    <div className="openDiv">
                      <Field
                        name="satStartTime"
                        type="select"
                        component={renderTimeSelect}
                        label="Open Time"
                      />
                      <Field
                        name="satEndTime"
                        type="select"
                        component={renderTimeSelect}
                        label="Closed Time"
                      />
                    </div>
                  )}
                </div>
                <div className="weekdayDiv">
                  <h4>Sunday</h4>
                  <Field
                    name="sundayOpen"
                    className="custom-select"
                    type="select"
                    data={arr}
                    component={renderSelect}
                    label="Open"
                  />
                  {open_sunday == "true" && (
                    <div className="openDiv">
                      <Field
                        name="sunStartTime"
                        type="select"
                        component={renderTimeSelect}
                        label="Open Time"
                      />
                      <Field
                        name="sunEndTime"
                        type="select"
                        component={renderTimeSelect}
                        label="Closed Time"
                      />
                    </div>
                  )}
                </div>
              </div>
            </Collapse>
            
            <div className="input-fields">
              <br/>
              <label>Upload Company Image</label>
              <br/>
              <div className="addImage">      
                <input
                  type="file"
                  name="image"
                  onChange={e => {
                    props.change('image', e.target.files[0])                   
                  }}
                    
                />
               
                {/* </Field> */}
              </div>
            </div>

            {/* <Field name="tags" type="text" component={renderTag} label="Tags" /> */}
            {/* <FieldArray name="photo" component={renderMembers} /> */}
            {/*  <Field name="photo" type="file" component={ FileInput } label="Tags" />*/}

            <div>
            <button onClick={previousPage} type="button" className="nextsignup backbutton">
                BACK
              </button>
              <button type="submit" className="nextsignup">
                CONTINUE
              </button>
            </div>
          </form>
        </div>

        {/* <div className="header">
                    <div className="number">3</div>
                    <div className="subHeading">Contact information</div>
                </div> */}
      </div>
    </div>
  );
};
const selector = formValueSelector("wizard");

const mapStateToProps = state => {
  return {
    // selectedCategory: selector(state, "categories"),
    open_monday: selector(state, "mondayOpen"),
    open_tuesday: selector(state, "tuesdayOpen"),
    open_wednesday: selector(state, "wednesdayOpen"),
    open_thursday: selector(state, "thursdayOpen"),
    open_friday: selector(state, "fridayOpen"),
    open_saturday: selector(state, "saturdayOpen"),
    open_sunday: selector(state, "sundayOpen")
  };
};

export default reduxForm({
  form: "wizard", //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(connect(mapStateToProps)(WizardFormSecondPage));
