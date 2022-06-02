import React from "react";
import "./slider.css";
import Carousel from "react-material-ui-carousel";
function Silder() {
  return (
    <div className="slider-container">
      <div className="newsletter">75% off on all products %BUY NOW%</div>
      <Carousel
        className="slider"
        autoPlay={true}
        animation="fade"
        indicators={false}
        // navButtonsAlwaysVisible={true}
        cycleNavigation={true}
        StylesProvider
        navButtonsProps={{
          style: {
            color: "white",
            backgroundColor: "transparent",
            borderRadius: 60,
            margin: 0,
            width: 100,
          },
        }}
      >
        {/* {bannerData.map((image) => (
        <img src={image} className="bannerimg" />
      ))} */}
        <div className="images">
          <img
            src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/screen-shot-2020-04-07-at-4-22-17-pm-1586290947.png?crop=1xw:1xh;center,top&resize=480:*"
            alt=""
            className="bannerimg"
          />
          <span className="imgText">50% off ON NEW TRENDS</span>
        </div>
        <div className="images">
          <img
            src="https://i.pinimg.com/736x/a5/86/8c/a5868c44a2705fe80d9c9d6ff4c8d69c.jpg"
            alt=""
            className="bannerimg"
          />
          <span className="imgText">60% off ON NEW TRENDS</span>
        </div>
        <div className="images">
          <img
            src="https://devseg.com/wp-content/uploads/2021/06/half-length-shot-of-two-girls-with-social-media-icon-outdoor-photo-of-female-models-using-shopping.jpg"
            alt=""
            className="bannerimg"
          />
          <span className="imgText">30% off ON NEW TRENDS</span>
        </div>
      </Carousel>
    </div>
  );
}

export default Silder;
