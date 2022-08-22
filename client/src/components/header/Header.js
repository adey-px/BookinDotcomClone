import React, {useState} from 'react'
import {DateRange} from 'react-date-range';
import {format} from 'date-fns';
import { useNavigate } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBed, faCalendarDays, faCar, faPerson, faPlane, 
        faTaxi} from '@fortawesome/free-solid-svg-icons'

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './header.css'


const Header = ({type}) => {

  // State hook for calender selection box
  const [openDate, setOpenDate] = useState(false)
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  // State hook for number of persons selection box 
  const [openOption, setOpenOption] = useState(false);
  const [option, setOption] = useState({
    adult: 1,
    children: 0,
    room: 1
  })

  const handleOption = (name, operation) => {
    setOption((prev) => {
      return {
        ...prev, [name]: operation === "i" ? option[name] + 1 : option[name] - 1,
      };
    });
  };

  // State hook for destination bar and search button
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");

  const handleSearch = () => {
    navigate("/hotels", { state: { destination, date, option } });
  }

  return (
    <div className="header">

      {/* Differentiate header styling for hotels page */}
      <div className={type === "hotels-list" ? "headerContainer listMode" : "headerContainer"}>

        {/* Header list items start here */}
        <div className="headerList">

          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>

          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>

          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car Rentals</span>
          </div>

          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>

          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport Taxis</span>
          </div>
        </div>

        {/* Header title and description. Sort header for hotels page */}
        { type !== "hotels-list" &&
          <>
            <h1 className="headerTitle">A lifetime of discounts? It's Awesome.</h1>
            <p className="headerDesc">
              Get rewarded for your travels - unlock instant savings of 10% or more
              with a free FlywiseBooking account
            </p>
            <button className="headerBtn">Sign in / Register</button>

            {/* Destination search bar on left side of header container */}
            <div className="headerSearch"> 
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  className="headerSearchInput"
                  placeholder="Where do you like to stay?"
                  onChange={e => setDestination(e.target.value)}
                />
              </div>

              {/* Selection box for calender and date range */}
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span onClick={()=>setOpenDate(!openDate)} className="headerSearchText">
                  {`${format(date[0].startDate, "MM/dd/yyyy")} to ${
                    format(date[0].endDate, "MM/dd/yy")}`}
                </span>

                {openDate && <DateRange
                  editableDateInputs={true}
                  onChange={item => setDate([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                  className="date"
                />}
              </div>
              
              {/* Selection box for number of person and room */}
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span className="headerSearchText" onClick={()=>setOpenOption(!openOption)} >
                  {`${option.adult} adult - ${option.children} children - ${option.room} room`}
                </span>

                {openOption && <div className="options">
                  <div className="optionItem">
                    <span className="optionText">Adult</span>
                    <div className="optionCounter">
                      <button className="optionCounterButton" disabled={option.adult === 0} 
                        onClick={()=>handleOption("adult", "i")} 
                      > +
                      </button>
                      <span className="optionCounterNumber">{option.adult}</span>

                      <button className="optionCounterButton" disabled={option.adult === 1} 
                        onClick={()=>handleOption("adult", "d")}
                      > -
                      </button>
                    </div>
                  </div>

                  <div className="optionItem">
                    <span className="optionText">Children</span>
                    <div className="optionCounter">
                      <button className="optionCounterButton" onClick={()=>handleOption("children", "i")}>
                      +
                      </button>
                      <span className="optionCounterNumber">{option.children}</span>

                      <button className="optionCounterButton" onClick={()=>handleOption("children", "d")}
                        disabled={option.children === 0}
                      > -
                      </button>
                    </div>
                  </div>

                  <div className="optionItem">
                    <span className="optionText">Room</span>
                    <div className="optionCounter">
                      <button className="optionCounterButton" disabled={option.room === 0}
                        onClick={()=>handleOption("room", "i")}
                      > +
                      </button>
                      <span className="optionCounterNumber">{option.room}</span>

                      <button className="optionCounterButton" disabled={option.room === 1}
                        onClick={()=>handleOption("room", "d")}
                        > -
                      </button>
                    </div>
                  </div>
                </div>}
              </div>
              
              {/* Search button */}
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        }

      </div>
    </div>
  );
}

export default Header;
