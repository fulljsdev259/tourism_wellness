import React from "react";
import corn from "../../images/corn.png";
import FoodSection from "../../images/category/food-section.png";
import SpaSection from "../../images/category/spa-section.png";
import ShoppingSection from "../../images/category/shopping-section.png";
import FitnessSection from "../../images/category/fitness-section.png";
let SectionImgUrl;

export default function Description({ name, desc}) {
  {
    name && name.toLowerCase() === "food"
    ? SectionImgUrl = FoodSection
    :name && name.toLowerCase() === "spa"
    ? SectionImgUrl = SpaSection
    :name && name.toLowerCase() === "fitness"
    ? SectionImgUrl = FitnessSection
    :name && name.toLowerCase() === "shopping"
    ? SectionImgUrl = ShoppingSection
    : SectionImgUrl = null;

  }    
  return (
    <div className=" col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-sm-10 offset-sm-1  description-div">
      <div className="cat">
        <div>{name}</div>
        <div>{desc}</div>
      </div>
      {!(window.location.href == `${window.location.origin}/events`) && (
        <div className="cat-img">
          <img src={SectionImgUrl} />
        </div>
      )}
      {/* <div className="cat-bg-img" style={{ backgroundImage: `url(${SectionImgUrl})` }}>
      </div> */}
    </div>
  );
}
