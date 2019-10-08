import React, { Component } from "react";
import Description from "../generic/Description";
import TopMenu from "../generic/TopMenu";
import EventItem from "../generic/EventItem";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./events.scss";
import * as actions from "../../redux/actions";

import web from "../../images/web.png";
import time from "../../images/time.png";
import mapMain from "../../images/map-main-color.svg";
import heart from "../../images/heart.svg";
import heart_full from "../../images/heart-full.svg";
import wallet from "../../images/cost.png";
import moment from "moment";
import { sharePost, addInterestRequest } from "../../redux/actions";
import { localStore } from "../../services/storage";
import bg from "../../images/veg.jpg";

class Events extends Component {
  render() {
    return (
      <div>
        <Description
          name="Events"
          desc="Vestibulum rutrum quam vitae fringilla tincidunt. Suspendisse nec tortor urna. Ut laoreet sodales nisi, quis iaculis nulla iaculis vitae. Donec sagittis faucibus lacus eget blandit. Ut laoreet sodales nisi, quis iaculis nulla iaculis vitae."
        />
        <TopMenu />
        <div className="event-div">
          <div className="events-list">
            <div
              className={
                "col-lg-3 col-md-4 col-sm-4 col-xs-12 col-sm-offset-1 col-md-offset-1 offset-2 event-img"
              }
            >
              <div
                className="img"
                style={{
                  backgroundImage: `url(${bg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              />
            </div>
            <div className={"col-lg-5 col-md-6 col-sm-6 event-detail"}>
              <div className="head">
                <div>
                  <div className="title">Kushite's Vegetable Cuisine</div>
                  <div className="mobile-social">
                    <img
                      className="wishlist"
                      src={heart_full}
                      title={
                        localStore("token") ? null : "Login first if interested"
                      }
                    />
                    {/* <img className="share" src={share} /> */}
                  </div>
                </div>
                {/* <EventDate start={event.start} end={event.end} /> */}
                <div className="date">7th March, Friday</div>
              </div>
              <div className="middle">
                <div>
                  <span className="span">
                    <img className="icon" src={mapMain} />{" "}
                    {/* {event.EventPlace ? event.EventPlace : "Not Decided"} */}
                    350 Seaview Garden, Kingston
                  </span>
                  <span className="span">
                    <img className="icon" src={wallet} /> from $45
                  </span>
                </div>
                <div>
                  <a className="span web-color" target="_BLANK">
                    <img className="icon" src={web} /> {"www.website.com"}
                  </a>
                  <span className="span">
                    <img className="icon" src={time} /> 19:00-22:00
                  </span>
                </div>
              </div>
              <div className="bottom" style={{ height: "auto" }}>
                <div style={{ padding: "10px 25px", color: "gray" }}>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  //   categories: state.event.categories.data,
  //   page_details: state.event.eventsByCategory.data,

  events: state.event.eventsByCategory.events,
  page_number: state.event.eventsByCategory.page_number,
  successFlag: state.event.eventsByCategory.isSuccess,
  //   searchedEvents: state.event.searchedEvents.data,
  //   searchFocused: state.event.searchedEvents.isFieldFocused,
  filters: state.event
});

const mapDispatchToProps = dispatch => ({
  getEventsByCategoryRequest: data =>
    dispatch(actions.getEventsByCategoryRequest(data))
  // searchBlured: () => dispatch(actions.searchBlur()),
  // clearList: () => dispatch(actions.clearListOnUnmount())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Events)
);
