import PropertyCard from "./PropertyCard.jsx";

function PropertyListing({ properties }) {
  console.log("Rendering properties", properties);
  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {properties.map((property) => (
          <div key={property.id} className="col">
            <PropertyCard property={property} showWishlistButton={true} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertyListing;
