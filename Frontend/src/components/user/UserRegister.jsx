import "./Auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {

  const navigate = useNavigate();
  async function sendData(name, email, password) {
    const response = await axios.post("http://localhost:3000/api/auth/user/register", {
      fullName: name,
      email: email,
      password: password
    }, {
      withCredentials: true
    })
    console.log(response.data)
    navigate("/");

  }

  function isEmailValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isPasswordValid(password, confirmPassword) {

    if (password !== confirmPassword) {
      return "Passwords do not match";
    }

    if (password.length < 6 || password.length > 20) {
      return "Password must be between 6 and 20 characters";
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/;

    if (!passwordRegex.test(password)) {
      return "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }

    return null; // means valid
  }

  function handleSubmit(event) {
    event.preventDefault();

    const name = event.target.fullName.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    const emailValid = isEmailValid(email);
    const passwordError = isPasswordValid(password, confirmPassword);

    if (!emailValid) {
      alert("Invalid email");
      return;
    }

    if (passwordError) {
      alert(passwordError);
      return;
    }

    sendData(name, email, password);
  }
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>User Register</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter username" name="fullName" />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter email" name="email" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter password" name="password" />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="Enter password" name="confirmPassword" />
          </div>

          <button type="submit" className="auth-btn">
            UserRegister
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <span>Login</span>
        </p>
      </div>
    </div>
  );
};

export default UserRegister;