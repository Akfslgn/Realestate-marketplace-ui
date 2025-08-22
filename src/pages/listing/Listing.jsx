import { useNavigate, useParams } from "react-router";
import { useGlobalStore } from "../../hooks/useGlobalStore";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMapLocationDot,
  FaHouseChimney,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import { useEffect, useState } from "react";
import { getListingById } from "../../api/listings";
import AIChat from "../../components/AIChat";

function Listing() {
  const { store, dispatch } = useGlobalStore();
  const { id } = useParams();
  const propertyId = parseInt(id);
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const propertyData = await getListingById(propertyId);
        setProperty(propertyData);
      } catch (e) {
        console.error("Error fetching property: ", e);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [propertyId]);

  // Error state
  if (error) {
    return (
      <div className="container py-4">
        <h2>Error Loading Property</h2>
        <p className="text-danger">{error}</p>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  // Property not found
  if (!property) {
    return (
      <div className="container py-4">
        <h2>Property Not Found</h2>
        <p>
          The property you're looking for doesn't exist or has been removed.
        </p>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  const formatPriceUS = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(property.price);

  // Image carousel functions
  const hasMultipleImages = property.images && property.images.length > 1;

  const nextImage = () => {
    if (hasMultipleImages) {
      setCurrentImageIndex((prev) =>
        prev === property.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (hasMultipleImages) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? property.images.length - 1 : prev - 1
      );
    }
  };

  // Current image URL
  const currentImageUrl =
    property.images && property.images.length > 0
      ? property.images[currentImageIndex]?.image_url
      : "https://via.placeholder.com/800x400";

  // Full address
  const address = `${property.address}, ${property.city}, ${property.state} ${property.zip_code}`;
  const mapQuery = encodeURIComponent(address);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between">
        <h2 className="mb-4">Listing Page</h2>
        <button
          className="btn btn-link p-0 mb-3"
          onClick={() => navigate(-1)}
          style={{ textDecoration: "none" }}
        >
          &larr; Go back
        </button>
      </div>

      <div className="row g-3">
        {/* Image Carousel */}
        <div className="col-12">
          <div className="card border">
            <div className="position-relative">
              <img
                src={currentImageUrl}
                className="card-img-top"
                alt={property.title}
                style={{ objectFit: "cover", width: "100%" }}
              />

              {/* Navigation Arrows */}
              {hasMultipleImages && (
                <>
                  <button
                    className="btn btn-light position-absolute top-50 start-0 translate-middle-y ms-3 shadow"
                    style={{ width: "50px", height: "50px", fontSize: "18px" }}
                    onClick={prevImage}
                    title="Previous image"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    className="btn btn-light position-absolute top-50 end-0 translate-middle-y me-3 shadow"
                    style={{ width: "50px", height: "50px", fontSize: "18px" }}
                    onClick={nextImage}
                    title="Next image"
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {hasMultipleImages && (
                <div className="position-absolute bottom-0 end-0 bg-dark text-white px-3 py-2 m-3 rounded">
                  <strong>
                    {currentImageIndex + 1} / {property.images.length}
                  </strong>
                </div>
              )}

              {/* Image Dots Indicator */}
              {hasMultipleImages && (
                <div className="position-absolute bottom-0 start-50 translate-middle-x mb-3">
                  <div className="d-flex gap-2">
                    {property.images.map((_, index) => (
                      <button
                        key={index}
                        className={`btn p-0 rounded-circle ${
                          index === currentImageIndex
                            ? "bg-light"
                            : "bg-secondary"
                        }`}
                        style={{
                          width: "12px",
                          height: "12px",
                          opacity: index === currentImageIndex ? 1 : 0.6,
                        }}
                        onClick={() => setCurrentImageIndex(index)}
                        title={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* First Row - Two Boxes */}
        {/* Price */}
        <div className="col-md-6">
          <div className="card border">
            <div className="card-body py-2">
              <p className="mb-0">Price: {formatPriceUS}</p>
            </div>
          </div>
        </div>
        {/* Specs */}
        <div className="col-md-6">
          <div className="card border">
            <div className="card-body py-2">
              <div className="d-flex justify-content-between">
                <span>
                  <FaBed className="me-1" /> {property.bedrooms}
                </span>
                <span>
                  <FaBath className="me-1" /> {property.bathrooms}
                </span>
                <span>
                  <FaRulerCombined className="me-1" /> {property.area_sqft}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Second Row - Address and contact */}
        <div className="col-md-8">
          <div className="card border">
            <div className="card-body py-2">
              <p className="mb-0">
                <FaMapLocationDot className="me-1" /> {address}
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border">
            <div className="card-body py-1 text-end d-flex justify-content-between">
              <input type="text" className="border-0 w-75" />
              <button className="btn btn-primary btn-sm">Contact</button>
            </div>
          </div>
        </div>

        {/* Bottom Row - Description */}
        <div className="col-12">
          <div className="card border">
            <div className="card-body py-3">
              <p className="mb-2">
                <FaHouseChimney className="me-1" />
                <span className="text-capitalize">
                  {property.property_type}
                </span>
              </p>
              <h5 className="mb-2">{property.title}</h5>

              <p className="mb-0">{property.description}</p>
            </div>
          </div>
        </div>

        {/* Map Row */}
        <div className="col-12">
          <div className="card border">
            <div className="card-body py-2">
              <h5 className="mb-2">Location</h5>
              <iframe
                title="Property Location"
                width="100%"
                height="300"
                style={{ border: 0 }}
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <AIChat listingId={id} />
    </div>
  );
}

export default Listing;
