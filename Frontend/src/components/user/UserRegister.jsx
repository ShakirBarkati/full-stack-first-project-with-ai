import "./Auth.css";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FoodPartnerLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  function confirmPasswordFun(password, confirmPassword) {
    if (password.value === "" || confirmPassword.value === "") {
      return;
    }
    if (password.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity("Passwords don't match");

    } else {
      confirmPassword.setCustomValidity("");
    }
  }
  async function userRegisterFun(e) {
    e.preventDefault();
    const form = e.target;
    const { fullName, email, password, confirmPassword } = form;
    confirmPasswordFun(password, confirmPassword)
    if (!form.checkValidity()) {
      form.reportValidity();
      return
    }
    try {
      setIsLoading(true);
      Swal.fire({
        title: "Register in...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await axios.post(
        "http://localhost:3000/api/auth/user/register",
        {
          fullName: fullName.value.trim(),
          email: email.value.trim(),
          password: password.value,
        },
        {
          withCredentials: true,
        }
      );

      Swal.close();
      await Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "Welcome to the User Portal.",

        confirmButtonColor: "#1d4ed8",
      });
      navigate("/");
    } catch (err) {
      Swal.close();
      console.log("Server Err", err.response.data);
      await Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.response?.data?.message || "Unable to register",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-layout">
        <section className="auth-visual">
          <p className="auth-badge">User Portal</p>
          <h2>User Register</h2>
          <p>
            Register to your account.
          </p>
        </section>

        <section className="auth-card">
          <h1>User Register</h1>

          <form onSubmit={userRegisterFun}>
            <div className="form-grid">
              <div className="form-group form-group-full">
                <label>Full Name</label>
                <input type="text" placeholder="Enter your full name" name="fullName" required />
              </div>
              <div className="form-group form-group-full">
                <label>Email</label>
                <input type="email" placeholder="Enter your email" name="email" required />
              </div>

              <div className="form-group form-group-full">
                <label>Password</label>
                <input type="password" placeholder="Enter your password" name="password" required />
              </div>
              <div className="form-group form-group-full">
                <label>Confirm Password</label>
                <input type="password" placeholder="Re-enter your password" name="confirmPassword" required />
              </div>
            </div>

            <button type="submit" className="auth-btn" disabled={isLoading}>
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <p className="auth-footer">
            I already have an account. <Link to="/foodpartner/login">Log in</Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
