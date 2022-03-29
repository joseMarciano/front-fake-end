import {
    Accordion,
    AccordionItem,
    Box,
    Button,
    Flex,
    Icon,
    Text,
    VStack
} from "@chakra-ui/react"
import { useState } from "react"
import { FiCopy, FiEdit, FiTrash } from "react-icons/fi"
import { Project, useProjectContext } from "../context/ProjectContext"


export default function ProjectList() {
    const { projects } = useProjectContext()
    return (
        <Accordion allowMultiple>
            {
                projects.map((project) => (
                    <AccordionItem key={project.id}>
                        <RowProjectList project={project} />
                    </AccordionItem>
                ))
            }
        </Accordion>)
}

type RowProjectListProps = {
    project: Project
}

function RowProjectList({ project }: RowProjectListProps) {
    const [isDeleting, setIsDeleting] = useState(false)
    const { deleteById } = useProjectContext()


    const deleteProjectById = (): Promise<void> => {
        setIsDeleting(true)
        return deleteById(project.id)
            .finally(() => setIsDeleting(false))
    }

    return (
        <Text as="h2" p="0.5rem">
            <Box flex='1' textAlign='left'>
                <Flex alignItems="center">
                    <VStack alignItems="flex-start" flex='1' flexDirection="column" spacing="1px">
                        {/* TODO CREATE BREAKPOINT VALUE FOR MOBILE LAYOUT */}
                        <Text maxWidth="220px" as="span" >{project.title}</Text>
                        <Text maxWidth="220px" fontSize="0.75rem" as="span" color="gray.400" alignSelf="flex-start" size="sm" flex='1' p="0">{project.description}</Text>
                    </VStack>
                    <Button bg="inherit" size="sm">
                        <Icon color="teal.200" as={FiCopy} />
                    </Button>
                    <Button bg="inherit" size="sm">
                        <Icon color="teal.200" as={FiEdit} />
                    </Button>
                    <Button bg="inherit" size="sm" onClick={deleteProjectById} isLoading={isDeleting}>
                        <Icon color="red.500" as={FiTrash} />
                    </Button>
                </Flex>
            </Box>
        </Text>
    )
}
