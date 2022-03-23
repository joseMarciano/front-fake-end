import { useToast } from "@chakra-ui/react"
import { AxiosError, AxiosInstance, AxiosResponse } from "axios"
import { createContext, ReactNode, useContext, useEffect } from "react"
import { http } from '../configs/axios'
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
    const toast = useToast()
    const {setAccessToken, setRefreshToken} = useStorage()

    useEffect(() => {
        addInterceptors()
    }, [])

    function addInterceptors() {
        http.interceptors.response.use(successInterceptor, errorInterceptor)


        function successInterceptor(response: AxiosResponse): AxiosResponse {
            if(response.config?.url === '/login' || response.config?.url === '/access-token'){
                const data = response.data
                setAccessToken(data?.accessToken)
                setRefreshToken(data?.refreshToken)
            }
            return response
        }

        function errorInterceptor(error: AxiosError): Promise<AxiosError> {
            if (error.response?.status === 400) {
                toast({
                    description: error.response.data?.message || 'Some error occurred',
                    status: 'error'
                })
            }

            return Promise.reject(error)

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


