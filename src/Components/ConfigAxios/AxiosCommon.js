import axios from "axios"

var instance = axios.create({
    baseURL: 'https://localhost:8080/',
    timeout: 1000,
    headers: `Authorization: Bearer ${token}`
  });