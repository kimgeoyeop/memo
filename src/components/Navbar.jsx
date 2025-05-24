import React from "react";
import {
  Navbar as BsNavbar,
  Nav,
  Container,
  NavDropdown,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ categories, onSelectCategory, user, onLogout }) {
  const navigate = useNavigate();

  const handleCategoryClick = (id) => {
    onSelectCategory(id);
    navigate("/"); // 카테고리 선택 시 메인 화면으로 이동
  };

  return (
    <BsNavbar bg="light" expand="lg">
      <Container>
        <BsNavbar.Brand as={Link} to="/">
          Memo
        </BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              key=""
              onClick={() => handleCategoryClick("")}
              style={{ cursor: "pointer" }}
            >
              All
            </Nav.Link>

            {categories.map((cat) => (
              <Nav.Link
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                style={{ cursor: "pointer" }}
              >
                {cat.name}
              </Nav.Link>
            ))}
          </Nav>
          <Nav>
            {!user ? (
              <>
                <Nav.Link as={Link} to="/login">
                  로그인
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  회원가입
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/posts/new">
                  글쓰기
                </Nav.Link>
                <NavDropdown title={user.nickname} id="user-dropdown">
                  <NavDropdown.Item onClick={onLogout}>
                    로그아웃
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}

export default Navbar;
