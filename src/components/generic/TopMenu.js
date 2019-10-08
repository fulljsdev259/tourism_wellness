import React, { Component } from "react";
// import more from "../../images/more.svg";
import search from "../../images/icon/search.svg";
import mapMain from "../../images/map-main-color.svg";
import { Link, withRouter } from "react-router-dom";
import "./TopMenu.scss";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import { geolocated } from "react-geolocated";
import Geocode from "react-geocode";
import "./TopMenu.scss";

Geocode.setApiKey("AIzaSyBB7Tc7njRoyjegBDmqAVj09AKWbdRrTCI");

class TopMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_city: "",
      search_state: "",
      state: "",
      city: "",
      ageFlag: false,
      id: "",
      status: true,
      location_status: ""
    };
    this.stateList = React.createRef();
  }
  componentDidUpdate(prevProps, prevState) {
    const { filters } = this.props;
    if (
      this.props.nearest_events_success &&
      this.props.nearest_events_success !== prevProps.nearest_events_success
    ) {
      this.props.stateChange({ showLocationData: true });
    }
    if (this.props.places.data && this.props.categories.data) {

      if (
        this.props.coords &&
        this.props.isGeolocationAvailable &&
        this.props.isGeolocationEnabled &&
        !this.props.positionError &&
        !filters.storableLocation &&
        !this.state.location_status
      ) {
        
        const { latitude, longitude } = this.props.coords;
        // console.log(this.props.storableLocation);
        // this.props.getNearestEventsRequest({ lat: latitude, long: longitude });
        this.setState({ location_status: true });
        let storableLocation = {};
        // Geocode.fromLatLng(`18.0844`, `-76.4100`).then(
          Geocode.fromLatLng(latitude, longitude).then(
          response => {
            const { results } = response;           
            
            for (var ac = 0; ac < results[0].address_components.length; ac++) {
              var component = results[0].address_components[ac];

              switch (component.types[0]) {
                case "locality":
                  storableLocation.city = component.long_name;
                  break;
                case "administrative_area_level_1":
                  storableLocation.state = component.long_name;
                  break;
                case "country":
                  storableLocation.country = component.long_name;
                  storableLocation.registered_country_iso_code =
                    component.short_name;
                  break;
              }
            }
            
            this.props.setStorableLocation(storableLocation);
            const state =this.props.places.data.find(
              state =>
                storableLocation.state &&
                storableLocation.state.toLowerCase() == state.name.toLowerCase()
            );
            if (state) {
              this.props.stateChange(state._id);
              const city = state.cities.find(
                city =>
                  storableLocation.city == city.name
              );
              if (city) {
                this.props.cityChange(city._id);
                
              }
            }
            // else {
            //   this.props.stateChange({ showLocationData: true });
            // }
          },
          error => {
            
            this.props.setStorableLocation(storableLocation);
          }
        );
      }
      else{
        if (this.props.match.path !== "/calendarview") {
          if (
            filters.selectedCity !== prevProps.filters.selectedCity ||
            filters.selectedState !== prevProps.filters.selectedState ||
            filters.ageFlag !== prevProps.filters.ageFlag ||
            !this.state.status
          ) {
            this.setState({ status: true });
            const oneCategory = this.props.categories.data.find(category => {
              return category.name === this.props.match.path.replace("/", "");
            });
            if (oneCategory) {
              if (!this.state.id) {
                this.setState({ id: oneCategory._id });
              }
              this.props.getEventsByCategoryRequest({
                id: oneCategory._id,
                page_number: 1,
                ageFlag: filters.ageFlag,
                eventState: filters.selectedState,
                eventCity: filters.selectedCity
              });
            }
          }
        }
      }

      
      // if (this.props.isGeolocationEnabled) {
      //   if (filters.storableLocation && filters.storableLocation.city) {
      //   }
      // }
    }
    if (
      this.props.showLocationData &&
      this.props.interested_success &&
      this.props.interested_success !== prevProps.interested_success
    ) {
      const { latitude, longitude } = this.props.coords;
      // this.props.getNearestEventsRequest({ lat: latitude, long: longitude });
    }
  }
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { pathname } = this.props.location;
    // const states = [];
    const states = [
      <li key={-1} onClick={() => this.props.stateChange("")}>
        All Locations
      </li>
    ];
    const cities = [];
    const more_cities = [];
    let selected_city;
    if (this.props.places.data) {
      const stateData = this.props.places.data.find(
        state => this.props.filters.selectedState === state._id
      );
      this.props.places.data.map((state, i) => {
        if (
          state.name
            .toLowerCase()
            .includes(this.state.search_state.toLowerCase())
        ) {
          states.push(
            <li
              key={i}
              onClick={e => {
                if (window.innerWidth <= 768) {
                  e.stopPropagation();
                  this.stateList.current.style.display = "none";
                }

                this.props.stateChange(state._id);
                this.setState({ displayState: false });
                // this.refs.stateList1.style.display = "none";
              }}
            >
              {state.name}
            </li>
          );
        }
      });
      if (stateData)
        stateData.cities.map((city, index) => {
          if (this.props.filters.selectedCity === city._id) {
            selected_city = city;
          } else {
            if (index < 5) {
              cities.push(
                <li key={index} onClick={() => this.props.cityChange(city._id)}>
                  {city.name}
                </li>
              );
            } else {
              more_cities.push(city);
            }
          }
        });
    }

    const state_place = () => {
      if (this.props.places.data && this.props.filters.selectedState) {
        const state_info = this.props.places.data.find(
          state => this.props.filters.selectedState === state._id
        ).name;
        return state_info;
      }
      return "All Locations";
    };
    return (
      <div className="">
        <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-sm-10 offset-sm-1 top-menu">
          <div className="menu-links">
            <div className="menu-links-left">
              <img src={mapMain} />
              <span
                className="more-options-btn"
                onClick={() => {
                  this.stateList.current.style.display = "block";
                }}
              >
                <span className="text">
                  {state_place()}
                  {/* {this.props.places.data && this.props.filters.selectedState
                    ? this.props.places.data.find(
                        state => this.props.filters.selectedState === state._id
                      ).name
                    : "All"} */}
                </span>
                <div className="more-options">
                  <ul ref={this.stateList}>
                    <li>
                      <div className="search">
                        <img src={search} />
                        <input
                          name="search_state"
                          type="text"
                          onChange={this.handleInputChange}
                          placeholder="Search State"
                        />
                      </div>
                    </li>
                    {states}
                  </ul>
                </div>
              </span>
              <span>
                <ul className="some-cities">
                  {selected_city && (
                    <li
                      className="active"
                      onClick={() => {
                        if (window.innerWidth <= 767) {
                          this.stateList.current.style.display = "none";
                        }
                      }}
                    >
                      {selected_city.name}
                    </li>
                  )}
                  {cities}
                </ul>
              </span>
              <span className="more-options-btn">
                {more_cities.length ? (
                  <>
                    <span className="text">more ...</span>
                    <div className="more-options">
                      <ul>
                        <li>
                          <div className="search">
                            <img src={search} />
                            <input
                              name="search_city"
                              type="text"
                              onChange={this.handleInputChange}
                              placeholder="Search city"
                            />
                          </div>
                        </li>
                        {more_cities
                          .filter(city =>
                            city.name
                              .toLowerCase()
                              .includes(this.state.search_city.toLowerCase())
                          )
                          .map((city, index) => (
                            <li
                              key={index}
                              onClick={() => {
                                this.props.cityChange(city._id);
                              }}
                            >
                              {city.name}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </>
                ) : null}
              </span>
            </div>
            {/* <div className="menu-links-right">
              <div className="age-section">
                <a
                //   className={this.props.filters.ageFlag ? "active" : null}
                //   onClick={() => this.props.ageFlagChange(true)}
                >
                  <span>Adults only</span>
                  <span className="dot" />
                </a>
                <a
                //   className={!this.props.filters.ageFlag ? "active" : null}
                //   onClick={() => this.props.ageFlagChange(false)}
                >
                  <span>Kids</span>
                  <span className="dot" />
                </a>
              </div>
              <div className="view-section">
                <Link
                  //   className={pathname !== "/calenderview" ? "active" : null}
                  to="/entertainment"
                >
                  <span>List view</span>
                  <span className="dot" />
                </Link>
                <Link
                  //   className={pathname === "/calenderview" ? "active" : null}
                  to="/calenderview"
                >
                  <span>Calender view</span>
                  <span className="dot" />
                </Link>
              </div>
            </div>
          </div> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  places: state.event.locations.data,
  categories: state.event.categories.data,
  //   page_details: state.event.eventsByCategory.data,
  //   events: state.event.eventsByCategory.events,
  page_number: state.event.eventsByCategory.page_number,
  //   successFlag: state.event.eventsByCategory.isSuccess,
  showLocationData: state.event.showLocationData,
  storableLocation: state.event.storableLocation,
  filters: state.event
});

const mapDispatchToProps = dispatch => ({
  getEventsByCategoryRequest: data =>
    dispatch(actions.getEventsByCategoryRequest(data)),
  //   getMonthlyEventsRequest: data =>
  //     dispatch(actions.getMonthlyEventsRequest(data)),
    stateChange: id => dispatch(actions.stateChange(id)),
    cityChange: id => dispatch(actions.cityChange(id)),
    setStorableLocation: value => dispatch(actions.storableLocation(value))
});

export default geolocated()(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(TopMenu)
  )
);

