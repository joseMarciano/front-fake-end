import axios from "axios"

const http = axios.create({
    baseURL: process.env.BASE_URL ?? 'http://localhost:8080/api'
})

export { http }