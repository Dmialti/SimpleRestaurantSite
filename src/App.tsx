import React from "react";
import Home from "./features/Home/Home";
import NavBar from "./features/NavBar/NavBar";
import Menu from "./features/Menu/Menu";
import Reservation from "./features/Reservation/Reservation";
import About from "./features/About/About";
import Contact from "./features/Contact/Contact";
import Blog from "./features/Blog/Blog";

const App: React.FC = () => {
  return (
    <div className="bg-background-default relative min-h-screen">
      {/* Background image */}
      <div className="fixed inset-0 z-0">
        <img
          src="/AppMaterials/background.jpg"
          className="w-full h-full object-cover opacity-6"
          alt="background"
        />
      </div>
      <div className="h-auto relative">
        <NavBar />
        <Blog />
      </div>
    </div>
  );
};

export default App;
