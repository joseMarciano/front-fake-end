import { HttpErrorHandler } from "./HttpErrorHandler"
import { http } from "../configs/axios"
import { useStorage } from '../hooks/useStorage'
import { AxiosError, AxiosInstance, AxiosPromise, AxiosResponse } from "axios"
import { useRouter } from "next/router"


type FailedRequestQueueType = {
    onSuccess: () => void
    onFailure: () => void
}

export class UnauthorizedErrorHandler implements HttpErrorHandler {
    private getRefreshToken = useStorage().getRefreshToken
    private getAccessToken = useStorage().getAccessToken
    private setAccessToken = useStorage().setAccessToken
    private failedRequestsQueue: FailedRequestQueueType[] = []
    private isRefresingToken = false


    constructor(
        private readonly logOutClient: () => void
    ) { }

    handle(error: AxiosError): Promise<any> {
        if(error.config.url !== '/access-token') return this.handleTokenExpired(error)
        this.logOutClient()
        return Promise.reject(error)
    }

    private handleTokenExpired(error: AxiosError): Promise<any> {
        if (!this.isRefresingToken) this.resolveInvalidToken()
        return new Promise((resolve, reject) => {
            this.newFailedRequest(error, resolve, reject)
        })
    }

    private newFailedRequest(error: AxiosError, resolve: (http: AxiosPromise) => void, reject: (error: AxiosError) => void): void {
        const onSuccess = () => {
            const config = error.config
            config.headers = {
                ...config.headers,
                'Authorization': this.getAccessToken() || ''
            }
            resolve(http(config))
        }

        const onFailure = () => {
            this.logOutClient()
            reject(error)
        }


        this.failedRequestsQueue.push({
            onSuccess,
            onFailure
        })

    }


    private resolveInvalidToken(): Promise<void> {
        const setAccessToken = ({ data }: AxiosResponse) => this.setAccessToken(data.accessToken)

        const executeFailedRequestsQueue = (key: 'onSuccess' | 'onFailure') => {
            return () => {

                this.failedRequestsQueue.forEach((requestFailed) => requestFailed[key]())
            }
        }

        const clearFailedRequests = () => this.failedRequestsQueue = []

        const setIsRefreshing = (value: boolean) => {
            return () => {
                this.isRefresingToken = value
            }
        }

        setIsRefreshing(true)()
        return http.put('/access-token', { refreshToken: this.getRefreshToken() })
            .then(setAccessToken)
            .then(executeFailedRequestsQueue('onSuccess'))
            .catch(executeFailedRequestsQueue('onFailure'))
            .finally(setIsRefreshing(false))
            .finally(clearFailedRequests)


    }

}