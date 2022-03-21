import { useToast } from "@chakra-ui/react"
import { AxiosInstance } from "axios"
import { createContext, ReactNode, useContext, useEffect } from "react"
import { http } from '../configs/axios'



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

    useEffect(() => {
        addInterceptors()
    })

    function addInterceptors() {
        http.interceptors.response.use((response) => response, (error) => {
            if (error.response?.status === 400) {
                toast({
                    description: error.response.data?.message || 'Some error occurred',
                    status: 'error'
                })
            }

            return Promise.reject(error)
        })
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


