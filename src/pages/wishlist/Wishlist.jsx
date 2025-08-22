import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getUserById, removeFromWishlist } from "../../api/user";
import { getListingById } from "../../api/listings";
import { getToken, getDecodedToken, isTokenValid } from "../../utils/auth";
import PropertyCard from "../../components/PropertyCard";

function Wishlist() {
  console.log("🔥 NEW WISHLIST COMPONENT LOADED");

  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        console.log("Starting to fetch wishlist...");

        if (!isTokenValid()) {
          console.log("No valid token, redirecting to login");
          navigate("/login");
          return;
        }

        setLoading(true);
        const token = getToken();
        const decodedToken = getDecodedToken();
        const userId = parseInt(decodedToken.sub);

        console.log("Fetching user data for userId:", userId);

        const userData = await getUserById(token, userId);
        console.log("User data received:", userData);

        // Fetch full listing data for each wishlisted item
        const wishlistWithListings = [];
        if (userData.wishlisted_items && userData.wishlisted_items.length > 0) {
          for (const wishlistItem of userData.wishlisted_items) {
            try {
              const listingData = await getListingById(wishlistItem.listing_id);
              wishlistWithListings.push({
                ...wishlistItem,
                listing: listingData, // Add the full listing data
              });
            } catch (error) {
              console.error(
                `Error fetching listing ${wishlistItem.listing_id}:`,
                error
              );
              // Skip this listing if it can't be fetched
            }
          }
        }

        setWishlistItems(wishlistWithListings);
        console.log("Wishlist items with listings:", wishlistWithListings);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [navigate]);

  const handleRemoveItem = async (wishlistItem) => {
    try {
      const token = getToken();
      const decodedToken = getDecodedToken();
      const userId = parseInt(decodedToken.sub);

      await removeFromWishlist(token, userId, wishlistItem.id);

      // Remove from local state
      setWishlistItems((prev) =>
        prev.filter((item) => item.id !== wishlistItem.id)
      );

      console.log("Removed from wishlist successfully");
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      alert("Failed to remove from wishlist. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="container py-4">
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <h2>Error Loading Wishlist</h2>
        <p className="text-danger">{error}</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-3 fw-bold">My Wishlist</h2>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-5">
          <div className="alert alert-info">Your wishlist is empty</div>
          <button className="btn btn-primary" onClick={() => navigate("/home")}>
            Browse Properties
          </button>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-3">
          {wishlistItems.map((wishlistItem) => (
            <div className="col" key={wishlistItem.id}>
              <PropertyCard
                property={wishlistItem.listing}
                showWishlistButton={false}
              />
              <button
                className="btn btn-outline-danger btn-sm w-100 mt-1"
                onClick={() => handleRemoveItem(wishlistItem)}
              >
                Remove from Wishlist
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
