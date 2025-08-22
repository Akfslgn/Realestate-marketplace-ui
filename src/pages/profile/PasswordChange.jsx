function PasswordChange({
  showForm,
  onToggle,
  passwordForm,
  onChange,
  onSubmit,
  message,
}) {
  return (
    <>
      <button className="btn btn-outline-secondary" onClick={onToggle}>
        {showForm ? "Cancel Password Change" : "Change Password"}
      </button>
      {showForm && (
        <form className="mt-3" onSubmit={onSubmit}>
          <input
            className="form-control mb-2"
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={passwordForm.currentPassword}
            onChange={onChange}
          />
          <input
            className="form-control mb-2"
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={passwordForm.newPassword}
            onChange={onChange}
          />
          <input
            className="form-control mb-2"
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={passwordForm.confirmPassword}
            onChange={onChange}
          />
          <button className="btn btn-primary" type="submit">
            Change Password
          </button>
          {message && <div className="mt-2">{message}</div>}
        </form>
      )}
    </>
  );
}

export default PasswordChange;
