import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import { HttpError, makeHttpError } from "../handlers/HttpError"
import { useStorage } from "../hooks/useStorage"

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL ? process.env.NEXT_PUBLIC_BASE_URL : 'http://localhost:8080/api'
})
export class HttpClient {
    private readonly axios: AxiosInstance
    private readonly httpError: HttpError
    private storage = useStorage()

    constructor(
        axios: AxiosInstance,
        httpError: HttpError
    ) {
        this.axios = axios;
        this.httpError = httpError;
        this.setInterceptors()
    }

    get axiosClient(): AxiosInstance {
        return this.axios
    }

    private setInterceptors = (): void => {
        this.axios.interceptors.response.use(this.successInterceptor, this.errorInterceptor)
        this.axios.interceptors.request.use(this.beforeRequestInterceptor, (error) => Promise.reject(error))
    }

    private beforeRequestInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
        const accessToken = this.storage.getAccessToken()
        if (accessToken) {
            config.headers = {
                ...config.headers,
                'Authorization': accessToken
            }
        }
        return config
    }

    private successInterceptor = (response: AxiosResponse): AxiosResponse => {
        if (response.config?.url === '/login') {
            const data = response.data
            this.storage.setAccessToken(data?.accessToken)
            this.storage.setRefreshToken(data?.refreshToken)
        }
        return response
    }

    private errorInterceptor = (error: AxiosError): Promise<AxiosError> => {
        return this.httpError.resolve(error)
    }
}


const http = new HttpClient(
    axiosInstance,
    makeHttpError()
).axiosClient

export { http }
