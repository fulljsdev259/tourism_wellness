import React, { useState } from "react";
import img_1 from "../../images/block2_1.png";
import img_2 from "../../images/block2_2.png";
import img_3 from "../../images/block2_3.png";
import img_4 from "../../images/block2_4.png";
import ic_settings from "../../images/icon/-e-ic_settings.svg";
import Block2Item from "./Block2Item";
import Loader from "react-loader-spinner";
import { stat } from "fs";

export default function Block2({ places, handleplace, locationData, loading, handleInputChange, stateName }) {
  // const [stateName, setStateName] = useState(0);
  // const [stateId, setStateId] = useState(0);
  // console.log("4444444444444", places);

  let stateList = React.createRef();
  // const categories = [
  //   { name: "Hospiten Montego Bay", image: img_1 },
  //   { name: "Shakti Mind Body Fitness", image: img_2 },
  //   { name: "White Witch Golf Course", image: img_3 },
  //   // { name: "Jus Natural Hair studio", image: img_4 }
  // ];
  const categories = locationData;
  
  return (
    <div className="child-selector block2">
      <div className="filter-block">
        <div className="title text-uppercase">WELLNESS IN {stateName}</div>
        <div className="place-nav">
          {places.data && places.data.length ? (
            <div className="place-nav-item setting ">
              <div className="place-nav-item-header">
                <div className="place-title setting-title">
                  <a style={{ textTransform: "capitalize" }}>
                    {stateName === "" ? places.data[0].name : stateName}
                  </a>
                </div>
              </div>
              <div
                className=" setting-icon"
                onClick={() => {
                  stateList.current.style.display = "block";
                }}
              >
                <img className="place-img" src={ic_settings} />
              </div>
              <div
                ref={stateList}
                className="place-nav-item-dropdown rounded-bottom"
              >
                <ul className="list-unstyled">
                  
                  {places.data.map((state, i) => (
                    <li key={i}>
                      <a
                        style={{ textTransform: "capitalize" }}
                        onClick={e => {
                          handleInputChange(state)
                          // setStateId(state._id);
                          // setStateName(state.name);
                          handleplace(state._id);
                          if (window.innerWidth <= 768) {
                            e.stopPropagation();
                            stateList.current.style.display = "none";
                          }
                        }}
                      >
                        {state.name.replace("_", " ")}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="blocks">
        {loading ? (
            <div className="mx-auto"><Loader type="Oval" color="#fff" height="30" width="30" /></div>
        ) : categories && categories.length ? (
          categories.map((item, i) => <Block2Item key={i} item={item} />)
        ) : (
            
          <div className="no-data">
            <h4>No data Available Right Now</h4>
          </div>
          
        )}
      </div>
    </div>
  );
}
