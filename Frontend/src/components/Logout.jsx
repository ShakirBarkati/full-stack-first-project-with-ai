import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Logout = () => {
    const navigate = useNavigate();
    async function logoutFun() {
        await axios.get("http://localhost:3000/api/auth/user/logout", {
            withCredentials: true
        })
        localStorage.clear();
        navigate("/user/login");
    }
    return (
        <button onClick={logoutFun}>Logout</button>
    )
}

export default Logout