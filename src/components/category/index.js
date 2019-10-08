import React, { Component } from "react";
import fitness from "../../images/category/fitness.svg";
import fitness_active from "../../images/category/fitness_active.svg";
import food from "../../images/category/food.svg";
import {ReactComponent as FOOD} from "../../images/category/food.svg";
import food_active from "../../images/category/food_active.svg";
import shopping from "../../images/category/shopping.svg";
import shopping_active from "../../images/category/shopping_active.svg";
import SPA from "../../images/category/SPA.svg";
import SPA_active from "../../images/category/SPA_active.svg";
import CategoryBlock from "../generic/CategoryBlock";
import "./category.scss";
import TopMenu from "../generic/TopMenu";
import Description from "../generic/Description";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import EventItem from "../generic/EventItem";
import * as actions from "../../redux/actions";
import Loader from "react-loader-spinner";

let categories = [
  { name: "Food", image: food, image_active: food_active, path: "/food",backupImage: food, selected:false },
  { name: "SPA", image: SPA, image_active: SPA_active, path: "/SPA",backupImage: SPA ,selected:false},
  { name: "Fitness", image: fitness, image_active: fitness_active, path: "/fitness",backupImage: fitness ,selected:false},
  { name: "Shopping", image: shopping, image_active: shopping_active, path: "/shopping",backupImage:shopping ,selected:false}
];


class Category extends Component {
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
      location_status: "",
      selected_category: null,
      numberOfItemToShow:20
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleSelected=(e)=>{
    categories.forEach((value)=>{
      if(this.state.selected_category===e.toLowerCase()){
          value.image=value.image_active
         }
         else{
          value.image=value.backupImage
        }
    })
    this.setState({
      a:true
    })
  }

  handleMouseOver=(e)=>{
    categories.forEach((value)=>{
      if(value.name===e){          
          value.image=value.image_active
         }
         else if(value.image === value.image_active){
          value.image=value.backupImage
         }
         else{
          value.image=value.backupImage
        }
    })
    this.setState({
      a:true
    })
  }
  handleMouseLeave=(e)=>{
    // console.log('');
    
    categories.forEach((value)=>{
      if(value.name===e){
          value.image=value.backupImage
         }
        
    })
    this.setState({
      a:true
    })
  }

  numberOfItemToShow=()=>{
    this.setState({numberOfItemToShow:this.state.numberOfItemToShow+20})
  }

  render() {
    const {numberOfItemToShow} = this.state
    const { filters } = this.props;
    const cat =
      this.props.categories && this.props.categories.data
        ? this.props.categories.data.find(
            category => this.props.location.pathname === "/" + category.name
          )
        : "";
       

    if (filters.categories && filters.categories.data && !this.state.id) {
      const oneCategory = filters.categories.data.data.find(category => {
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
    return (
      <div className="event-page">
        <div className="categories col-lg-6 offset-lg-2 col-md-10 offset-md-1 col-sm-10 offset-sm-1 ">
          {categories.map((category, i) => {
            return (
              <div
                key={i}
                className={`category ${
                  window.location.pathname.toLowerCase().search(category.name.toLowerCase()) > -1
                    ? "selected"
                    : null 
                    
                }`}
                // name={category.name}
                style={{ background:window.location.pathname.toLowerCase().search(category.name.toLowerCase()) > -1 && "#f173ab"
              }}
              
              onMouseOver={()=>{this.handleMouseOver(category.name)}}
              onMouseLeave={()=>{this.handleMouseLeave(category.name)}}
              onClick = {()=>{this.handleSelected(category.name);}}
              >
              
                <CategoryBlock category={category} />
              </div>
            );
          })}
        </div>
        <TopMenu />
        <div className="">
          <Description name={cat.name} desc={cat.description}  />
        </div>

        <div className="event-div">
          {this.props.filters.eventsByCategory.isLoading ? (
            <div className="loader-div" style={{ textAlign: "center" }}>
              <Loader type="Oval" color="#fff" height="30" width="30" />
            </div>
          ) : this.props.events ? (
            this.props.events
              .filter(event => event.categories.name == cat.name)
              .map((event, i) => {
                return (
                  <React.Fragment>
                    {i < numberOfItemToShow && 
                   <EventItem key={i} event={event} />
                   }
                </React.Fragment>
                
                )
              })
          ) : (
            <div className="no-events">{`At this time, there is no Data `}</div>
          )}
          {this.props.events && this.props.events
              .filter(event => event.categories.name == cat.name).length > 20 && this.props.events
              .filter(event => event.categories.name == cat.name).length > numberOfItemToShow &&
              <div className="load-more-button-container" onClick={this.numberOfItemToShow} >
                <div className="load-more-button">Load more</div>
              </div>}
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.event.categories.data,
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
  )(Category)
);
