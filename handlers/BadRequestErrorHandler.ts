import { AxiosError } from "axios"
import { toast } from "../contexts/ApplicationContext"
import { HttpErrorHandler } from "./HttpErrorHandler"


class BadRequestErrorHandler implements HttpErrorHandler {
    handle(error: AxiosError): Promise<any> {
        toast({
            description: error.response?.data?.message || 'Some error occurred',
            status: 'error'
        })
        return Promise.reject(error)
    }
}

export function makeBadRequestHandler() {
   return new BadRequestErrorHandler()  
}



