import { useToast } from "@chakra-ui/react"
import { AxiosError, AxiosInstance } from "axios"
import { BadRequestErrorHandler } from "../handlers/BadRequestErrorHandler"
import { HttpErrorHandler } from "../handlers/HttpErrorHandler"
import { ServerErrorHandler } from "../handlers/ServerErrorHandler"
import { UnauthorizedErrorHandler } from "../handlers/UnauthorizedErrorHandler"

type HttpErrorProps = {
    http: AxiosInstance
}

export function useHttpError() {
    const toast = useToast()

    const mapErrors = new Map<number, HttpErrorHandler>([
        [400, new BadRequestErrorHandler(toast)],
        [401, new UnauthorizedErrorHandler()],
        [500, new ServerErrorHandler(toast)]
    ])


    const resolve = (error: AxiosError): Promise<any> => {
        const statusCode = error.response?.status || 500
        return mapErrors.get(statusCode)?.handle(error) || Promise.reject(error)
    }

    return {
        resolve
    }
}