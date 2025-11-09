import React from "react";
import Home from "./features/Home/Home";
import NavBar from "./features/NavBar/NavBar";
import Menu from "./features/Menu/Menu";

const App: React.FC = () => {
  return (
    <div className="bg-background-default h-screen relative p-6">
      <NavBar />
      <Menu />
    </div>
  );
};

export default App;
