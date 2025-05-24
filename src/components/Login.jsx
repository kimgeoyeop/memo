import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

function Login({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/api/users/login", formData);
      const token = res.data.token;
      localStorage.setItem("token", token);
      // 로그인 성공 후 유저 정보 호출
      const userRes = await api.get("/api/users/me");
      onLoginSuccess(userRes.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "로그인 실패");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h2 className="mb-4">로그인</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button type="submit" className="w-100">
          로그인
        </Button>
      </Form>
    </div>
  );
}

export default Login;
