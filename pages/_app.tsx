import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { HttpContextProvider } from '../contexts/HttpContext'
import customTheme from '../configs/theme'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ChakraProvider theme={customTheme}>
      <HttpContextProvider>
        <Component {...pageProps} />
      </HttpContextProvider>
    </ChakraProvider>
  )
}

export default MyApp
