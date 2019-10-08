import React from "react";
import "./index.scss";
import TimePicker from "../generic/TimePicker";

export const renderField = ({
  input,
  label,
  placeholder,
  type,
  meta: { touched, error }
}) => (
  <div className="renderField">
    <label>{label}</label>
    <div>
      <input
        {...input}
        placeholder={placeholder}
        type={type}
        className="input"
      />
    </div>
    <div>
      {touched && error && (
        <span>
          <sup>*</sup>
          {error}
        </span>
      )}
    </div>
  </div>
);
export const renderTextarea = ({
  input,
  label,
  placeholder,
  type,
  meta: { touched, error }
}) => (
  <div className="renderField">
    <label>{label}</label>
    <div>
      <textarea
        style={{ height: 100, width: "100%" }}
        {...input}
        placeholder={placeholder}
        type={type}
        className="textArea"
      />
      {touched && error && (
        <span>
          <sup>*</sup>
          {error}
        </span>
      )}
    </div>
  </div>
);

export const renderSelect = ({
  input,
  label,
  type,
  data,
  meta: { touched, error }
}) => (
  <div className="renderSelect">
    <label>{label}</label>
    <select {...input} defaultValue="" className="custom-select">
    <option >select option</option>
      {data.map((d, i) => {
        return (
          <option key={i} value={d._id}>
            {d.name}
          </option>
        );
      })}
    </select>

    <div>
      {touched && error && (
        <span>
          <sup>*</sup>
          {error}
        </span>
      )}
    </div>
  </div>
);

export const renderTimeSelect = ({
  input,
  label,
  type,
  data,
  meta: { touched, error }
}) => (
  <div className="renderSelectTime">
    <label>{label}</label>
    {/* <select  defaultValue="" className="custom-select"> */}
      {/* {data.map((d, i) => { */}
         <TimePicker value="12:00 AM" {...input} />
      {/* })} */}
    {/* </select> */}

    <div className="time-error">
      {touched && error && (
        <span>
          <sup>*</sup>
          {error}
        </span>
      )}
    </div>
  </div>
);

export const renderTag = ({ input, label, type, meta: { touched, error } }) => {
  const children = [];
  // for ( let i = 10; i < 36; i++ ) {
  //     children.push( <Option key={ i.toString( 36 ) + i }>{ i.toString( 36 ) + i }</Option> );
  // }

  return (
    <div className="renderSelect">
      <label>{label}</label>
      <div style={{ display: "flex", marginTop: 10 }}>
        <select
          mode="tags"
          style={{ width: "100%" }}
          placeholder="Please select"
          // defaultValue={ [] }
          //onChange={ () => console.log() }
          {...input}
        >
          {children}
        </select>
        <div>
          {touched && error && (
            <span>
              <sup>*</sup>
              {error}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
