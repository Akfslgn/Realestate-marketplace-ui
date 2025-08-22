import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { registerUser } from "../../api/auth";
import { isValidPassword } from "../../utils/helpers";

const Registration = () => {
  const navigate = useNavigate();
  const [showError, setShowError] = useState({ show: false, message: null });

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Payload data:", formData);
      if (!isValidPassword(formData.password)) {
        setShowError({
          show: true,
          message:
            "Password should be 5 characters or more and have at least one digit.",
        });
      }
      await registerUser(formData);
      navigate("/login");
    } catch (e) {
      console.error("Registration error:", e.message);
      setShowError({
        show: true,
        message: e.message,
      });
    }
  };

  return (
    <div className="bg-light min-vh-100">
      <div className="container py-4">
        <h2 className="mb-4 text-center">Registration Page</h2>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card border shadow-sm">
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    {/* Email Address */}
                    <div className="col-md-6">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email Address"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Username */}
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Password */}
                    <div className="col-12">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        aria-describedby="passwordHelpBlock"
                        required
                      />
                    </div>

                    {/* Confirm Password */}
                    <div className="col-12">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <>
                      {showError.show ? (
                        <div id="passwordHelpBlock m-2" class="form-text">
                          {showError.message}
                        </div>
                      ) : (
                        ""
                      )}
                    </>
                    {/* Submit Button */}
                    <div className="col-12 d-flex justify-content-center mt-4">
                      <button type="submit" className="btn btn-primary px-4">
                        Register
                      </button>
                    </div>

                    {/* Login Link */}
                    <div className="col-12 text-center mt-3">
                      <p className="mb-0">
                        Already have an account? <Link to="/login">Login</Link>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
