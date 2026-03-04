import "./Auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const UserLogin = () => {
  const navigate = useNavigate();
  async function loginFun(e) {
    e.preventDefault();
    const { email, password } = e.target;
    try {
      console.log(email.value)
      console.log(password.value)
      const response = await axios.post("http://localhost:3000/api/auth/user/login", {
        email: email.value,
        password: password.value
      }, {
        withCredentials: true
      })
      console.log(response.data.message)
      navigate("/");
    } catch (err) {
      console.log("Server err", err.response?.data);
    }

  }
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>User Login</h2>

        <form onSubmit={loginFun}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" name="email" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" name="password" />
          </div>

          <button type="submit" className="auth-btn">
            UserLogin
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <span>Register</span>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;