import { UseToastOptions } from "@chakra-ui/react"
import { AxiosError } from "axios"
import { HttpErrorHandler } from "./HttpErrorHandler"


export class BadRequestErrorHandler implements HttpErrorHandler {

    constructor(
        private readonly toast: (options: UseToastOptions) => void
    ) { }

    handle(error: AxiosError): Promise<any> {
        this.toast({
            description: error.response?.data?.message || 'Some error occurred',
            status: 'error'
        })
        return Promise.reject(error)
    }
}
