import { ChakraProvider } from '@chakra-ui/react'
import { ApplicationContextProvider } from '../contexts/ApplicationContext'
import customTheme from '../configs/theme'
import { ModalContextProvider } from '../contexts/ContextModal'

function MyApp({ Component, pageProps }: any) {

  const getLayout = Component.getLayout || ((page: any) => page)
  return (
    <ChakraProvider theme={customTheme}>
      <ApplicationContextProvider>
        <ModalContextProvider>
          {getLayout(<Component {...pageProps} />)}
        </ModalContextProvider>
      </ApplicationContextProvider>
    </ChakraProvider>
  )
}

export default MyApp
