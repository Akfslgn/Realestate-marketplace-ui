import { useState } from "react";
import { createListing, uploadListingImage } from "../../api/listings"; // Changed from user.js to listings.js
import { getToken, getDecodedToken } from "../../utils/auth";

function PropertyModal({ setShowAddModal, setProfile, profile }) {
  const [newProperty, setNewProperty] = useState({
    title: "",
    description: "",
    price: "",
    area_sqft: "",
    bathrooms: "",
    bedrooms: "",
    property_type: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    images: [
      { file: null, caption: "" },
      { file: null, caption: "" },
      { file: null, caption: "" },
      { file: null, caption: "" },
    ],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!newProperty.title || !newProperty.price) {
      alert("Please fill in at least title and price");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = getToken();
      const decodedToken = getDecodedToken();

      // Prepare listing data
      const listingData = {
        owner_id: parseInt(decodedToken.sub),
        title: newProperty.title,
        description: newProperty.description,
        price: parseFloat(newProperty.price),
        area_sqft: parseInt(newProperty.area_sqft) || null,
        bathrooms: parseFloat(newProperty.bathrooms) || null,
        bedrooms: parseInt(newProperty.bedrooms) || null,
        property_type: newProperty.property_type,
        address: newProperty.address,
        city: newProperty.city,
        state: newProperty.state,
        zip_code: newProperty.zip_code,
      };

      // Create the listing first
      const listingResponse = await createListing(token, listingData);
      const newListing = listingResponse.listing || listingResponse;

      // Upload images if any
      const uploadedImages = [];
      for (const imageData of newProperty.images) {
        if (imageData.file) {
          try {
            const imageResponse = await uploadListingImage(
              token,
              newListing.id,
              imageData.file,
              imageData.caption || "Property image"
            );
            uploadedImages.push(imageResponse);
          } catch (error) {
            console.error("Error uploading image:", error);
          }
        }
      }

      // Update the profile with the new listing
      const updatedListing = {
        ...newListing,
        images:
          uploadedImages.length > 0
            ? uploadedImages
            : [{ image_url: "https://via.placeholder.com/400x300" }],
      };

      setProfile({
        ...profile,
        owned_listings: [...(profile.owned_listings || []), updatedListing],
      });

      // Reset form and close modal
      setNewProperty({
        title: "",
        description: "",
        price: "",
        area_sqft: "",
        bathrooms: "",
        bedrooms: "",
        property_type: "",
        address: "",
        city: "",
        state: "",
        zip_code: "",
        images: [
          { file: null, caption: "" },
          { file: null, caption: "" },
          { file: null, caption: "" },
          { file: null, caption: "" },
        ],
      });

      setShowAddModal(false);
      console.log("Property created successfully!");
    } catch (error) {
      console.error("Error creating property:", error);
      alert("Failed to create property. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div
        className="modal-backdrop fade show"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      />
      <div className="modal show d-block" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Property</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowAddModal(false)}
                disabled={isSubmitting}
              ></button>
            </div>
            <div className="modal-body">
              <input
                className="form-control mb-2"
                placeholder="Title *"
                value={newProperty.title}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, title: e.target.value })
                }
                disabled={isSubmitting}
              />
              <textarea
                className="form-control mb-2"
                placeholder="Description"
                value={newProperty.description}
                onChange={(e) =>
                  setNewProperty({
                    ...newProperty,
                    description: e.target.value,
                  })
                }
                disabled={isSubmitting}
              />
              <input
                className="form-control mb-2"
                placeholder="Price *"
                type="number"
                value={newProperty.price}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, price: e.target.value })
                }
                disabled={isSubmitting}
              />
              <input
                className="form-control mb-2"
                placeholder="Area (sqft)"
                type="number"
                value={newProperty.area_sqft}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, area_sqft: e.target.value })
                }
                disabled={isSubmitting}
              />
              <input
                className="form-control mb-2"
                placeholder="Bedrooms"
                type="number"
                value={newProperty.bedrooms}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, bedrooms: e.target.value })
                }
                disabled={isSubmitting}
              />
              <input
                className="form-control mb-2"
                placeholder="Bathrooms"
                type="number"
                step="0.5"
                value={newProperty.bathrooms}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, bathrooms: e.target.value })
                }
                disabled={isSubmitting}
              />
              <select
                className="form-control mb-2"
                value={newProperty.property_type}
                onChange={(e) =>
                  setNewProperty({
                    ...newProperty,
                    property_type: e.target.value,
                  })
                }
                disabled={isSubmitting}
              >
                <option value="">Select Property Type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
              <input
                className="form-control mb-2"
                placeholder="Address"
                value={newProperty.address}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, address: e.target.value })
                }
                disabled={isSubmitting}
              />
              <input
                className="form-control mb-2"
                placeholder="City"
                value={newProperty.city}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, city: e.target.value })
                }
                disabled={isSubmitting}
              />
              <input
                className="form-control mb-2"
                placeholder="State"
                value={newProperty.state}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, state: e.target.value })
                }
                disabled={isSubmitting}
              />
              <input
                className="form-control mb-2"
                placeholder="Zip Code"
                value={newProperty.zip_code}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, zip_code: e.target.value })
                }
                disabled={isSubmitting}
              />

              <label className="form-label">Images (up to 4):</label>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="mb-2">
                  <input
                    type="file"
                    className="form-control mb-1"
                    accept="image/*"
                    onChange={(e) => {
                      const images = [...newProperty.images];
                      images[i].file = e.target.files[0];
                      setNewProperty({ ...newProperty, images });
                    }}
                    disabled={isSubmitting}
                  />
                  <input
                    className="form-control"
                    placeholder="Image Caption"
                    value={newProperty.images[i].caption}
                    onChange={(e) => {
                      const images = [...newProperty.images];
                      images[i].caption = e.target.value;
                      setNewProperty({ ...newProperty, images });
                    }}
                    disabled={isSubmitting}
                  />
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowAddModal(false)}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Add Property"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PropertyModal;
