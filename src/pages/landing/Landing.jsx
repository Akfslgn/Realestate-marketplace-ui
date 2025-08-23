import { useEffect, useState } from "react";
import { getAllListings } from "../../api/listings";
import Hero from "../../components/Hero";
import PropertyCard from "../../components/PropertyCard";

function Landing() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const listingsData = await getAllListings();
        setListings(listingsData.slice(0, 4)); // Only keep first 4
      } catch (error) {
        console.error("Error fetching listings:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="container-fluid">
      <div>
        <Hero />
      </div>
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="h3 mb-1">Homes For You</h2>
            <p className="text-muted mb-0">
              Based on homes you recently viewed
            </p>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="alert alert-warning" role="alert">
            Failed to load listings: {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="d-flex justify-content-center py-4">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          /* Property Listing - Only first 4 */
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {listings.length === 0 ? (
              <div className="col-12">
                <div className="alert alert-info text-center">
                  No properties available at the moment.
                </div>
              </div>
            ) : (
              listings.map((property) => (
                <div key={property.id} className="col mb-4">
                  <PropertyCard property={property} showWishlistButton={true} />
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Landing;
