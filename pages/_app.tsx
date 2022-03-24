import { ChakraProvider } from '@chakra-ui/react'
import { ApplicationContextProvider } from '../contexts/ApplicationContext'
import customTheme from '../configs/theme'

function MyApp({ Component, pageProps }: any) {

  const getLayout = Component.getLayout || ((page: any) => page)
  return (
    <ChakraProvider theme={customTheme}>
      <ApplicationContextProvider>
        {getLayout(<Component {...pageProps} />)}
      </ApplicationContextProvider>
    </ChakraProvider>
  )
}

export default MyApp
