import React from "react";
import { Link} from "react-router-dom";

export default function Block3Item({ item }) {
  return (
    <div className="link-card">
    <Link to={`business-detail/${item.id}`}>
      <div className="img" style={{ backgroundImage: `url(${item.image})`}} />
      <div className="category1-text">{item.name}</div>
      </Link>
    </div>
  );
}
