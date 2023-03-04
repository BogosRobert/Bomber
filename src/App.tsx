import React from "react";
import { Routes, Route } from "react-router-dom";

//pages
import LandingPage from "containers/LandingPage/LandingPage";

//general usage
import { useNavigate } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
}

export default App;
