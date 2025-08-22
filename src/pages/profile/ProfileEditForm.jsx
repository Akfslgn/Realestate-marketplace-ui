function ProfileEditForm({ form, onChange, onSave, onCancel }) {
  return (
    <>
      <div className="mb-2">
        <label className="form-label">Username</label>
        <input
          className="form-control"
          name="username"
          type="text"
          value={form.username}
          onChange={onChange}
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Email</label>
        <input
          className="form-control"
          name="email"
          value={form.email}
          onChange={onChange}
        />
      </div>
      <div className="mb-2">
        <label className="form-label">First Name</label>
        <input
          className="form-control"
          name="first_name"
          value={form.first_name}
          onChange={onChange}
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Last Name</label>
        <input
          className="form-control"
          name="last_name"
          value={form.last_name}
          onChange={onChange}
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Phone Number</label>
        <input
          className="form-control"
          name="phone_number"
          value={form.phone_number}
          onChange={onChange}
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Bio</label>
        <textarea
          className="form-control"
          name="bio"
          value={form.bio}
          onChange={onChange}
        />
      </div>
      <div className="mb-2">
        <label className="form-label">City</label>
        <input
          className="form-control"
          name="city"
          value={form.city}
          onChange={onChange}
        />
      </div>
      <div className="mb-2">
        <label className="form-label">State</label>
        <input
          className="form-control"
          name="state"
          value={form.state}
          onChange={onChange}
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Zip Code</label>
        <input
          className="form-control"
          name="zip_code"
          value={form.zip_code}
          onChange={onChange}
        />
      </div>
      <button className="btn btn-success me-2" onClick={onSave}>
        Save
      </button>
      <button className="btn btn-secondary me-2" onClick={onCancel}>
        Cancel
      </button>
    </>
  );
}

export default ProfileEditForm;
