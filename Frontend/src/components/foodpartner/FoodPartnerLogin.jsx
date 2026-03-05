import "./Style.css";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FoodPartnerLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function foodPartnerLoginFun(e) {
    e.preventDefault();

    const { email, password } = e.target;
    try {
      setIsLoading(true);
      Swal.fire({
        title: "Signing in...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await axios.post(
        "http://localhost:3000/api/foodpartner/login",
        {
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
        title: "Login Successful",
        text: "Welcome back.",
        confirmButtonColor: "#1d4ed8",
      });
      navigate("/");
    } catch (err) {
      Swal.close();
      await Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.response?.data?.message || "Unable to login",
        confirmButtonColor: "#dc2626",
      });
      console.log("Server Err", err.response?.data);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-layout">
        <section className="auth-visual">
          <p className="auth-badge">Partner Portal</p>
          <h2>Manage Orders, Menus, and Deliveries</h2>
          <p>
            Login to your food partner account to track orders and keep your
            restaurant operations smooth.
          </p>
        </section>

        <section className="auth-card">
          <h1>Food Partner Login</h1>

          <form onSubmit={foodPartnerLoginFun}>
            <div className="form-grid">
              <div className="form-group form-group-full">
                <label>Email</label>
                <input type="email" placeholder="Enter your email" name="email" required />
              </div>

              <div className="form-group form-group-full">
                <label>Password</label>
                <input type="password" placeholder="Enter your password" name="password" required />
              </div>
            </div>

            <button type="submit" className="auth-btn" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="auth-footer">
            Don&apos;t have an account? <Link to="/foodpartner/register">Register</Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
