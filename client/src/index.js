import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/homePage/HomePage";
import HotelDetail from "./pages/hotelDetail/HotelDetail";
import SearchList from "./pages/searchPage/SearchPage";


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  // Paths for navigation to inner pages
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/hotels-by-city" element={<SearchList />} />
      <Route path="/hotel/:id" element={<HotelDetail />} />
    </Routes>
  </BrowserRouter>

);
