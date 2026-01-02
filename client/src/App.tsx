import React from "react";
import { BrowserRouter as Router, Route, Outlet } from "react-router-dom";
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
import AuthContextProvider from "./context/AuthContext/AuthContextProvider";
import BlogManager from "./features/Admin/BlogManager/BlogManager";
import ProtectedRoute from "./shared/components/ProtectedRoute/ProtectedRoute";
import AdminPanel from "./features/Admin/AdminPanel/AdminPanel";
import LogIn from "./features/Admin/LogIn/LogIn";
import ArticleManager from "./features/Admin/ArticleManager/ArticleManager";
import MenuManager from "./features/Admin/MenuManager/MenuManager";
import DishManager from "./features/Admin/DishManager/DishManager";
import UserManager from "./features/Admin/UserManager/UserManager";
import UserEditor from "./features/Admin/UserEditor/UserEditor";
import GuestRoute from "./shared/components/GuestRoute/GuestRoute";
import ReactLenis from "lenis/react";
import { CustomScrollbar } from "./features/CustomScrollbar/CustomScrollbar";
import AnimatedRoutes from "./features/AnimatedRoutes/AnimatedRoutes";
import { AdaptiveImage } from "./shared/components/Adaptive/AdaptiveImage/AdaptiveImage";

const App: React.FC = () => {
  return (
    <ReactLenis root>
      <Router>
        <div className="bg-background-default relative min-h-screen">
          <div className="fixed inset-0 z-0">
            <AdaptiveImage
              className="w-full h-full object-cover opacity-6"
              alt="background"
              mediaSrc="background.jpeg"
              formats={["avif", "jpg"]}
            />
          </div>
          <div className="h-auto relative z-10">
            <CustomScrollbar />
            <NavBar />

            <main>
              <UrqlProvider value={client}>
                <AnimatedRoutes>
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
                    <Route element={<AdminPanel />}>
                      <Route element={<GuestRoute />}>
                        <Route path="/admin/login" element={<LogIn />} />
                      </Route>
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
                        <Route path="/admin/users" element={<UserManager />} />
                        <Route
                          path="/admin/users/create"
                          element={<UserEditor />}
                        />
                        <Route
                          path="/admin/users/edit/:id"
                          element={<UserEditor />}
                        />
                      </Route>
                    </Route>
                  </Route>
                </AnimatedRoutes>
              </UrqlProvider>
            </main>
          </div>
        </div>
      </Router>
    </ReactLenis>
  );
};

export default App;
