import { Flex, Box, Heading, Text, Stack, Button, HStack, Image } from "@chakra-ui/react"
import { MdLogin } from 'react-icons/md'
import { FiUserPlus } from 'react-icons/fi'



export default function Welcome() {
    return (

        <Flex
            p="2rem"
            direction={["column", "row"]}
            alignItems="center"
            justifyContent="center"
            h="100vh"
            w="100vw"
        >
            <Stack align="center" spacing="2rem">
                <Heading as="h1" fontWeight="normal"> 👋 Welcome!</Heading>
                <HStack justifyContent="center" spacing="1rem">
                    <Button leftIcon={<MdLogin />} colorScheme="green">Login</Button>
                    <Button leftIcon={<FiUserPlus />} colorScheme="blue">Signup</Button>
                </HStack>
            </Stack>
            <Box maxWidth="1000px" minWidth="300px">
                <Image alt="Logo" src="logo/png/white-logo-no-background.png" />
            </Box>
        </Flex>
    )

}