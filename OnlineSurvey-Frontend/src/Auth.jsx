// LoginRegisterPanel.jsx
import React, { useState } from "react";
import "./Auth.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CloseIcon from "./assets/icon-close.png"

const Auth = (props) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();



    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isRegistering ? "/auth/register" : "/auth/login";
        try {
            const res = await axios.post(`http://localhost:8080${endpoint}`, form, {
                withCredentials: true,
            });
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("email", res.data.email)
            navigate("/panel")
        } catch (err) {
            alert(err.response?.data || "Błąd logowania/rejestracji");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div id="exit-container">
                    <button onClick={() => props.handleEnterLogin()}><img src={CloseIcon} alt="Close icon" /> </button>
                </div>
                <h2>{isRegistering ? "Registration" : "Login"}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Hasło"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">
                        {isRegistering ? "Sing up" : "Log in"}
                    </button>
                </form>
                <p onClick={() => setIsRegistering(!isRegistering)} className="toggle-mode">
                    {isRegistering
                        ? "Already have an account? Sign in."
                        : "Don't have an account? Sign up."}
                </p>
            </div>
        </div>
    );
};

export default Auth;
