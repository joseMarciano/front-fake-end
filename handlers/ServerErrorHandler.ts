import { UseToastOptions } from "@chakra-ui/react"
import { AxiosError } from "axios"
import { HttpErrorHandler } from "./HttpErrorHandler"


export class ServerErrorHandler implements HttpErrorHandler {

    constructor(
        private readonly toast: (options: UseToastOptions)=> void
    ){}

    handle(error: AxiosError): Promise<any> {
        this.toast({
            description: error.response?.data?.message || 'Internal server error',
            status: 'error'
        })
        return Promise.reject(error)
    }

}