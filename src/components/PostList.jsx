import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { Card, Row, Col, Button, Badge } from "react-bootstrap";

function PostList({ categoryId }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let url = "/api/boards";
        if (categoryId) url += `?categoryId=${categoryId}`;
        const res = await api.get(url);
        setPosts(res.data);
      } catch (err) {
        console.error("게시글 불러오기 실패:", err);
      }
    };

    fetchPosts();
  }, [categoryId]);

  const handleDelete = async (postId) => {
    const confirmed = window.confirm("삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      await api.delete(`/api/boards/${postId}`);
      setPosts((prev) => prev.filter((post) => post.id !== postId));
    } catch (err) {
      // alert("삭제 실패");
      console.error(err);
    }
  };

  // 예시 색상 맵
  const categoryColors = {
    //자유: "primary",
    Deploy: "success",
    BugFix: "danger",
    Documentation: "secondary",
  };

  return (
    <Row>
      {posts.map((post) => (
        <Col md={6} lg={4} key={post.id} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>

              {/* 카테고리 컬러 배지 */}
              <Card.Text>
                <Badge
                  bg={categoryColors[post.categoryName] || "dark"}
                  style={{
                    transform: "rotate(45deg)",
                    display: "inline-block",
                    width: "16px",
                    height: "16px",
                    marginRight: "8px",
                  }}
                />
                <span>{post.categoryName || "없음"}</span>
              </Card.Text>

              <Card.Text>{post.content}</Card.Text>

              <Card.Footer className="d-flex justify-content-between align-items-center">
                <small className="text-muted">작성자: {post.author}</small>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(post.id)}
                >
                  삭제
                </Button>
              </Card.Footer>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default PostList;
