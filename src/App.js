import './App.css';
import Header from './component/Header/Header.jsx';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './component/Login/LoginPage.jsx';

const Header_out = ({ children }) => {
    const location = useLocation(); // useLocation 훅 사용
    const isLoginPage = location.pathname === "/login";

    return (
        <div>
            {!isLoginPage && <Header />} {/* 로그인 페이지가 아니면 Header를 렌더링 */}
            {children}
        </div>
    );
};

function App() {
    return (
        <Router> {/* 반드시 Router로 래핑 */}
            <Header_out>
                <Routes>
                    <Route path="/login" element={<LoginPage />} /> {/* element 속성으로 컴포넌트 전달 */}
                </Routes>
            </Header_out>
        </Router>
    );
}

export default App;
