import React from "react";
import Home from "./features/Home/Home";
import NavBar from "./features/NavBar/NavBar";
import Menu from "./features/Menu/Menu";
import Reservation from "./features/Reservation/Reservation";
import About from "./features/About/About";
import Contact from "./features/Contact/Contact";

const App: React.FC = () => {
  return (
    <div className="bg-background-default h-auto relative">
      <NavBar />
      <Contact />
    </div>
  );
};

export default App;
