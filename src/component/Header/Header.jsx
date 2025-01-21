// src/components/Header.jsx
import React, { useEffect, useState, useRef } from 'react';
import './Header.css';
import checkLoginStatus from '../auth/checkLogin';
import logout from '../auth/logout';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
  };

  useEffect(() => {
    let isSubscribed = true; // 컴포넌트가 마운트 상태인지 추적

    const fetchLoginStatus = async () => {
      try {
        const user = await checkLoginStatus();
        if (isSubscribed) {
          setIsLoggedIn(!!user);
        }
      } catch (error) {
        console.error('로그인 상태 확인 중 오류 발생:', error);
      }
    };

    fetchLoginStatus();

    return () => {
      isSubscribed = false; // 컴포넌트 언마운트 시 상태 업데이트 방지
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout(); // 로그아웃 API 호출
      setIsLoggedIn(false); // 상태 업데이트
      console.log('로그아웃 완료');
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };
  
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <a href="/" className="logo">
          <img src="/image/Logo/Logo_Nazgul.png" alt="Nazgul Logo" className="logo-image" />
        </a>

        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">Search</button>
        </form>

        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="/shorts" className="nav-link">Nazgul</a>
            </li>
            <li className="nav-item">
              <a href="#services" className="nav-link">인기글</a>
            </li>
            <li className="nav-item">
              <a href="#content" className="nav-link">게시판</a>
            </li>
            <li className="nav-item dropdown-container">
              {isLoggedIn ? (
                <div className="dropdown" ref={dropdownRef} onMouseLeave={closeDropdown}>
                  <img
                    src="/image/Login_out/login.png"
                    alt="Logged In"
                    className="nav-link dropdown-trigger"
                    onClick={toggleDropdown}
                  />
                  {isDropdownOpen && (
                    <div
                        className={`dropdown-menu ${isDropdownOpen ? 'active' : ''}`}
                        style={{ top: dropdownRef.current?.offsetHeight + 'px' }}
                    >
                        <a href="/profile" className="dropdown-item">프로필</a>
                        <a href="/settings" className="dropdown-item">설정</a>
                        <a href="#!" className="dropdown-item" onClick={handleLogout}>로그아웃</a>
                    </div>
                )}

                </div>
              ) : (
                <a href="/login" className="nav-link">
                  <img
                    src="/image/Login_out/logout.png"
                    alt="Logged Out"
                  />
                </a>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
