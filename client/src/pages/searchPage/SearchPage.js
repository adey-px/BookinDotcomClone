import { useState } from "react";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import { DateRange } from "react-date-range";

import NavbarComp from "../../components/navbarComp/NavbarComp";
import HeaderComp from "../../components/headerComp/HeaderComp";
import SearchList from "../../components/searchComp/SearchList";
import useCount from "../../acustomHooks/useCount";
import "./searchPage.css";


const SearchPage = () => {

  const location = useLocation();

  // State hooks from search bar in header comp
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [option, setOption] = useState(location.state.option);

  // State var from useCount function hook. Path here taken from app.js/hotelRoute
  const {loading, data, error, reFetch} = useCount(`/hotel/all-hotels?city=${destination}`)

  return (
    <div>

      <NavbarComp />
      <HeaderComp type="hotels-list" />

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

          {/* Search result on right. Item here is used in searchList comp */}
          <div className="listResult">
            {loading ? "Loading please wait..." : 
              <>
              {data.map(item => (
                <SearchList item={item} key={item._id} />
              ))}
              </>
            }
          </div>

        </div>
      </div>
    </div>
  );
};

export default SearchPage;