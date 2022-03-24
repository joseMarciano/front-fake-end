import { useToast } from "@chakra-ui/react"
import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import { createContext, ReactNode, useContext, useEffect } from "react"
import { http } from '../configs/axios'
import { useHttpError } from "../hooks/useHttpError"
import { useStorage } from "../hooks/useStorage"



type HttpContextProviderProps = {
    children: ReactNode
}

type HttpContextProps = {
    http: AxiosInstance
}

const HttpContext = createContext({} as HttpContextProps)

export function HttpContextProvider({ children }: HttpContextProviderProps) {
    const { setAccessToken, setRefreshToken, getAccessToken } = useStorage()
    const httpError = useHttpError()
    
    useEffect(() => {
        addInterceptors()
    }, [])

    function addInterceptors() {
        http.interceptors.response.use(successInterceptor, errorInterceptor)
        http.interceptors.request.use(beforeRequestInterceptor, (error) => Promise.reject(error))


        function beforeRequestInterceptor(config: AxiosRequestConfig) {
            config.headers = {
                ...config.headers,
                'Authorization': getAccessToken() || ''
            }
            return config
        }

        function successInterceptor(response: AxiosResponse): AxiosResponse {
            if (response.config?.url === '/login') {
                const data = response.data
                setAccessToken(data?.accessToken)
                setRefreshToken(data?.refreshToken)
            }
            return response
        }

        async function errorInterceptor(error: AxiosError): Promise<AxiosError> {
            return await httpError.resolve(error)

        }
    }

    const value = {
        http
    }
    return (
        <HttpContext.Provider value={value}>
            {children}
        </HttpContext.Provider>
    )
}

export function useHttpContext() {
    return useContext(HttpContext)
}
