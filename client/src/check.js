import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { SearchContext } from "../../contextApi/SearchContext";
import useFilter from "../../customHuk/useFilter";
import "./hotelReserve.css";

// Popup to reserve hotel room, link to reservBtn in HotelDetail pg
const HotelReserve = ({ setOpen, hotelId }) => {
  //
  const [selectRoom, setSelectRoom] = useState([]);

  // Route taken from app.js/hotelRoute
  const { loading, data, error } = useFilter(`rooms/${hotelId}`);

  //
  const { date } = useContext(SearchContext);

  const getDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const sdate = new Date(start.getTime());

    let list = [];
    while (date <= end) {
      list.push(new Date(sdate).getTime());
      sdate.setDate(sdate.getDate() + 1);
    }
    return list;
  };

  //
  const allDate = getDateRange(date[0].startDate, date[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unAvailableDate.some((sdate) =>
      allDate.includes(new Date(sdate).getTime())
    );
    return !isFound;
  };

  //
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectRoom(
      checked
        ? [...selectRoom, value]
        : selectRoom.filter((item) => item !== value)
    );
  };

  //
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await Promise.all(
        selectRoom.map((roomId) => {
          const res = axios.put(`/rooms/update-room-status/${roomId}`, {
            date: allDate,
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

        <button className="rButton" onClick={handleClick}>
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default HotelReserve;
