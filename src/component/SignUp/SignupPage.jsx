import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import supabase from '../auth/superbase';
import signup from '../auth/signup';

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isDuplicate, setDuplicate] = useState(false); // UI 업데이트용
    const [message, setMessage] = useState('');
    const [isLoading, setLoading] = useState(false); // 로딩 상태
    const navigate = useNavigate();

    // 이메일 중복 체크 함수
    const checkEmail = async (email) => {
        setLoading(true); // 로딩 시작
        try {
            const { data: userinfo, error } = await supabase
                .from('userinfo') // 중복 확인 테이블
                .select('id')
                .eq('email', email);

            if (error) {
                console.error('Error checking email:', error.message);
                setDuplicate(false); // UI 상태 업데이트
                return false;
            }

            const isDuplicate = userinfo.length > 0;
            setDuplicate(isDuplicate); // UI 상태 업데이트
            return isDuplicate;
        } catch (err) {
            console.error('Unexpected error checking email:', err);
            setDuplicate(false); // UI 상태 업데이트
            return false;
        } finally {
            setLoading(false); // 로딩 종료
        }
    };

    // 회원가입 처리 함수
    const handleSignup = async (e) => {
        e.preventDefault();

        // 비밀번호 확인
        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        // 이메일 중복 여부 확인
        const isEmailAvailable = !(await checkEmail(email)); // checkEmail 반환값 반전
        if (!isEmailAvailable) {
            setMessage('This email is already in use.');
            return;
        }

        // 회원가입 진행
        try {
            const { success, error } = await signup(email, password, nickname);

            if (success) {
                setMessage('Signup successful! Redirecting to login...');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setMessage(`Signup failed: ${error}`);
            }
        } catch (err) {
            console.error('Unexpected error during signup:', err);
            setMessage('Unexpected error occurred. Please try again.');
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-container">
                <div className="info-section">
                    <div className="logo-wrapper" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                        <img
                            src="/image/Logo/Logo_Nazgul.png"
                            alt="Logo"
                            className="logo"
                        />
                    </div>
                    <h1>Join Us</h1>
                    <p>Create an account to get started.</p>
                </div>
                <div className="form-section">
                    <form onSubmit={handleSignup}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={() => checkEmail(email)} // 실시간으로 확인
                                placeholder="Enter your email"
                                required
                            />
                            {isLoading ? (
                                <p className="loading-message">Checking email...</p>
                            ) : isDuplicate ? (
                                <p className="error-message">This email is already in use.</p>
                            ) : email && (
                                <p className="success-message">This email is available.</p>
                            )}
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
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nickname">User Name</label>
                            <input
                                type="text"
                                id="nickname"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="imageUrl">Image URL</label>
                            <input
                                type="text"
                                id="imageUrl"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="Enter your profile image URL"
                            />
                        </div>
                        <div className="form-message">{message && <p>{message}</p>}</div>
                        <button type="submit" className="button signup-button">Sign Up</button>
                        <button
                            type="button"
                            className="button login-button"
                            onClick={() => navigate('/login')}
                        >
                            Back to Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
