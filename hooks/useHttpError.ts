import { useToast } from "@chakra-ui/react"
import { AxiosError } from "axios"
import { useRouter } from "next/router"
import { useMemo } from "react"
import { BadRequestErrorHandler } from "../handlers/BadRequestErrorHandler"
import { HttpErrorHandler } from "../handlers/HttpErrorHandler"
import { ServerErrorHandler } from "../handlers/ServerErrorHandler"
import { UnauthorizedErrorHandler } from "../handlers/UnauthorizedErrorHandler"

export function useHttpError() {
    const toast = useToast()
    const router = useRouter()

    const mapErrors = useMemo<Map<number, HttpErrorHandler>>(() =>
        new Map<number, HttpErrorHandler>([
            [400, new BadRequestErrorHandler(toast)],
            [401, new UnauthorizedErrorHandler(() => {
                router.push('/login')
            })],
            [500, new ServerErrorHandler(toast)]
        ]), [])


    const resolve = async (error: AxiosError): Promise<any> => {
        const statusCode = error.response?.status || 500
        return await mapErrors.get(statusCode)?.handle(error) || await Promise.reject(error)
    }

    return {
        resolve
    }
}