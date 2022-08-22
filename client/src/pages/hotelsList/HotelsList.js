import { useState } from "react";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import { DateRange } from "react-date-range";

import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import SearchItem from "../../components/search/SearchItem";
import "./hotelsList.css";


const HotelsList = () => {

  const location = useLocation();

  // State hooks from search bar in Header comp
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [option, setOption] = useState(location.state.option);

  return (
    <div>

      <Navbar />
      <Header type="hotels-list" />

      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">

            <h1 className="lsTitle">Your Current Search</h1>

            <div className="lsItem">
              <label>Intended Destination</label>
              <input placeholder={destination} type="text" />
            </div>

            <div className="lsItem">
              <label>Length of stay</label>

              <span onClick={() => setOpenDate(!openDate)}> 
                {`${format(date[0].startDate, "MM/dd/yyyy"
                )} to ${format(date[0].endDate, "MM/dd/yyyy")}`
                }
              </span>

              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>

            <div className="lsItem">
              <label>Options</label>

              <div className="lsOptions">
                <div className="lsOptionItem">

                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>

                  <input type="number" className="lsOptionInput" />
                </div>

                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>

                  <input type="number" className="lsOptionInput" />
                </div>

                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>

                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={option.adult}
                  />
                </div>

                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>

                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={option.children}
                  />
                </div>

                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>

                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={option.room}
                  />
                </div>

              </div>
            </div>

            <button>Search</button>

          </div>

          <div className="listResult">
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
          </div>

        </div>
      </div>
    </div>
  );
};

export default HotelsList;