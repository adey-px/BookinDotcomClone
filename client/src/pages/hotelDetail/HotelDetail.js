import { useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleArrowLeft, faCircleArrowRight, faCircleXmark, 
        faLocationDot} from "@fortawesome/free-solid-svg-icons";

import NavbarComp from "../../components/navbarComp/NavbarComp";
import HeaderComp from "../../components/headerComp/HeaderComp";
import MailingComp from "../../components/mailingComp/MailingComp";
import FooterComp from "../../components/footerComp/FooterComp";
import useFilter from "../../customhook/useFilter";
import "./hotelDetail.css";


const HotelDetail = () => {

  // State hook linked to Check btn in searchList pg
  const location = useLocation();
  const id = location.pathname.split("/")[2];  //Path from index/hotelRoute
  const {loading, data, error} = useFilter(`/hotels/unit-hotel/${id}`);

  // State hook for images slider
  const [sliderOpen, setSliderOpen] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);

  // Links to hotel room images in slider
  const image = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
  ];

  // Action called on clicking images in column
  const handleSliderOpen = (i) => {
    setSliderIndex(i);
    setSliderOpen(true);
  };

  // Action called on clicking arrows in slider
  const handleSliderMove = (direction) => {
    let newSliderIndex;

    if (direction === "left") {
      newSliderIndex = sliderIndex === 0 ? 5 : sliderIndex - 1;
    } else {
      newSliderIndex = sliderIndex === 5 ? 0 : sliderIndex + 1;
    }
    setSliderIndex(newSliderIndex)
  };


  return (
    <div>

      <NavbarComp />
      <HeaderComp type="hotels-list" />

      {loading ? ("Loading please wait...") : (
        <>
        <div className="hotelContainer">

          {/* Logic for display images in slider below */}
          {sliderOpen && (
            <div className="slider">

              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setSliderOpen(false)}
              />

              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleSliderMove("left")}
              />

              <div className="sliderWrapper">
                <img className="sliderImg" src={image[sliderIndex].src} 
                  alt=""
                />
                
              </div>

              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleSliderMove("right")}
              />
            </div>
          )}
          
          {/* Texts above columns of hotel room images */}
          <div className="hotelWrapper">
            <button className="bookNow">Reserve or Book Now!</button>
            <h1 className="hotelTitle">{data.name}</h1>

            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>

            <span className="hotelDistance">
              Excellent location - {data.distance}m from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
            </span>

            {/* Columns of images of selected hotel room */}
            <div className="hotelImages">
              {image.map((image, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    className="hotelImg"
                    src={image.src} 
                    alt="Room interior view"
                    onClick={() => handleSliderOpen(i)}
                  />
                </div>
              ))}
            </div>

            {/* Texts and info below columns of hotel room images */}
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">
                  {data.description}
                </p>
              </div>

              <div className="hotelDetailsPrice">
                <h1>Perfect for a 9-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>

                <h2><b>$945</b> (9 nights)</h2>
                <button>Reserve or Book Now!</button>
              </div>

            </div>
          </div>

          <MailingComp />
          <FooterComp />

        </div>
        </>
      )}
    </div>
  );
};

export default HotelDetail;