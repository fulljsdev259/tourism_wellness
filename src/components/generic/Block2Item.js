import React from "react";
import { Link } from "react-router-dom";
export default function Block2Item({ item }) {
  // console.log(item && item.length,'999999999999');
  return (
    <div className="block">
      <Link to={`business-detail/${item._id}`}>
        <img src={item.image && item.image.secure_url} />
        <div className="title1">{item.title}</div>
      </Link>
    </div>
  );
}
