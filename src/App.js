import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "./api/axiosInstance";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import { getToken } from "./utils/token"; // 토큰 유틸
import CreatePost from "./components/CreatePost"; // 추가

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [user, setUser] = useState(null); // 로그인한 유저 정보 저장

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/api/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("카테고리 불러오기 실패:", err);
      }
    };

    fetchCategories();
  }, []);

  // 로그인 상태 체크 (토큰 있을 때 /api/users/me 호출해서 유저 정보 가져오기)
  useEffect(() => {
    const fetchUser = async () => {
      const token = getToken();
      if (!token) {
        setUser(null);
        return;
      }

      try {
        const res = await api.get("/api/users/me");
        setUser(res.data); // { email, nickname, role, ... }
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  // 로그인 시 호출하는 함수 (Login 컴포넌트에서 호출할 예정)
  const handleLogin = (userData) => {
    setUser(userData);
  };

  // 로그아웃 함수
  const handleLogout = () => {
    localStorage.removeItem("token"); // 토큰 제거
    setUser(null);
  };

  return (
    <Router>
      <Navbar
        categories={categories}
        onSelectCategory={setSelectedCategoryId}
        user={user}
        onLogout={handleLogout}
      />
      <div className="container mt-4">
        <Routes>
          <Route
            path="/"
            element={<PostList categoryId={selectedCategoryId} />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login onLoginSuccess={handleLogin} />}
          />
          <Route path="/posts/new" element={<CreatePost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
