import "./style.css";


const FoodPartnerRegister = () => {
    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Food Partner Register</h2>

                <form>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" placeholder="Enter username" />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="Enter email" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="Enter password" />
                    </div>

                    <button type="submit" className="auth-btn">
                        FoodPartnerRegister
                    </button>
                </form>

                <p className="auth-footer">
                    Already have an account? <span>Login</span>
                </p>
            </div>
        </div>
    );
};

export default FoodPartnerRegister;