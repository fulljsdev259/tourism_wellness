import React, { Component } from "react";

export default class Block1 extends Component {
  render() {
    const { children, l_img, r_img } = this.props;
    let classAppend;    
    (window.location.href.indexOf('/auth') > 0) 
    ? classAppend = "in-auth"
    : classAppend = ""

    return (
      <div className="child-selector grid-container">
        <div
          className="grid-item"
          style={{
            backgroundImage: `url(${l_img}), linear-gradient(146deg, rgb(250, 219, 216) 35%, #fff 100%)`
          }}
        >
          {children}
        </div>
        <div className={`grid-item ${classAppend}`} style={{ backgroundImage: `url(${r_img})` }}>
          <div className="fly-text" />
        </div>
      </div>
    );
  }
}
