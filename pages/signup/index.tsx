import { FormControl, FormLabel, Input, Button, Flex, Box, VStack, Image, useToast } from "@chakra-ui/react"
import FormInput from "../../components/formInput"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import { AiOutlineLock } from 'react-icons/ai'
import { ReactNode, useState } from "react"
import { useHttpContext } from "../../contexts/HttpContext"
import { useRouter } from "next/router"


const FIELDS = [
    {
        label: 'Email',
        name: 'email',
        type: 'email'
    },
    {
        label: 'Name',
        name: 'name',
        type: 'text'
    },
    {
        label: 'Password',
        name: 'password',
        type: 'password'
    },
    {
        label: 'Password confirmation',
        name: 'passwordConfirmation',
        type: 'password'
    }
]

const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().required("Email is required").email("Email invalid"),
    password: yup.string().required("Password is required"),
    passwordConfirmation: yup.string().required("Password confirmation is required")
})


export default function SignUp() {
    const { http } = useHttpContext()
    const router = useRouter()

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(schema)
    })

    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()

    const onSubmit = (data: any) => {
        const isValid = validateFields(data)
        if (!isValid) {
            return toast({
                description: "Password must match with password confirmation",
                status: 'error'
            })
        }

        setIsLoading(true)
        http.post('/signup', data)
            .then(() => toast({ description: 'Check your email to activate your account', status: 'info' }))
            .then(() => router.push('/login'))
            .catch((error) => console.warn(error))
            .finally(() => setIsLoading(false))
    }

    const validateFields = (data: any): boolean => {
        return data.password === data.passwordConfirmation
    }


    function renderField({ label, name, type }: { label: string, name: string, type: string }, index: number): ReactNode {
        return (
            <Box width="80%" maxW="500px" key={index}>
                <FormInput
                    label={label}
                    name={name}
                    formState={formState}
                    useFormRegister={register}
                    inputProps={{
                        type,
                        isDisabled: isLoading
                    }}
                />
            </Box>
        )
    }

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
                    {FIELDS.map(renderField)}
                    <Box >
                        <Button isLoading={isLoading} leftIcon={<AiOutlineLock />} colorScheme="blue" color="white" type="submit">Register</Button>
                    </Box>
                </VStack>
            </FormControl>
        </VStack>
    )
}