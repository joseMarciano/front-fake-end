import { Box, useBreakpointValue } from "@chakra-ui/react"
import { ReactNode } from "react"
import Menu from '../menu'

type CommonLayoutWrapperProps = {
  children: ReactNode
}


const smVariant = { key:'base', navigation: 'drawer', navigationButton: true, widthMenu: null, marginMain: null }
const mdVariant = { key: 'md', navigation: 'drawer', navigationButton: true,  widthMenu: null, marginMain: null }
const lgVariant = { key: 'lg',  navigation: 'sidebar', navigationButton: false, widthMenu: '250px', marginMain: '250px' }

export default function CommonLayoutWrapper({ children }: CommonLayoutWrapperProps) {
  const variants = useBreakpointValue({
    base: smVariant,
    md: mdVariant,
    lg: lgVariant
  })
  return (
    <>
      <Menu 
        variant={variants as any}
      />
      <Box ml={variants?.marginMain || '0'} as="main">{children}</Box>
    </>
  )
}