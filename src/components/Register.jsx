import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance"; // 공통 axios 인스턴스 import 경로 확인

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "", // 닉네임 필드 추가
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    api
      .post("/api/users/register", {
        email: formData.email,
        password: formData.password,
        nickname: formData.nickname, // 닉네임 포함
      })
      .then(() => {
        alert("회원가입 성공! 로그인 페이지로 이동합니다.");
        navigate("/login");
      })
      .catch((err) => {
        setError(err.response?.data?.message || "회원가입 실패");
      });
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h2 className="mb-4">회원가입</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="이메일을 입력하세요"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formNickname">
          <Form.Label>닉네임</Form.Label>
          <Form.Control
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="닉네임을 입력하세요"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="비밀번호를 다시 입력하세요"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          회원가입
        </Button>
      </Form>
    </div>
  );
}

export default Register;
