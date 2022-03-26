import { Button, Flex, useBreakpointValue } from "@chakra-ui/react"
import { ReactNode } from "react"
import { FiRefreshCcw } from 'react-icons/fi'
import CommonLayoutWrapper from "../../components/commonLayoutWrapper"
import ProjectList from '../../components/home/project/list/index'


const bsVariant = { padding: '0' }
const smVariant = { padding: '0' }
const mdVariant = { padding: '0' }
const lgVariant = { padding: '5rem' }


export default function Home() {
    const variants = useBreakpointValue({
        sm: smVariant,
        base: bsVariant,
        md: mdVariant,
        lg: lgVariant
    })

    return (
        <Flex m="0.5rem" p={variants?.padding} flexDirection="column" gap="0.25rem">
            <Button alignSelf="flex-end" colorScheme="teal" leftIcon={<FiRefreshCcw />} m="0.5rem">Refresh</Button>
            <ProjectList />
        </Flex>
    )
}

Home.getLayout = function getLayout(page: ReactNode) {
    return (
        <CommonLayoutWrapper>
            {page}
        </CommonLayoutWrapper>
    )
}