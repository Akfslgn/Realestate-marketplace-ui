import { useState, useEffect } from "react";
import {
  createListing,
  uploadListingImage,
  updateListing,
} from "../../api/listings";
import { getToken, getDecodedToken } from "../../utils/auth";

function PropertyModal({
  setShowAddModal,
  setProfile,
  profile,
  editProperty = null,
}) {
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
  const isEditMode = !!editProperty;

  // Initialize form with edit data
  useEffect(() => {
    if (editProperty) {
      setNewProperty({
        title: editProperty.title || "",
        description: editProperty.description || "",
        price: editProperty.price?.toString() || "",
        area_sqft: editProperty.area_sqft?.toString() || "",
        bathrooms: editProperty.bathrooms?.toString() || "",
        bedrooms: editProperty.bedrooms?.toString() || "",
        property_type: editProperty.property_type || "",
        address: editProperty.address || "",
        city: editProperty.city || "",
        state: editProperty.state || "",
        zip_code: editProperty.zip_code || "",
        images: [
          { file: null, caption: "" },
          { file: null, caption: "" },
          { file: null, caption: "" },
          { file: null, caption: "" },
        ],
      });
    }
  }, [editProperty]);

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
      const baseListingData = {
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

      let updatedListing;

      if (isEditMode) {
        // Update existing listing - don't include owner_id
        console.log("=== NEW DEBUG VERSION ===");
        console.log("Editing property:", editProperty);
        console.log("Current user ID:", decodedToken.sub);
        console.log("Decoded token:", decodedToken);
        console.log("Property user_id:", editProperty.user_id);
        console.log("Property owner_id:", editProperty.owner_id);
        console.log("Full property object:", editProperty);
        
        // Check if user owns this property - use user_id instead of owner_id
        const propertyOwnerId = editProperty.user_id || editProperty.owner_id;
        console.log("Authorization check - Property Owner ID:", propertyOwnerId, "Current User ID:", parseInt(decodedToken.sub));
        
        // Temporarily disable frontend authorization check for debugging
        // if (propertyOwnerId !== parseInt(decodedToken.sub)) {
        //   alert("You can only edit your own properties!");
        //   setShowAddModal(false);
        //   setIsSubmitting(false);
        //   return;
        // }
        
        console.log("Sending update data:", baseListingData);
        
        // Don't send owner information in update - backend doesn't allow changing ownership
        console.log("Final update data for backend:", baseListingData);
        
        const updateResponse = await updateListing(
          token,
          editProperty.id,
          baseListingData
        );
        updatedListing = updateResponse.listing || updateResponse;

        // Update the existing listing in profile
        const updatedOwnedListings = profile.owned_listings.map((listing) =>
          listing.id === editProperty.id
            ? { ...listing, ...updatedListing }
            : listing
        );

        setProfile({
          ...profile,
          owned_listings: updatedOwnedListings,
        });

        console.log("Property updated successfully!");
      } else {
        // Create new listing - include owner_id for new listings
        const createListingData = {
          ...baseListingData,
          owner_id: parseInt(decodedToken.sub),
        };
        
        const listingResponse = await createListing(token, createListingData);
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

        // Add the new listing to profile
        updatedListing = {
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

        console.log("Property created successfully!");
      }

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
    } catch (error) {
      console.error(
        `Error ${isEditMode ? "updating" : "creating"} property:`,
        error
      );
      alert(
        `Failed to ${
          isEditMode ? "update" : "create"
        } property. Please try again.`
      );
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
              <h5 className="modal-title">
                {isEditMode ? "Edit Property" : "Add New Property"}
              </h5>
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
                {isSubmitting
                  ? isEditMode
                    ? "Updating..."
                    : "Creating..."
                  : isEditMode
                  ? "Update Property"
                  : "Add Property"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PropertyModal;
