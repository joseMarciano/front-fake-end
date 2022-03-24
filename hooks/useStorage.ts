
enum StorageKeys {
    REFRESH_TOKEN = 'REFRESH_TOKEN',
    ACCESS_TOKEN = 'ACCESS_TOKEN'
}

type UseStorageReturnProps = {
    setAccessToken: (accessToken: string) => void,
    setRefreshToken: (refreshToken: string) => void,
    getAccessToken: () => string | null,
    getRefreshToken: () => string | null,
    clearTokens: () => void
}


export function useStorage(): UseStorageReturnProps {
    const setAccessToken = (accessToken: string): void => {
        localStorage.setItem(StorageKeys.ACCESS_TOKEN, accessToken)
    }

    const setRefreshToken = (refreshToken: string): void => {
        localStorage.setItem(StorageKeys.REFRESH_TOKEN, refreshToken)

    }

    const getAccessToken = (): string | null => {
        return localStorage.getItem(StorageKeys.ACCESS_TOKEN)
    }

    const getRefreshToken = (): string | null => {
        return localStorage.getItem(StorageKeys.REFRESH_TOKEN)
    }

    const clearTokens = (): void => {
        localStorage.removeItem(StorageKeys.ACCESS_TOKEN)
        localStorage.removeItem(StorageKeys.REFRESH_TOKEN)
    }

    return {
        setAccessToken,
        setRefreshToken,
        getAccessToken,
        getRefreshToken,
        clearTokens
    }
}