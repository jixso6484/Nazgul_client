import React, { useEffect, useState } from "react";
import "./Header.css";
import checkLoginStatus from "../auth/checkLogin"

const Header = () => {
    const [formState, setFormState] = useState({
        searchQuery: "", // 검색어 상태 추가
        username: "",
        isLoggedIn: false,
    });

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Search query:", formState.searchQuery); // 검색어 출력
    };

    useEffect(() => {
        const State = checkLoginStatus();
        setFormState((prevState) => ({
            ...prevState,
            isLoggedIn: State,
        }));
    }, []);

    return (
        <header className="header">
            <div className="header-container">
                {/* 로고: 홈으로 이동 */}
                <a href="/" className="logo">
                    <img src="/image/Logo/Logo_Nazgul.png" alt="Nazgul Logo" className="logo-image" />
                </a>

                {/* 검색창 */}
                <form className="search-form" onSubmit={handleSearch}>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search..."
                        value={formState.searchQuery} // 상태에서 검색어 가져오기
                        onChange={(e) =>
                            setFormState((prevState) => ({
                                ...prevState,
                                searchQuery: e.target.value, // 검색어 업데이트
                            }))
                        }
                    />
                    <button type="submit" className="search-button">Search</button>
                </form>

                {/* 내비게이션 메뉴 */}
                <nav className="nav">
                    <ul className="nav-list">
                        {/* ShortPage 경로로 이동 */}
                        <li className="nav-item">
                            <a href="/shorts" className="nav-link">Nazgul</a>
                        </li>
                        {/* 서비스 섹션으로 스크롤 */}
                        <li className="nav-item">
                            <a href="#services" className="nav-link">인기글</a>
                        </li>
                        {/* 게시판 섹션으로 스크롤 */}
                        <li className="nav-item">
                            <a href="#content" className="nav-link">게시판</a>
                        </li>
                        {/* 로그인 페이지로 이동 */}
                        <li className="nav-item">
                            <a href="/login" className="nav-link">
                                {formState.isLoggedIn ? (
                                    <img src="/image/Login_out/login.png" alt="Logged In" />
                                ) : (
                                    <img src="/image/Login_out/logout.png" alt="Logged Out" />
                                )}
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;