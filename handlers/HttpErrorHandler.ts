import { AxiosError } from "axios"

export interface HttpErrorHandler {
    handle(error: AxiosError): Promise<any>
}