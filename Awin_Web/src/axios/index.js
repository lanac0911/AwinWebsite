// src/axios/index.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api', // 设置你的 API 地址
  timeout: 5000, // 设置请求超时时间
});

export default axiosInstance;
