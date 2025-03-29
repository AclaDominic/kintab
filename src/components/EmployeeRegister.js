import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import { CheckCircle } from "lucide-react";

const EmployeeRegister = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "employee" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
    
        try {
            // Register the employee
            const response = await axios.post("http://127.0.0.1:8000/api/register", formData, {
                headers: { "Content-Type": "application/json" }
            });
    
            // Store token
            localStorage.setItem("token", response.data.token);
    
            // Force state update to reflect login immediately
            window.dispatchEvent(new Event("storage"));
    
            setSuccess("Registration successful! Redirecting...");
            setTimeout(() => navigate("/employee-dashboard"), 1000);
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };
    

    return (
        <div className="login-background d-flex justify-content-center align-items-center">
            <div className="login-card card p-4 shadow-lg">
                <h2 className="text-center mb-3">Employee Registeration</h2>
                {error && <p className="alert alert-danger">{error}</p>}
                {success && (
                    <div className="alert alert-success d-flex align-items-center justify-content-center">
                        <CheckCircle className="me-2" size={20} />
                        {success}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="form-control" />
                    </div>
                    <div className="mb-3">
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="form-control" />
                    </div>
                    <div className="mb-3">
                        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Register</button>
                </form>
                <p className="text-center mt-3">Already have an account? <Link to="/login">Login here</Link></p>
            </div>
        </div>
    );
};

export default EmployeeRegister;
