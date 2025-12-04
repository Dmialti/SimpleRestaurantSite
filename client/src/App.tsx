import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./features/About/About";
import Blog from "./features/Blog/Blog";
import Contact from "./features/Contact/Contact";
import Home from "./features/Home/Home";
import Menu from "./features/Menu/Menu";
import NavBar from "./features/NavBar/NavBar";
import Reservation from "./features/Reservation/Reservation";
import { Provider as UrqlProvider } from "urql";
import { client } from "./api/urqlClient";

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-background-default relative min-h-screen">
        <div className="fixed inset-0 z-0">
          <img
            src="/AppMaterials/background.jpg"
            className="w-full h-full object-cover opacity-6"
            alt="background"
          />
        </div>

        <div className="h-auto relative z-10">
          <NavBar />

          <main>
            <UrqlProvider value={client}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/about" element={<About />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
              </Routes>
            </UrqlProvider>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
