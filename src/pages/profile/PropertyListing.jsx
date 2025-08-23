import PropertyCard from "../../components/PropertyCard";

function PropertyListing({ properties, onDelete, onAdd }) {
  return (
    <>
      <hr />
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="mb-0 fw-bold">Listed Properties</h4>
        <button className="btn btn-success" onClick={onAdd}>
          Add Property
        </button>
      </div>

      {!properties || properties.length === 0 ? (
        <>
          <div className="col-12 d-flex justify-content-center">
            <div className="alert alert-info mt-3 d-flex justify-content-center">
              No Properties Listed Yet
            </div>
          </div>
        </>
      ) : (
        <div className="container-fluid px-0">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mt-3">
            {properties.map((property) => (
              <div className="col d-flex flex-column" key={property.id}>
                <PropertyCard 
                  property={property} 
                  showWishlistButton={false}
                />
                <button
                  className="btn btn-outline-danger btn-sm w-100 mt-2"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                  onClick={() => onDelete(property)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default PropertyListing;
