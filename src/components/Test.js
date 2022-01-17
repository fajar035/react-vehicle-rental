import React, { Component } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "./../index.css"

class Coba extends Component {
  render() {
    const settings = {
      dots: true,
      autoplay: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 500
    }
    return (
      <div className="coba-slider">
        <div className="next">
          <i className="fas fa-angle-right"></i>
        </div>
        <Slider {...settings}>
          <div>
            <img
              src={require("../assets/images/comment_users.webp")}
              alt="Credit to Joshua Earle on Unsplash"
            />
          </div>
          <div>
            <img
              src={require("../assets/images/cover_home.webp")}
              alt="Credit to Alisa Anton on Unsplash"
            />
          </div>
        </Slider>
      </div>
    )
  }
}

export default Coba
