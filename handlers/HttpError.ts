import { AxiosError } from "axios"
import { makeBadRequestHandler } from "./BadRequestErrorHandler"
import { HttpErrorHandler } from "./HttpErrorHandler"
import { makeServerErrorHanlder } from "./ServerErrorHandler"
import { makeUnauthorizedErrorHandler } from "./UnauthorizedErrorHandler"


export class HttpError {
    private mapErrors = new Map<number, HttpErrorHandler>()

    resolve = (error: AxiosError): Promise<any> => {
        const statusCode = error.response?.status || 500
        return this.mapErrors.get(statusCode)?.handle(error) || Promise.reject(error)
    }

    addHandler = (statusCode: number, handler: HttpErrorHandler): HttpError => {
        this.mapErrors.set(statusCode, handler)
        return this
    }

}

export function makeHttpError() {
    return new HttpError()
        .addHandler(400, makeBadRequestHandler())
        .addHandler(401, makeUnauthorizedErrorHandler())
        .addHandler(500, makeServerErrorHanlder())
}