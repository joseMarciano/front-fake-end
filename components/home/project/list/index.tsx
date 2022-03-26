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
import { FiCopy, FiEdit } from "react-icons/fi"

export default function ProjectList() {
    return (
        <Accordion allowMultiple>
            {
                [1, 2, 3, 4, 5, 6].map((_, index) => (
                    <AccordionItem key={index}>
                        <RowProjectList />
                    </AccordionItem>
                ))
            }
        </Accordion>)
}


function RowProjectList() {


    return (
        <Text as="h2" p="0.5rem">
            <Box flex='1' textAlign='left'>
                <Flex alignItems="center">
                    <VStack alignItems="flex-start" flex='1' flexDirection="column" spacing="1px">
                        <Text as="span" >Crud de matriculas</Text>
                        <Text fontSize="0.75rem" as="span" color="gray.400" alignSelf="flex-start" size="sm" flex='1' p="0">Usado para testes na edital de Penha</Text>
                    </VStack>
                    <Button onClick={(e) => e.stopPropagation()} bg="inherit" size="sm">
                        <Icon color="teal.200" as={FiCopy} />
                    </Button>
                    <Button onClick={(e) => e.stopPropagation()} bg="inherit" size="sm">
                        <Icon color="teal.200" as={FiEdit} />
                    </Button>
                </Flex>
            </Box>
        </Text>
    )
}
