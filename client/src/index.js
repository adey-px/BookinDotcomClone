import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import HotelsList from "./pages/hotelsList/HotelsList";


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hotel/:id" element={<Hotel />} />
      <Route path="/hotels" element={<HotelsList />} />
    </Routes>
  </BrowserRouter>

);
