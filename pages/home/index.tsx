import { Button, Flex, useBreakpointValue } from "@chakra-ui/react"
import { AxiosResponse } from "axios"
import { ReactNode, useEffect, useState } from "react"
import { FiRefreshCcw, FiPlus } from 'react-icons/fi'
import CommonLayoutWrapper from "../../components/commonLayoutWrapper"
import { ProjectContextProvider, useProjectContext } from "../../components/home/project/context/ProjectContext"
import ProjectList from '../../components/home/project/list/index'
import { ProjectModal } from "../../components/home/project/modal"
import { http } from "../../configs/axios"
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
    const projectContext = useProjectContext()
    const { actions, setTemplate, setParams, params } = useModalContext()
    const setConfigProjectModal = () => {
        setParams({
            others: {
                projectContext
            },
            title: 'Adding a project'
        })
        setTemplate(<ProjectModal />)
    }

    const openModal = () => {
        setConfigProjectModal()
        actions.open()
    }

    useEffect(() => {
        setConfigProjectModal()
        projectContext.search()
    }, [])


    return (
        <Flex m="0.5rem" p={variants?.padding} flexDirection="column" gap="0.25rem">
            <Flex alignItems="center" justifyContent="space-between">
                <Button alignSelf="flex-end" onClick={openModal} colorScheme="teal" leftIcon={<FiPlus />} m="0.5rem">Project</Button>
                <Button onClick={projectContext.search} disabled={projectContext.isLoading} isLoading={projectContext.isLoading} alignSelf="flex-end" colorScheme="teal" leftIcon={<FiRefreshCcw />} m="0.5rem">Refresh</Button>
            </Flex>
            <ProjectList />
        </Flex>
    )
}

Home.getLayout = function getLayout(page: ReactNode) {
    return (
        <CommonLayoutWrapper>
            <ProjectContextProvider>
                {page}
            </ProjectContextProvider>
        </CommonLayoutWrapper>
    )
}