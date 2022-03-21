import { FormControl, FormLabel, Input, Button, Flex, Box, VStack, Image } from "@chakra-ui/react"
import FormInput from "../../components/formInput"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import { AiOutlineLock } from 'react-icons/ai'



const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().required("Email is required").email("Email invalid"),
    password: yup.string().required("Password is required"),
    passwordConfirmation: yup.string().required("Password confirmation is required")
})

export default function SignUp() {
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = (data: any) => console.log(data)
    return (
        <VStack height="100vh" justifyContent="center">
            <Image
                color="white"
                alt="Logo"
                src="logo/png/logo_white_plan.png"
            />
            <FormControl
                noValidate
                as="form"
                onSubmit={handleSubmit(onSubmit)}
                isInvalid={Object.keys(formState?.errors).length > 0}
                isRequired
            >
                <VStack spacing={5} justifyContent="center">
                    <Box width="80%" maxW="500px">
                        <FormInput
                            label="Email"
                            name="email"
                            formState={formState}
                            useFormRegister={register}
                            inputProps={{
                                type: 'email'
                            }}
                        />
                    </Box>
                    <Box width="80%" maxW="500px">
                        <FormInput
                            label="Name"
                            name="name"
                            formState={formState}
                            useFormRegister={register}
                        />
                    </Box>
                    <Box width="80%" maxW="500px">
                        <FormInput
                            label="Password"
                            name="password"
                            formState={formState}
                            useFormRegister={register}
                            inputProps={{
                                type: 'password'
                            }}
                        />
                    </Box>
                    <Box width="80%" maxW="500px">
                        <FormInput
                            label="Password confirmation"
                            name="passwordConfirmation"
                            formState={formState}
                            useFormRegister={register}
                            inputProps={{
                                type: 'password'
                            }}
                        />
                    </Box>
                    <Box >
                        <Button leftIcon={<AiOutlineLock />} bg="gray.600" color="white" type="submit">Register</Button>
                    </Box>
                </VStack>
            </FormControl>
        </VStack>
    )
}