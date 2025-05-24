// src/components/CreatePost.jsx
import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import { getToken } from "../utils/token";

function CreatePost() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    content: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  // 로그인 여부 체크
  useEffect(() => {
    if (!getToken()) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, [navigate]);

  // 카테고리 목록 불러오기
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/api/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("카테고리 로딩 실패:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/api/boards", form);
      alert("게시글이 등록되었습니다.");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "게시글 등록 실패");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2 className="mb-4">게시글 작성</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>제목</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>내용</Form.Label>
          <Form.Control
            as="textarea"
            name="content"
            rows={5}
            value={form.content}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>카테고리</Form.Label>
          <Form.Select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">카테고리를 선택하세요</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100">
          등록하기
        </Button>
      </Form>
    </div>
  );
}

export default CreatePost;
