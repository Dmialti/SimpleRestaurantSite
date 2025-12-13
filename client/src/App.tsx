import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import About from "./features/About/About";
import Blog from "./features/Blog/Blog";
import Contact from "./features/Contact/Contact";
import Home from "./features/Home/Home";
import Menu from "./features/Menu/Menu";
import NavBar from "./features/NavBar/NavBar";
import Reservation from "./features/Reservation/Reservation";
import { Provider as UrqlProvider } from "urql";
import { client } from "./urql/urqlClient";
import Article from "./features/Article/Article";
import backgroundImg from "./assets/AppMaterials/background.jpg";
import AuthContextProvider from "./context/AuthContext/AuthContextProvider";
import BlogManager from "./features/Admin/BlogManager/BlogManager";
import ProtectedRoute from "./shared/components/ProtectedRoute/ProtectedRoute";
import AdminPanel from "./features/Admin/AdminPanel/AdminPanel";
import LogIn from "./features/Admin/LogIn/LogIn";
import ArticleManager from "./features/Admin/ArticleManager/ArticleManager";
import MenuManager from "./features/Admin/MenuManager/MenuManager";
import DishManager from "./features/Admin/DishManager/DishManager";

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-background-default relative min-h-screen">
        <div className="fixed inset-0 z-0">
          <img
            src={backgroundImg}
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
                <Route path="/article/:id" element={<Article />} />
                <Route
                  element={
                    <AuthContextProvider>
                      <Outlet />
                    </AuthContextProvider>
                  }
                >
                  <Route path="/admin" element={<AdminPanel />}>
                    <Route path="/admin/login" element={<LogIn />} />
                    <Route element={<ProtectedRoute />}>
                      <Route path="/admin/blog" element={<BlogManager />} />
                      <Route
                        path="/admin/blog/edit/:id"
                        element={<ArticleManager />}
                      />
                      <Route
                        path="/admin/blog/create"
                        element={<ArticleManager />}
                      />
                      <Route path="/admin/menu" element={<MenuManager />} />
                      <Route
                        path="/admin/dish/edit/:id"
                        element={<DishManager />}
                      />
                      <Route
                        path="/admin/dish/create"
                        element={<DishManager />}
                      />
                    </Route>
                  </Route>
                </Route>
              </Routes>
            </UrqlProvider>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
