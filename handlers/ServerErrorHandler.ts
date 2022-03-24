import { AxiosError } from "axios"
import { toast } from "../contexts/ApplicationContext"
import { HttpErrorHandler } from "./HttpErrorHandler"


class ServerErrorHandler implements HttpErrorHandler {
    handle(error: AxiosError): Promise<any> {
        toast({
            description: error.response?.data?.message || 'Internal server error',
            status: 'error'
        })
        return Promise.reject(error)
    }
}

export function makeServerErrorHanlder() {
    return new ServerErrorHandler()
}