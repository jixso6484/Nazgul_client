import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Login 스타일 가져오기

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email, 'Password:', password);
        // 로그인 처리 로직 추가
    };

    const navigateToHome = () => {
        navigate('/'); // 메인 페이지로 이동
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="logo-container" onClick={navigateToHome}>
                    <img
                        src="/image/Logo/Logo_Nazgul.png" // 로고 이미지 경로
                        alt="Nazgul Logo"
                        className="logo"
                    />
                </div>
                <h2 className="login-title">Hi!</h2>
                <p className="login-subtitle">Nine for Mortal Men doomed to die</p>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="form-options">
                        <label className="remember-me">
                            <input type="checkbox" /> Remember for 30 days
                        </label>
                        <a href="/forgot-password" className="forgot-password">Forgot password</a>
                    </div>
                    <button type="submit" className="login-button">Sign in</button>
                </form>
                <button className="google-login-button">
                    <img src="/path-to-google-icon/google-icon.png" alt="Google" />
                    Sign in with Google
                </button>
                <p className="signup-text">
                    Don’t have an account? <a href="/signup">Sign up</a>
                </p>
            </div>
            <div className="visual-section">
                <div className="circle"></div>
            </div>
        </div>
    );
};

export default LoginPage;
