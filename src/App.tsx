import React from "react";
import Home from "./features/Home/Home";
import NavBar from "./features/NavBar/NavBar";
import Menu from "./features/Menu/Menu";
import Reservation from "./features/Reservation/Reservation";

const App: React.FC = () => {
  return (
    <div className="bg-background-default h-auto relative">
      <NavBar />
      <Reservation />
    </div>
  );
};

export default App;
