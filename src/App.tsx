import React from "react";
import StartingPage from "./pages/StartingPage";
import NavBar from "./components/NavBar";

const App: React.FC = () => {
  return (
    <div className="bg-[#f4e3c1] h-screen">
      <NavBar />
      <StartingPage />
    </div>
  );
};

export default App;
