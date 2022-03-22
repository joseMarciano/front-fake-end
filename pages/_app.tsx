import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { HttpContextProvider } from '../contexts/HttpContext'
import customTheme from '../configs/theme'

function MyApp({ Component, pageProps }: any) {

  const getLayout = Component.getLayout || ((page: any) => page)
  return (
    <ChakraProvider theme={customTheme}>
      <HttpContextProvider>
        {getLayout(<Component {...pageProps} />)}
      </HttpContextProvider>
    </ChakraProvider>
  )
}

export default MyApp
