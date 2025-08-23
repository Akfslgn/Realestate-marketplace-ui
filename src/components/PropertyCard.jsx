import { Link } from "react-router";
import { CiShoppingTag } from "react-icons/ci";
import { FaRegHeart, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { addToWishlist } from "../api/user";
import { getToken, getDecodedToken, isTokenValid } from "../utils/auth";
import { useState } from "react";

function PropertyCard({
  property,
  showWishlistButton = true,
  onWishlistAdded,
}) {
  console.log("Rendering a property card");

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Check if property has multiple images
  const hasMultipleImages = property.images && property.images.length > 1;

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasMultipleImages) {
      setCurrentImageIndex((prev) =>
        prev === property.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasMultipleImages) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? property.images.length - 1 : prev - 1
      );
    }
  };

  const formatPriceUS = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(property.price);

  // Safe image URL with fallback
  const imageUrl =
    property.images && property.images.length > 0
      ? property.images[currentImageIndex]?.image_url
      : "https://via.placeholder.com/400x300";

  const handleAddToWishlist = async () => {
    if (!isTokenValid()) {
      alert("Please log in to add items to wishlist");
      return;
    }

    try {
      const token = getToken();
      const decodedToken = getDecodedToken();
      const userId = parseInt(decodedToken.sub);

      await addToWishlist(token, userId, property.id);

      if (onWishlistAdded) {
        onWishlistAdded();
      }

      alert("Added to wishlist successfully!");
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      alert("Failed to add to wishlist. Please try again.");
    }
  };

  return (
    <div className="h-100 d-flex flex-column">
      <Link
        to={`/listings/${property.id}`}
        className="text-decoration-none flex-grow-1"
      >
        <div className="card h-100">
          <div className="position-relative">
            <img
              src={imageUrl}
              className="card-img-top"
              alt={property.title}
              style={{
                height: "200px",
                width: "100%",
                objectFit: "cover",
                maxWidth: "100%",
              }}
            />

            {/* Image Navigation Arrows */}
            {hasMultipleImages && (
              <>
                <button
                  className="btn btn-light position-absolute top-50 start-0 translate-middle-y ms-2 p-1 opacity-75"
                  style={{ width: "30px", height: "30px", fontSize: "12px" }}
                  onClick={prevImage}
                  title="Previous image"
                >
                  <FaChevronLeft />
                </button>
                <button
                  className="btn btn-light position-absolute top-50 end-0 translate-middle-y me-2 p-1 opacity-75"
                  style={{ width: "30px", height: "30px", fontSize: "12px" }}
                  onClick={nextImage}
                  title="Next image"
                >
                  <FaChevronRight />
                </button>
              </>
            )}

            {/* Image Counter */}
            {hasMultipleImages && (
              <div className="position-absolute bottom-0 end-0 bg-dark text-white px-2 py-1 m-2 rounded small">
                {currentImageIndex + 1} / {property.images.length}
              </div>
            )}
          </div>
          <div className="card-body d-flex flex-column">
            {/* Price */}
            <h5 className="card-title fw-bold mb-1">{formatPriceUS}</h5>
            {/* Details */}
            <div className="d-flex gap-2 text-dark mb-2">
              <span>{property.bedrooms} beds</span>
              <span className="text-muted">|</span>
              <span>{property.bathrooms} baths</span>
              <span className="text-muted">|</span>
              <span>{property.area_sqft} sqft</span>
            </div>

            {/* Title, Address, Type */}
            <p className="card-text mb-1 fw-bold text-truncate">
              {property.title}
            </p>
            <p className="card-text small text-muted mb-2 text-truncate">
              {`${property.address}, ${property.city}, ${property.state}, ${property.zip_code}`}
            </p>

            <div className="d-flex align-items-center small text-muted mt-auto">
              <span className="text-capitalize">
                <CiShoppingTag /> {property.property_type}
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Add to Wishlist Button - Only show on Home/Landing pages */}
      {showWishlistButton && (
        <button
          className="btn btn-outline-primary btn-sm w-100 mt-1"
          onClick={handleAddToWishlist}
        >
          <FaRegHeart className="me-1" />
          Add to Wishlist
        </button>
      )}
    </div>
  );
}

export default PropertyCard;
