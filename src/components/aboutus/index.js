import React, { Component } from "react";
import Block1 from "../generic/Block1";
import l_img from "../../images/l_img.png";
import about_us_bg from "../../images/about-us-bg.png";
import { Formik, Form } from "formik";
import "./aboutus.scss";

export default class AboutUs extends Component {
  render() {
    return (
      <Block1 l_img={l_img} r_img={about_us_bg}>
        <div className="container-fluid">
          <div className="row  about-block">
            <div className="col-lg-6 offset-lg-4 col-md-6 offset-md-4 col-sm-10 col-sm-offset-1 about-div">
              <div className="title">About Us</div>
              <div className="desc">
                <div className="info">
                  <h6>THE TOURISM LINKAGES NETWORK</h6>
                  <p>
                    In keeping with the goals of the Tourism Master Plan and the
                    Vision 2030 National Development Plan; the Ministry of
                    Tourism has targeted the development and strengthening of
                    sustainable linkages between Tourism and other productive
                    sectors of the economy to which it is closely linked such as
                    Agriculture, Manufacturing, and Entertainment. The mission
                    of this initiative is to position the tourism sector to
                    increase its consumption of goods and services that can be
                    competitively sourced in Jamaica. In this regard, the
                    Tourism Linkages Network was approved and established by
                    Cabinet decision in June 2013.
                  </p>
                  <p>
                    The Ministry of Tourism has expanded the Linkages Programme
                    through greater emphasis on experiential tourism by driving
                    the passion points of today’s tourists, specifically through
                    the build-out of five (5) networks. These networks are:
                  </p>
                  <p>
                    <ul>
                      <li>Gastronomy Network</li>
                      <li>Health & Wellness Network</li>
                      <li>Sports and Entertainment Network</li>
                      <li>Shopping Network</li>
                      <li>Knowledge Network</li>
                    </ul>
                  </p>
                  <p>
                    The Tourism Linkages Network is now a division of the
                    Tourism Enhancement Fund (TEF).
                  </p>
                  <h6>THE HEALTH AND WELLNESS NETWORK</h6>
                  <p>
                    The Tourism Linkages Health and Wellness Network recognizes
                    that as the health and wellness tourism industry develops it
                    will prove to be an integral part of Jamaica’s tourism
                    ecosystem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Block1>
    );
  }
}
