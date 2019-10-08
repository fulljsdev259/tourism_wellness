import React from "react";
import { Link } from "react-router-dom";

export default function CategoryBlock({ category }) {
  // console.log('111111111111111',category.name,window.location.pathname.search(category.name.toLowerCase()) > -);
  
  return (
    <Link to={category.path}>
      <div
        className="item"
    
      >
        <img src={window.location.pathname.toLowerCase().search(category.name.toLowerCase()) > -1 
          ?category.image_active
          :category.image} />
        <div>{category.name}</div>
      </div>
    </Link>
  );
}
