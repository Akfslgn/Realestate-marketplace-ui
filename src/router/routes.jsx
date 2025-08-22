import { createBrowserRouter } from "react-router";
import RootLayout from "./RootLayout.jsx";
import ErrorPage from "./ErrorPage.jsx";
import Home from "../pages/home/Home.jsx";
import Landing from "../pages/landing/Landing.jsx";
import Listing from "../pages/listing/Listing.jsx";
import Wishlist from "../pages/wishlist/Wishlist.jsx";
import Profile from "../pages/profile/index.jsx";
import Registration from "../pages/registration/Registration.jsx";
import Login from "../pages/login/Login.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import AISearch from "../pages/aiSearch/AISearch.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // Layout wrapping the nested routes
    errorElement: <ErrorPage />, // Fallback for routing errors when not valid route
    children: [
      // Define individual routes for the application
      { index: true, element: <Landing /> },
      { path: "/home", element: <Home /> },
      { path: "/landing", element: <Landing /> },
      {
        path: "/listings/:id",
        element: (
          <ProtectedRoute>
            <Listing />
          </ProtectedRoute>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/ai-search",
        element: (
          <ProtectedRoute>
            <AISearch />
          </ProtectedRoute>
        ),
      },
      { path: "/signup", element: <Registration /> },
      { path: "/login", element: <Login /> },
    ],
  },
]);
