import "./Auth.css";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FoodPartnerLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function userLoginFun(e) {
    e.preventDefault();
    const form = e.target;
    const { email, password } = form;

    if (!form.checkValidity()) {
      form.reportValidity();
      return
    }
    try {
      setIsLoading(true);
      Swal.fire({
        title: "Login in...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await axios.post(
        "http://localhost:3000/api/auth/user/login",
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
        title: `Login Successful ${response.data.user.userName}`,
        text: "Welcome Back ",
        confirmButtonColor: "#1d4ed8",
      });
      navigate("/");
    } catch (err) {
      console.log(err)
      Swal.close();
      await Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.response?.data?.message || "Unable to login",
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
          <h2>User login</h2>
          <p>
            login to your account.
          </p>
        </section>

        <section className="auth-card">
          <h1>User login</h1>

          <form onSubmit={userLoginFun}>
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
            Don&apos;t have an account? <Link to="/user/register">Register</Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
