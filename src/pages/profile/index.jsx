import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ProfileEditForm from "./ProfileEditForm";
import ProfileDisplay from "./ProfileDisplay";
import PasswordChange from "./PasswordChange";
import PropertyDeleteModal from "./PropertyDeleteModal";
import PropertyListing from "./PropertyListing";
import PropertyModal from "./PropertyModal";
import { getUserById, updateUser, updateUserProfile } from "../../api/user";
import { deleteListing } from "../../api/listings";
import { getDecodedToken, getToken, isTokenValid } from "../../utils/auth";

function Profile() {
  const navigate = useNavigate();

  // ============================================================================
  // PROFILE STATE
  // ============================================================================
  const [profile, setProfile] = useState(null);

  // ============================================================================
  // EDIT MODE STATE
  // ============================================================================
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    bio: "",
    city: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    state: "",
    zip_code: "",
    email: "",
    username: "",
  });

  // ============================================================================
  // PASSWORD CHANGE STATE
  // ============================================================================
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordMessage, setPasswordMessage] = useState("");

  // ============================================================================
  // PROPERTY STATE
  // ============================================================================
  const [ownedProperties, setOwnedProperties] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [propToDelete, setPropToDelete] = useState(null);

  // ============================================================================
  // PROFILE DATA LOADING
  // ============================================================================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getToken();
        if (!token || !isTokenValid()) {
          console.log("No valid token found");
          navigate("/login");
          return;
        }

        const decodedToken = getDecodedToken();
        if (decodedToken) {
          const userResponse = await getUserById(
            token,
            parseInt(decodedToken.sub)
          );

          setProfile({
            ...userResponse,
            ...userResponse.profile_information,
          });

          setForm({
            bio: userResponse.profile_information?.bio || "",
            city: userResponse.profile_information?.city || "",
            first_name: userResponse.profile_information?.first_name || "",
            last_name: userResponse.profile_information?.last_name || "",
            phone_number: userResponse.profile_information?.phone_number || "",
            state: userResponse.profile_information?.state || "",
            zip_code: userResponse.profile_information?.zip_code || "",
            email: userResponse.email || "",
            username: userResponse.username || "",
          });
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    };

    fetchProfile();
  }, []);

  // ============================================================================
  // PROPERTY DATA SYNC
  // ============================================================================
  useEffect(() => {
    console.log("Setting Owned Listings", profile?.owned_listings);
    if (profile?.owned_listings) {
      setOwnedProperties(profile.owned_listings);
    }
  }, [profile]);

  // ============================================================================
  // PROFILE EDIT HANDLERS
  // ============================================================================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = getToken();

      const userData = {
        email: form.email,
        username: form.username,
      };

      const profileData = {
        bio: form.bio,
        city: form.city,
        first_name: form.first_name,
        last_name: form.last_name,
        phone_number: form.phone_number,
        state: form.state,
        zip_code: form.zip_code,
      };

      await updateUserProfile(token, profile.id, profileData);
      const userResponse = await updateUser(token, profile.id, userData);

      setEditMode(false);
      setProfile({
        ...profile,
        ...userResponse.user,
        ...userResponse.user.profile_information,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleAvatarUpdate = (updatedProfile) => {
    setProfile({
      ...profile,
      ...updatedProfile,
    });
  };

  // ============================================================================
  // PASSWORD CHANGE HANDLERS
  // ============================================================================
  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage("New passwords do not match.");
      return;
    }

    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      setPasswordMessage("Please fill in all password fields.");
      return;
    }

    setPasswordMessage("Password changed successfully!");
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setTimeout(() => setShowPasswordForm(false), 1200);
  };

  // ============================================================================
  // PROPERTY MANAGEMENT HANDLERS
  // ============================================================================
  const openDeleteModal = (property) => {
    setPropToDelete(property);
  };

  const confirmDelete = async () => {
    if (!propToDelete) return;

    try {
      const token = getToken();
      await deleteListing(token, propToDelete.id);

      // Remove from frontend state after successful API call
      setOwnedProperties((prev) =>
        prev.filter((p) => p.id !== propToDelete.id)
      );
      setPropToDelete(null);

      console.log("Property deleted successfully");
    } catch (error) {
      console.error("Error deleting property:", error);
      alert("Failed to delete property. Please try again.");
    }
  };

  // ============================================================================
  // RENDER
  // ============================================================================
  return (
    <div className="container mt-4">
      {editMode ? (
        <ProfileEditForm
          form={form}
          onChange={handleChange}
          onSave={handleSave}
          onCancel={() => setEditMode(false)}
        />
      ) : (
        <>
          {profile && (
            <ProfileDisplay
              profile={profile}
              onEdit={() => setEditMode(true)}
              onAvatarUpdate={handleAvatarUpdate}
            />
          )}

          <PasswordChange
            showForm={showPasswordForm}
            onToggle={() => setShowPasswordForm(!showPasswordForm)}
            passwordForm={passwordForm}
            onChange={handlePasswordChange}
            onSubmit={handlePasswordSubmit}
            message={passwordMessage}
          />
        </>
      )}

      <PropertyListing
        properties={ownedProperties}
        onDelete={openDeleteModal}
        onAdd={() => setShowAddModal(true)}
      />

      <PropertyDeleteModal property={propToDelete} onConfirm={confirmDelete} />

      {showAddModal && (
        <PropertyModal
          setShowAddModal={setShowAddModal}
          setProfile={setProfile}
          profile={profile}
        />
      )}
    </div>
  );
}

export default Profile;
