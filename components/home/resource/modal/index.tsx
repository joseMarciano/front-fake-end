import { Badge, Box, Button, ButtonGroup, FormControl, Grid, GridItem, Icon, ModalBody, Text } from "@chakra-ui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { useModalContext } from "../../../../contexts/ContextModal"
import FormInput from "../../../formInput"
import *  as yup from 'yup'
import { useEffect, useState } from "react"
import { IoClose } from "react-icons/io5"
import { BiCheck } from "react-icons/bi"
import { FaExclamation } from "react-icons/fa"
import { Resource } from "../../project/context/ProjectContext"

const schema = yup.object().shape({
    name: yup.string()
        .required("Name is required")
        .max(15, "Resource name must contain less than ${max} character")
        .matches(/^[a-z]+$/g, { message: 'Resource name must have only lower case letters' })
})


export function ResourceModal() {
    const { params: { others: { project, projectContext } } } = useModalContext()
    const [resources, setResources] = useState([] as Resource[])
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState, resetField } = useForm({
        resolver: yupResolver(schema)
    })

    useEffect(() => {
        setIsLoading(true)
        projectContext.findResourcesByProjectId(project.id)
            .then((resources: Resource[]) => setResources(resources))
            .finally(() => setIsLoading(false))

    }, [])

    const addResourceInResources = (data: Resource) => {
        if (!data) return
        resetField("name")
        setResources(resources.concat(data))
    }

    const onSubmit = (data: any) => {
        setIsLoading(true)
        projectContext.saveResource(data, project.id)
            .then((resource: Resource) => addResourceInResources(resource))
            .finally(() => setIsLoading(false))
    }

    return (
        <>
            <ModalBody display="flex" flexDirection="column" gap={5}>
                <FormControl
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap={3}
                    noValidate
                    as="form"
                    onSubmit={handleSubmit(onSubmit)}
                    isInvalid={Object.keys(formState?.errors).length > 0}
                    isRequired
                >
                    <Box width="100%">
                        <FormInput
                            name="name"
                            formState={formState}
                            useFormRegister={register}
                            inputProps={{
                                placeholder: "Ex: employee"

                            }}
                        />
                    </Box>
                    <ButtonGroup mt={3} position="relative" flex="1" justifyContent="end" size="sm" w="full" ml={2} spacing={2}>
                        <Button type="submit" isLoading={isLoading} disabled={isLoading} border="1px" borderRadius="8px" bg="inherit" size="sm">
                            <Icon color="teal.200" as={BiCheck} />
                        </Button>
                        <Button onClick={() => resetField("name")} isLoading={isLoading} disabled={isLoading} border="1px" borderRadius="8px" bg="inherit" size="sm" >
                            <Icon color="red.500" as={IoClose} />
                        </Button>
                    </ButtonGroup>

                </FormControl>
                <Grid templateColumns='repeat(2, 1fr)' gap={6} maxH="300px" overflow="scroll" overflowX="hidden">
                    {resources.map((resource) => (<ResourceItem key={resource.id} resource={resource} />))}
                </Grid>
            </ModalBody>

        </>
    )

    function ResourceItem({ resource }: any) {
        const [clicked, setClicked] = useState(false)

        useEffect(() => {
            if (clicked) {
                setTimeout(() => {
                    setClicked(false)
                }, 5000)
            }

        }, [clicked])

        const remove = () => {
            const removeResourceOfList = () => {
                setResources(resources.filter((resourceItem) => resourceItem.id !== resource.id))
            }

            if (!clicked) return setClicked(true)

            projectContext.deleteResourceById(resource.id)
                .then(removeResourceOfList)


        }

        return (
            <GridItem display="flex" alignItems="center" justifyContent="flex-start">
                <Badge cursor="pointer" onClick={remove} colorScheme={clicked ? "red" : "gray"} display="flex" alignItems="center">
                    {resource.name}
                    <Icon ml={1} color="red.500" as={clicked ? FaExclamation : IoClose} />
                </Badge>
            </GridItem>
        )
    }
}

