import { createContext, ReactNode, useCallback, useContext, useState } from "react"
import { Modal } from '../components/modal/index'

type ModalContextProps = {
    setParams: (params: ModalParamsProps) => void,
    setTemplate: (node: ReactNode) => void
    params: ModalParamsProps,
    actions: {
        isOpen: boolean,
        close: () => void
        open: () => void
        toogle: () => void
    }
}

type ModalParamsProps = {
    title: string,
    others: any
}

const ModalContext = createContext({} as ModalContextProps)

type ModalContextProvider = {
    children: ReactNode
}


export function ModalContextProvider({ children }: ModalContextProvider) {
    const [template, setTemplate] = useState(<div /> as ReactNode)
    const [params, setParams] = useState({
        title: '',
        others: {}
    })

    const [isOpen, setIsOpen] = useState(false)
    const close = useCallback(() => setIsOpen(false), [])
    const open = useCallback(() => setIsOpen(true), [])
    const toogle = useCallback(() => setIsOpen(!isOpen), [isOpen])

    const actions = {
        isOpen,
        close,
        open,
        toogle
    }


    return (
        <ModalContext.Provider value={{
            setTemplate,
            params,
            setParams,
            actions
        }}>
            {children}


            <Modal
                title={params.title}
            >
                {template}
            </Modal>
        </ModalContext.Provider>
    )
}

export function useModalContext() {
    return useContext(ModalContext)
}
