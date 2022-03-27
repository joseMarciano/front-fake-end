import { Button, Flex, useBreakpointValue } from "@chakra-ui/react"
import { ReactNode, useEffect } from "react"
import { FiRefreshCcw, FiPlus } from 'react-icons/fi'
import CommonLayoutWrapper from "../../components/commonLayoutWrapper"
import ProjectList from '../../components/home/project/list/index'
import { ProjectModal } from "../../components/home/project/modal"
import { useModalContext } from "../../contexts/ContextModal"


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

    const { actions, setTemplate, setParams, params } = useModalContext()

    useEffect(() => {
        setParams({
            ...params,
            title: 'Adding a project'
        })
        setTemplate(<ProjectModal />)
    }, [])


    return (
        <Flex m="0.5rem" p={variants?.padding} flexDirection="column" gap="0.25rem">
            <Flex alignItems="center" justifyContent="space-between">
                <Button alignSelf="flex-end" onClick={() => actions.open()} colorScheme="teal" leftIcon={<FiPlus />} m="0.5rem">Project</Button>
                <Button alignSelf="flex-end" colorScheme="teal" leftIcon={<FiRefreshCcw />} m="0.5rem">Refresh</Button>
            </Flex>
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