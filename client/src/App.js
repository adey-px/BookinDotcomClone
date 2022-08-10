import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import Hotels from "./pages/hotels/Hotels";


function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotel/:id" element={<Hotel />} />
        <Route path="/hotels" element={<Hotels />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
