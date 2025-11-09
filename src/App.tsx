import React from "react";
import Home from "./features/Home/Home";
import NavBar from "./features/NavBar/NavBar";

const App: React.FC = () => {
  return (
    <div className="bg-background-default h-screen relative">
      <NavBar />
      <Home />
    </div>
  );
};

export default App;
