import "./Auth.css";

const UserLogin = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>User Login</h2>

        <form>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
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