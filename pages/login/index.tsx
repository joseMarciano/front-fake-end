import { FormControl, FormLabel, Input, Button, Flex, Box, VStack, Image, useToast, HStack } from "@chakra-ui/react"
import FormInput from "../../components/formInput"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import { AiOutlineLock } from 'react-icons/ai'
import { ReactNode, useState } from "react"
import { useRouter } from "next/router"
import Link from "../../components/link"
import { MdLogin } from "react-icons/md"
import { FiUserPlus } from "react-icons/fi"
import { http } from "../../configs/axios"


const FIELDS = [
    {
        label: 'Email',
        name: 'email',
        type: 'email'
    },
    {
        label: 'Password',
        name: 'password',
        type: 'password'
    }
]

const schema = yup.object().shape({
    email: yup.string().required("Email is required").email("Email invalid"),
    password: yup.string().required("Password is required"),
})


export default function SignUp() {
    const router = useRouter()

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(schema)
    })

    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = (data: any) => {
        setIsLoading(true)
        http.post('/login', data)
            .then(() => router.push('/home'))
            .catch((error) => console.warn(error))
            .finally(() => setIsLoading(false))
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
                    <HStack justifyContent="center" spacing="1rem">
                    <Button isLoading={isLoading} leftIcon={<AiOutlineLock />} colorScheme="green" color="white" type="submit">Login</Button>
                        <Link to="/signup">
                            <Button isDisabled={isLoading} leftIcon={<FiUserPlus />} colorScheme="blue">Signup</Button>
                        </Link>
                    </HStack>
                </VStack>
            </FormControl>
        </VStack>
    )
}