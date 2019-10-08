import React from 'react'

export default function Block3({ item }) {
  return (
    <div className="child-selector block3"style={{ backgroundImage: `url(${item.image})`}}>
      <div className="b1">Enjoy our</div>
      <div className="b2">{item.title}</div>
      <div className="b3">{item.description}</div>
      <div className="b4"><a href="https://www.blueandjohncrowmountains.org/do/walks-and-hikes/blue-mountain-peak-hike/" 
                          className="learnMore" target="_blank">Learn More</a>
      </div>
    </div>
  )
}
