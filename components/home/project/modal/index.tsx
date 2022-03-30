import { Box, Button, FormControl, FormLabel, HStack, Input, ModalBody, ModalFooter, VStack } from "@chakra-ui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { useModalContext } from "../../../../contexts/ContextModal"
import FormInput from "../../../formInput"
import *  as yup from 'yup'
import { useEffect, useState } from "react"

const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
})

export function ProjectModal() {
    const { actions, params: { others: { projectContext, project } } } = useModalContext()
    const { register, handleSubmit, formState, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: project
    })
    const [isLoading, setIsLoading] = useState(false)
    const [modeModal, setModeModal] = useState<'save' | 'edit'>('save')


    useEffect(() => {
        if (project?.id) {
            setModeModal('edit')
        } else{
            reset()
        }
    }, [])

    useEffect(() => {
        return () => console.log()
    }, [])

    const onSubmit = (data: any) => {
        setIsLoading(true)
        projectContext[modeModal](data)
            .then(() => actions.close())
            .finally(() => setIsLoading(false))
    }

    return (
        <>
            <ModalBody >
                <FormControl
                    noValidate
                    as="form"
                    isRequired
                    onSubmit={handleSubmit(onSubmit)}
                    isInvalid={Object.keys(formState?.errors).length > 0}
                >
                    <VStack spacing={5} justifyContent="center">
                        <Box width="100%" maxW="500px">
                            <FormInput
                                label="Title"
                                name="title"
                                formState={formState}
                                useFormRegister={register}
                                inputProps={{
                                    type: 'text',
                                    isDisabled: isLoading
                                }}
                            />

                        </Box>
                        <Box width="100%" maxW="500px">
                            <FormInput
                                label="Description"
                                name="description"
                                formState={formState}
                                useFormRegister={register}
                                inputProps={{
                                    type: 'text',
                                    isDisabled: isLoading
                                }}
                            />
                        </Box>
                        <HStack spacing="1rem">
                            <Button isLoading={isLoading} colorScheme='teal' type="submit">
                                Save
                            </Button>
                            <Button disabled={isLoading} colorScheme='red' onClick={actions.close}>Cancel</Button>
                        </HStack>
                    </VStack>
                </FormControl>
            </ModalBody>

        </>
    )
}