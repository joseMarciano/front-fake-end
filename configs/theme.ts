// import '@fontsource/open-sans/700.css'
import { extendTheme } from "@chakra-ui/react"



export default extendTheme({
  styles: {
    global: {
      body: {
        bg: 'blackAlpha.800',
        color: 'white'
      }
    }
  },
  fonts: {
    body: 'Open Sans, sans-serif',
    heading: 'Open Sans, sans-serif'
  }
})