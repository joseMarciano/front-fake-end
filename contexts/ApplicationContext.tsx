import { useToast, UseToastOptions } from "@chakra-ui/react"
import { createContext, ReactNode, useContext, useEffect, useMemo } from "react"



type ApplicationContextProviderProps = {
    children: ReactNode
}

type ApplicationContextProps = {}

const ApplicationContext = createContext({} as ApplicationContextProps)
export let toast: (options: UseToastOptions) => void

export function ApplicationContextProvider({ children }: ApplicationContextProviderProps) {
    const toastChakra = useToast()
    const value = {}

    useEffect(() => {
        toast = toastChakra
    },[])

    return (
        <ApplicationContext.Provider value={value}>
            {children}
        </ApplicationContext.Provider>
    )
}

export function useApplicationContext() {
    return useContext(ApplicationContext)
}
