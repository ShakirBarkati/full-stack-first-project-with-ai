import "./Style.css";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FoodPartnerRegister = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function FoodPartnerRegisterFun(e) {
    e.preventDefault();

    const { name, email, contactName, contactNumber, address, password } =
      e.target;
    const payload = {
      name: name.value.trim(),
      email: email.value.trim(),
      contactName: contactName.value.trim(),
      contactNumber: contactNumber.value.trim(),
      address: address.value.trim(),
      password: password.value,
    };

    try {
      setIsLoading(true);
      Swal.fire({
        title: "Creating account...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await axios.post("http://localhost:3000/api/foodpartner/register", payload, {
        withCredentials: true,
      });

      Swal.close();
      await Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "Your food partner account has been created.",
        confirmButtonColor: "#1d4ed8",
      });
      navigate("/foodpartner/login");
    } catch (err) {
      Swal.close();
      await Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.response?.data?.message || "Unable to register",
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
          <h2>Grow Your Business With Faster Orders</h2>
          <p>
            Create your food partner account and start receiving orders with a
            clean, easy-to-manage dashboard.
          </p>
        </section>

        <section className="auth-card">
          <h1>Food Partner Register</h1>

          <form onSubmit={FoodPartnerRegisterFun}>
            <div className="form-grid">
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Enter business name" name="name" required />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Enter your email" name="email" required />
              </div>

              <div className="form-group">
                <label>Contact Name</label>
                <input
                  type="text"
                  placeholder="Enter contact person name"
                  name="contactName"
                  required
                />
              </div>

              <div className="form-group">
                <label>Contact Number</label>
                <input type="tel" placeholder="Enter contact number" name="contactNumber" required />
              </div>

              <div className="form-group form-group-full">
                <label>Address</label>
                <input type="text" placeholder="Enter your full address" name="address" required />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input type="password" placeholder="Enter your password" name="password" required />
              </div>
            </div>

            <button type="submit" className="auth-btn" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="auth-footer">
            Already have an account? <Link to="/foodpartner/login">Login</Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
