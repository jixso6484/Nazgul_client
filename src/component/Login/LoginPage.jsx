import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router를 사용
import './Login.css'; // 스타일을 위한 CSS 파일
import login from '../auth/login'; // login 함수 가져오기

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // 네비게이트 훅

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await login(email, password); // login 함수 호출

      if (result.success) {
        console.log('로그인 성공!');
        navigate('/dashboard'); // 로그인 성공 후 대시보드로 이동
      } else {
        console.error('로그인 실패:', result.error);
        alert('로그인 실패: ' + result.error);
      }
    } catch (err) {
      console.error('예기치 않은 오류 발생:', err.message);
      alert('로그인 중 오류가 발생했습니다.');
    }
  };

  const goToHome = () => {
    navigate('/'); // 메인 화면으로 이동
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="info-section">
          <div
            className="logo-wrapper"
            onClick={goToHome}
            style={{ cursor: 'pointer' }}
          >
            <img
              src="/image/Logo/Logo_Nazgul.png"
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
            <button type="submit" className="button login-button">
              Login
            </button>
            <button
              type="button"
              className="button register-button"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </button>
            <a href="/forgot-password" className="forgot-password">
              Forgot password?
            </a>
          </form>
          <div className="social-login-buttons">
            <button className="discord-login">
              <img
                src="/path-to-discord-icon/discord.png"
                alt="Discord Icon"
              />
              Sign in with Discord
            </button>
            <button className="twitch-login">
              <img
                src="/path-to-twitch-icon/twitch.png"
                alt="Twitch Icon"
              />
              Sign in with Twitch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
