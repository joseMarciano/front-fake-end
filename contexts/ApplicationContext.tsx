import { useToast, UseToastOptions } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { createContext, ReactNode, useContext, useEffect, useMemo } from "react"
import { useStorage } from "../hooks/useStorage"



type ApplicationContextProviderProps = {
    children: ReactNode
}

type ApplicationContextProps = {}

const ApplicationContext = createContext({} as ApplicationContextProps)
export let toast: (options: UseToastOptions) => void

export function ApplicationContextProvider({ children }: ApplicationContextProviderProps) {
    const toastChakra = useToast()
    const router = useRouter()
    const { getAccessToken } = useStorage()
    const value = {}

    useEffect(() => {
        toast = toastChakra
    }, [])

    useEffect(() => {
        verifyIfUserIsLogged()
    },[router.asPath])

    const verifyIfUserIsLogged = () => {

        if (getAccessToken() && (router.asPath === '/login')) {
            router.push('/home')
        }
    }

    return (
        <ApplicationContext.Provider value={value}>
            {children}
        </ApplicationContext.Provider>
    )
}

export function useApplicationContext() {
    return useContext(ApplicationContext)
}
