import { uploadProfileImage } from "../../api/user";
import { getToken } from "../../utils/auth";
import { useNavigate } from "react-router";
import { useGlobalStore } from "../../hooks/useGlobalStore";

function ProfileDisplay({ profile, onEdit, onAvatarUpdate }) {
  const navigate = useNavigate();
  const { dispatch } = useGlobalStore();

  const handleLogOut = () => {
    console.log("Logging out...");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const token = getToken();
      const response = await uploadProfileImage(token, profile.id, file);
      onAvatarUpdate(response.profile);
      console.log("Avatar uploaded successfully.");
    } catch (e) {
      console.error("Error uploading avatar:", e);
      alert("Failed to upload avatar. Please try again");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="my-3 fw-bold">Profile</h2>
        <div className="d-flex gap-2">
          <button className="btn btn-primary" onClick={onEdit}>
            Edit Profile
          </button>
          <button className="btn btn-outline-danger" onClick={handleLogOut}>
            Log Out
          </button>
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-body">
          <div className="d-flex align-items-center mb-3">
            <div className="me-4">
              <label htmlFor="avatar-upload" style={{ cursor: "pointer" }}>
                <img
                  src={profile.avatar_url || "https://via.placeholder.com/150"}
                  alt="Profile Avatar"
                  className="rounded-circle"
                  style={{
                    width: "120px",
                    height: "120px",
                    border: "2px solid black",
                    objectFit: "cover",
                    transition: "opacity 0.2s",
                  }}
                  onMouseOver={(e) => (e.target.style.opacity = "0.8")}
                  onMouseOut={(e) => (e.target.style.opacity = "1")}
                  title="Click to change avatar"
                />
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                style={{ display: "none" }}
              />
            </div>

            <div>
              <p className="mb-1">
                <strong>
                  {profile.first_name} {profile.last_name}
                </strong>
              </p>
              <p className="mb-0 text-muted">{profile.email}</p>
            </div>
          </div>
          <p>
            <strong>Username:</strong> {profile.username}
          </p>
          <p>
            <strong>Phone Number:</strong> {profile.phone_number}
          </p>
          <p>
            <strong>Bio:</strong> {profile.bio}
          </p>
          <p>
            <strong>City:</strong> {profile.city}
          </p>
          <p>
            <strong>State:</strong> {profile.state}
          </p>
          <p>
            <strong>Zip Code:</strong> {profile.zip_code}
          </p>
        </div>
      </div>
    </>
  );
}

export default ProfileDisplay;
