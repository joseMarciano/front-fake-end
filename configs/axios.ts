import axios from "axios"
const http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL ? process.env.NEXT_PUBLIC_BASE_URL: 'http://localhost:8080/api'
})

export { http }