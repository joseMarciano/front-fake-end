import { Modal as CharkraModal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton } from "@chakra-ui/react"
import {  ReactNode } from "react"
import { useModalContext } from "../../contexts/ContextModal"



export type ModalParams = {
    children: ReactNode
    title: string
}



export function Modal({ title, children }: ModalParams) {
    const { actions } = useModalContext()

    return (
        <CharkraModal
            isOpen={actions.isOpen}
            onClose={actions.close}
        >
            <ModalOverlay />
            <ModalContent bg="gray.600">
                <ModalHeader>{title || ''}</ModalHeader>
                <ModalCloseButton />
                {children}
            </ModalContent>
        </CharkraModal>
    )
}