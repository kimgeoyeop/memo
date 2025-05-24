// api/axiosInstance.js
import axios from "axios";
import { getToken, removeToken } from "../utils/token";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터: JWT 자동 첨부
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 에러 처리
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 예: 토큰 만료 시 로그아웃 처리
    if (error.response?.status === 403) {
      alert("권한이 없습니다. 다시 로그인해주세요.");
      removeToken();
    } else if (error.response?.status === 401) {
      alert("인증이 만료되었습니다.");
      removeToken();
    }
    return Promise.reject(error);
  }
);

export default api;
