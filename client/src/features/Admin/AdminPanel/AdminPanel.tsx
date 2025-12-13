import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import BasePageLayout from "../../../shared/components/BasePageLayout/BasePageLayout";
import Button from "../../../shared/components/Button/Button";
import { useAuth } from "../../../shared/hooks/useAuth.hook";
import { NAV_LINKS } from "./static/NAV_LINKS";
import adminImg from "../../../assets/AdminPageMaterials/adminIcon.png";

const AdminPanel: React.FC = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      await logOut();
      navigate("/admin/login");
    }
  };

  return (
    <BasePageLayout
      isScreenHeight={true}
      heading={["ADMIN", "PANEL"]}
      mediaType="image"
      mediaSrc={adminImg}
      className="flex flex-row p-0 overflow-hidden"
    >
      {user && (
        <aside className="w-64 border-r border-border-default h-full flex flex-col justify-between p-8 bg-black/20 backdrop-blur-sm">
          <div className="flex flex-col gap-8">
            <div className="text-text-muted font-satoshi text-xs tracking-widest uppercase opacity-50">
              Navigation
            </div>

            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-lg font-forum tracking-wide transition-all duration-300 hover:pl-2 ${
                      isActive
                        ? "text-white border-l-2 border-primary-default pl-4"
                        : "text-text-default hover:text-white"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <div className="h-px w-full bg-border-default/30" />
            <Button
              variant="border"
              className="w-full py-3 text-xs text-red-400 border-red-900/50 hover:bg-red-900/20"
              onClick={handleLogout}
            >
              LOG OUT
            </Button>
          </div>
        </aside>
      )}

      <main className="flex-1 h-full overflow-y-auto bg-black/10 p-10 relative">
        <Outlet />
      </main>
    </BasePageLayout>
  );
};

export default AdminPanel;
