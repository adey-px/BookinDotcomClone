import { Link } from "react-router-dom";

import "./searchList.css";


// Hotel search result. Item var here taken from SearchPage
const SearchList = ({item}) => {
  
  return (
    <div className="searchItem">

      <img
        src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
        alt=""
        className="siImg"
      />

      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}m from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>

        <span className="siFeatures">{item.description}</span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>

      <div className="siDetails">

        {item.rating ? 
          <div className="siRating">
            <span>Excellent</span>
            <button>{item.rating}</button>
          </div>
          :
          <div className="siRating">
            <span>No Rating</span>
            <button>0.0</button>
          </div>
        }

        <div className="siDetailTexts">
          <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>

          {/*  Link to HotelDetail pg. Path from hotelRoute/index.js.*/}
          <Link to={`/hotels/unit-hotel/${item._id}`}>
            <button className="siCheckButton">
              Check Availability
            </button>
          </Link>
          
        </div>
      </div>

    </div>
  );
};

export default SearchList;