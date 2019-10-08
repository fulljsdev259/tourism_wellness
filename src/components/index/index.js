import React, { Component } from "react";
import l_img from "../../images/l_img.png";
import r_img from "../../images/r_img.png";
import block2_r from "../../images/block2_r.png";
import block2_l from "../../images/block2_l.png";
import block3_r from "../../images/block3_r.png";
import block3_1 from "../../images/block3_1.png";
import block3_2 from "../../images/block3_2.png";
import block3_3 from "../../images/block3_3.png";
import block5_1 from "../../images/block5_1.png";
import block5_2 from "../../images/block5_2.png";
import block5_3 from "../../images/block5_3.png";
import placeholder_img from "../../images/placeholder.jpg";
import fitness from "../../images/category/fitness.svg";
import fitness_active from "../../images/category/fitness_active.svg";
import food from "../../images/category/food.svg";
import food_active from "../../images/category/food_active.svg";
import shopping from "../../images/category/shopping.svg";
import shopping_active from "../../images/category/shopping_active.svg";
import SPA from "../../images/category/SPA.svg";
import SPA_active from "../../images/category/SPA_active.svg";
import CategoryBlock from "../generic/CategoryBlock";
import Block1 from "../generic/Block1";
import Block2 from "../generic/Block2";
import Block3 from "../generic/Block3";
import "./index.scss";
import Block3Item from "../generic/Block3Item";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import Loader from "react-loader-spinner";
import { geolocated } from "react-geolocated";
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyBB7Tc7njRoyjegBDmqAVj09AKWbdRrTCI");
class index extends Component {
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
  }
  componentDidMount() {
    //   this.props.homePageData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.places &&
      this.props.places.data &&
      this.props.places.data.length &&
      this.props.places.data !== prevProps.places.data &&
      !this.props.isGeolocationEnabled
    ) {
      this.handleInputChange(this.props.places.data[0]);
      this.props.homePageData(this.props.places.data[0]._id);
    }

    const { filters } = this.props;
    if (this.props.places && this.props.places.data) {
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
            const state = this.props.places.data.find(
              state =>
                storableLocation.state &&
                storableLocation.state.toLowerCase() == state.name.toLowerCase()
            );
            if (state) {   
              this.handleplace(state._id);
              this.handleInputChange(state);
            } else {
              this.handleplace(this.props.places.data[0]._id);
              this.handleInputChange(this.props.places.data[0]);
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
  handleInputChange = state => {
    this.setState({ stateName: state.name, stateId: state._id });
  };

  handleplace = id => {
    this.props.homePageData(id);
  };

  render() {
    const { featuredEventsLoading } = this.props;
    const categories = [
      { name: "Food", image: food, image_active: food_active, path: "/food" },
      { name: "SPA", image: SPA, image_active: SPA_active, path: "/SPA" },
      {
        name: "Fitness",
        image: fitness,
        image_active: fitness_active,
        path: "/fitness"
      },
      {
        name: "Shopping",
        image: shopping,
        image_active: shopping_active,
        path: "/shopping"
      }
    ];
    // const block3_data = [
    //   { name: "Bath Mineral Spring", image: block3_1 },
    //   { name: "Bikram Yoga", image: block3_2 },
    //   { name: "Norma Webster Salon and Spa", image: block3_3 }
    // ];

    const block3_data = [];
    this.props.homeData.data &&
      this.props.homeData.data.popular.forEach(element => {
        block3_data.push({
          name: element.title,
          image:
            element && element.image && element.image.secure_url
              ? element.image.secure_url
              : placeholder_img,
          id: element._id
        });
      });

    // const block5_data = [
    //   { name: "Fitness Studio", image: block5_1 },
    //   { name: "Jamaica Fitness", image: block5_2 },
    //   { name: "Fitness on the beach", image: block5_3 }
    // ];
    const block5_data = [];
    this.props.homeData.data &&
      this.props.homeData.data.popularInFitness.forEach(element => {
        block5_data.push({
          name: element.title,
          image:
            element && element.image && element.image.secure_url
              ? element.image.secure_url
              : placeholder_img,
          id: element._id
        });
      });

    const banner_section_image = [];
    const feature_image = [];
    const popular_fitness_section_image = [];
    const popular_section_image = [];

    this.props.homeData.data &&
      this.props.homeData.data.homepageDetails.forEach(element => {
        if (JSON.parse(element.banner_section_image)) {
          banner_section_image.push({ image: element.image.secure_url });
        } else if (JSON.parse(element.feature_image)) {
          feature_image.push({
            title: element.title,
            description: element.description,
            image: element.image.secure_url
          });
        } else if (JSON.parse(element.popular_fitness_section_image)) {
          popular_fitness_section_image.push({
            image: element.image.secure_url
          });
        } else if (JSON.parse(element.popular_section_image)) {
          popular_section_image.push({ image: element.image.secure_url });
        }
      });

    const banner_url =
      banner_section_image.length &&
      banner_section_image[
        Math.floor(Math.random() * (+banner_section_image.length - +0))
      ].image;
    const popular_fitness_section_image_url =
      popular_fitness_section_image.length &&
      popular_fitness_section_image[
        Math.floor(Math.random() * (+popular_fitness_section_image.length - +0))
      ].image;
    const feature_item =
      feature_image.length &&
      feature_image[Math.floor(Math.random() * (+feature_image.length - +0))];
    const popular_events_url =
      popular_section_image.length &&
      popular_section_image[
        Math.floor(Math.random() * (+popular_section_image.length - +0))
      ].image;
    const places = this.props.places;
    // const
    // console.log(banner_section_image[0].image,url)

    return !this.props.homeData && this.props.homeData.success ? (
      <div className="home-loader-div" style={{ textAlign: "center" }}>
        <Loader type="Oval" color="#22b5fb" height="50" width="50" />
      </div>
    ) : (
      <>
        <Block1 l_img={l_img} r_img={banner_url}>
          <>
            {categories.map((category, i) => {
              return (
                <div key={i} className="category">
                  <CategoryBlock category={category} />
                </div>
              );
            })}
          </>
        </Block1>
        <Block2
          places={places}
          handleplace={this.handleplace}
          handleInputChange={this.handleInputChange}
          locationData={
            this.props.homeData.data && this.props.homeData.data.results
          }
          loading={featuredEventsLoading}
          stateName={this.state.stateName}
        />
        {block3_data.length ? (
          <Block1 l_img={block2_r} r_img={popular_events_url}>
            <>
              {block3_data
                .map((item, i) => {
                  return (
                    <div key={i} className="category1">
                      <Block3Item item={item} />
                    </div>
                  );
                })
                .slice(0, 3)}
            </>
          </Block1>
        ) : (
          <div className="home-loader-div" style={{ textAlign: "center" }}>
            <Loader type="Oval" color="#22b5fb" height="50" width="50" />
          </div>
        )}
        <Block3 item={feature_item} />
        {block5_data.length ? (
          <Block1 l_img={block2_r} r_img={popular_fitness_section_image_url}>
            <>
              {block5_data
                .map((item, i) => {
                  return (
                    <div key={i} className="category1">
                      <Block3Item item={item} />
                    </div>
                  );
                })
                .slice(0, 3)}
            </>
          </Block1>
        ) : (
          <div className="home-loader-div" style={{ textAlign: "center" }}>
            <Loader type="Oval" color="#22b5fb" height="50" width="50" />
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  homeData: state.event.featuredEvents.data,
  featuredEventsLoading: state.event.featuredEvents.isLoading,
  places: state.event.locations.data,
  showLocationData: state.event.showLocationData,
  storableLocation: state.event.storableLocation,
  filters: state.event
});

const mapDispatchToProps = dispatch => ({
  homePageData: id => dispatch(actions.getFeaturedEventsRequest(id)),
  // stateChange: id => dispatch(actions.stateChange(id)),
  // cityChange: id => dispatch(actions.cityChange(id)),
  setStorableLocation: value => dispatch(actions.storableLocation(value))
});

export default geolocated()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(index))
);
