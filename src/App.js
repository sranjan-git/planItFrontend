import React, { useState } from "react";
import MyCalendar from "./components/Calendar";
import NavBar from "./components/Navbar"; 
import Home from "./components/Home"; 
import { Container } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      {/* Navbar component will always be visible */}
      <NavBar user={user} setUser={setUser} />

      {/* Routes will handle page navigation */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      {/* Calendar is conditionally rendered if the user is logged in */}
      <Container>
        {user ? <MyCalendar user={user} /> : null}
      </Container>
    </Router>
  );
};

export default App;
