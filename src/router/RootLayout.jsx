import { Outlet, useNavigate } from "react-router";
import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";
import NavButton from "../components/NavButton.jsx";
import { isTokenValid } from "../utils/auth.js";
import { useEffect } from "react";
import { useGlobalStore } from "../hooks/useGlobalStore.js";
import { FaHome, FaHeart, FaUser, FaRobot, FaUserPlus } from "react-icons/fa";

function RootLayout() {
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalStore();
  useEffect(() => {}, [store.auth]);

  const handleLogOut = () => {
    console.log("Logging out...");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar>
        {!isTokenValid() ? (
          <>
            <NavButton to="/home" text="Listings" icon={<FaHome />} />
            <NavButton to="/login" text="Log In" icon={<FaUser />} />
            <NavButton to="/signup" text="Sign Up" icon={<FaUserPlus />} />
          </>
        ) : (
          <>
            <NavButton to="/home" text="Listings" icon={<FaHome />} />
            <NavButton to="/wishlist" text="Wishlist" icon={<FaHeart />} />
            <NavButton to="/profile" text="Profile" icon={<FaUser />} />
            <NavButton to="/ai-search" text="AI Search" icon={<FaRobot />} />
          </>
        )}
      </Navbar>
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;
