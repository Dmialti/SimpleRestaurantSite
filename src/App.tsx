import React from "react";
import Home from "./features/Home/Home";
import NavBar from "./features/NavBar/NavBar";

const App: React.FC = () => {
  return (
    <div className="bg-[#f4e3c1] h-screen relative">
      <NavBar />
      <Home />
    </div>
  );
};

export default App;
