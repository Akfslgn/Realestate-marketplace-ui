import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { loginUser, registerUser } from "../../api/auth";
import { useGlobalStore } from "../../hooks/useGlobalStore";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { store, dispatch } = useGlobalStore();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login data:", formData);
    dispatch({ type: "AUTH_START" });

    try {
      console.log("Trying Login...");
      const data = await loginUser(formData);
      dispatch({ type: "AUTH_SUCCESS", payload: data });
      console.log("Login Success Navigating Home...");
      navigate("/home");
    } catch (e) {
      console.log("Cought an error:", e.message);
      dispatch({ type: "AUTH_FAILURE", payload: e.message });
    }
  };

  const handleDemoLogin = async () => {
    const demoCredentials = {
      email: "qwerty@gmail.com",
      password: "123456",
    };

    dispatch({ type: "AUTH_START" });

    try {
      console.log("Trying Demo Login...");
      const data = await loginUser(demoCredentials);
      dispatch({ type: "AUTH_SUCCESS", payload: data });
      console.log("Demo Login Success Navigating Home...");
      navigate("/home");
    } catch (e) {
      console.log("Demo login error:", e.message);
      dispatch({ type: "AUTH_FAILURE", payload: e.message });
    }
  };

  return (
    <div className="bg-light min-vh-100">
      <div className="container py-4">
        <h2 className="mb-4 text-center">Login Page</h2>

        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card border shadow-sm">
              <div className="card-body p-4">
                <h3 className="text-center mb-4">Login</h3>

                <form onSubmit={handleSubmit}>
                  {/* Email Address */}
                  <div className="mb-3">
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

                  {/* Password */}
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {store.auth.error ? (
                    <div id="passwordHelpBlock m-2" class="form-text">
                      {store.auth.error}
                    </div>
                  ) : (
                    ""
                  )}
                  {/* Login Button */}
                  <div className="d-flex flex-column gap-2 mt-4">
                    <button type="submit" className="btn btn-primary px-4">
                      Login
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary px-4"
                      onClick={handleDemoLogin}
                      disabled={store.auth.loading}
                    >
                      Demo Login
                    </button>
                  </div>

                  {/* Registration Link */}
                  <div className="text-center mt-3">
                    <p className="mb-0">
                      Don't have an account? <Link to="/signup">Register</Link>
                    </p>
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

export default Login;
