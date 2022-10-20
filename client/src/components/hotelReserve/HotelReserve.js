import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { SearchContext } from "../../contextApi/SearchContext";
import useFilter from "../../customHuk/useFilter";
import "./hotelReserve.css";

const HotelReserve = ({ setOpen, hotelId }) => {

  // State variables for handleSelect check box
  const [selectRoom, setSelectRoom] = useState([]);

  // Fetch room data from hotelRoute, prefix get from hotelDetail pg
  const { loading, data, error } = useFilter(`rooms/${hotelId}`);

  // Bring date in hotelDetail pg to get dateRange
  const { date } = useContext(SearchContext);

  const dateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const d = new Date(start.getTime());

    let date = []

    // loop over date range and push
    while (date <= end) {
      date.push(new Date(d).getTime());
      d.setDate(d.getDate() + 1);
    }
    return date
  };

  // Use dateRange to update unavailable date on selected room 
  const allDates = dateRange(date[0].startDate, date[0].endDate);
  console.log(allDates);
  //
  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unAvailableDate.some((sdate) =>
      allDates.includes(new Date(sdate).getTime())
    );
    return !isFound;
  };

  // Handle room select check boxes
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    // Get room if checked, empty if uncheked
    setSelectRoom(
      checked
        ? [...selectRoom, value]
        : selectRoom.filter((item) => item !== value)
    );
  };
  // console.log(selectRoom);

  // Handle reserve now btn on open modal
  const navigate = useNavigate();

  const reservBtn = async () => {
    try {
      await Promise.all(
        selectRoom.map((roomId) => {
          const res = axios.put(`/rooms/update-status/${roomId}`, {
            date: allDates,
          });
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {}
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />

        <span>Select your rooms:</span>

        {/* room data fetched with useFilter above */}
        {data.map((item) => (
          <div className="rItem">
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.description}</div>
              <div className="rMax">
                Max persons: <b>{item.maxPerson}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>

            <div className="rSelectRooms">
              {item.roomNumber.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <button className="rButton" onClick={reservBtn}>
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default HotelReserve;
