import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router를 사용

import './Login.css'; // 스타일을 위한 CSS 파일

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // 네비게이트 훅

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email, 'Password:', password);
    };

    const goToHome = () => {
        navigate('/'); // 메인 화면으로 이동
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="info-section">
                    <div className="logo-wrapper" onClick={goToHome} style={{ cursor: 'pointer' }}>
                        <img
                            src="/path-to-your-logo/logo.png"
                            alt="Logo"
                            className="logo"
                        />
                    </div>
                    <h1>Welcome Back</h1>
                    <p>Enter your credentials to access your account.</p>
                </div>
                <div className="form-section">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <button type="submit" className="button login-button">Login</button>
                        <button
                            type="button"
                            className="button register-button"
                            onClick={() => navigate('/signup')} // 회원가입 페이지로 이동
                        >
                            Sign Up
                        </button>
                        <a href="/forgot-password" className="forgot-password">Forgot password?</a>
                    </form>
                    <div className="social-login-buttons">
                        <button className="discord-login">
                            <img src="/path-to-discord-icon/discord.png" alt="Discord Icon" />
                            Sign in with Discord
                        </button>
                        <button className="twitch-login">
                            <img src="/path-to-twitch-icon/twitch.png" alt="Twitch Icon" />
                            Sign in with Twitch
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
