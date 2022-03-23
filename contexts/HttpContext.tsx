import { useToast } from "@chakra-ui/react"
import { AxiosError, AxiosInstance, AxiosResponse } from "axios"
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
    const value = {
        http
    }
    const { setAccessToken, setRefreshToken } = useStorage()
    const httpError = useHttpError()

    useEffect(() => {
        addInterceptors()
    }, [])

    function addInterceptors() {
        http.interceptors.response.use(successInterceptor, errorInterceptor)


        function successInterceptor(response: AxiosResponse): AxiosResponse {
            if (response.config?.url === '/login' || response.config?.url === '/access-token') {
                const data = response.data
                setAccessToken(data?.accessToken)
                setRefreshToken(data?.refreshToken)
            }
            return response
        }

        function errorInterceptor(error: AxiosError): Promise<AxiosError> {
            return httpError.resolve(error)

        }
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
