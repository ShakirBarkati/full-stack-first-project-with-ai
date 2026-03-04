import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserLogin from '../components/user/UserLogin'
import UserRegister from '../components/user/UserRegister'
import FoodPartnerRegister from '../components/foodpartner/FoodPartnerRegister'
import FoodPartnerLogin from '../components/foodpartner/FoodPartnerLogin'
import Home from '../pages/Home'

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path="/user/register" element={<UserRegister />} />
                <Route path='/user/login' element={<UserLogin />} />
                <Route path='/user/logout' element={<h1>Log out</h1>} />
                <Route path='/foodpartner/register' element={<FoodPartnerRegister />} />
                <Route path='/foodpartner/login' element={<FoodPartnerLogin />} />
                <Route path='/foodpartner/logout' element={<h1>food partner logout</h1>} />
            </Routes>
        </Router>
    )
}

export default AppRoutes