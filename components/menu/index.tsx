import { GiHamburgerMenu } from 'react-icons/gi'
import { IoHome } from 'react-icons/io5'
import { MdLogout } from 'react-icons/md'
import Link from '../link'
import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    HStack,
    VStack,
    Text,
    DrawerOverlay,
    Icon,
    useDisclosure,
    Heading
} from "@chakra-ui/react"
import { useEffect } from 'react'
import { useRouter } from 'next/router'

type MenuProps = {
    variant: {
        key: string
        navigation: string,
        widthMenu: string,
        marginMain: string,
        navigationButton: boolean
    }
}

export default function Menu({ variant }: MenuProps) {
    const router = useRouter()

    const typeMenu = variant.navigation
    const currentSize = variant.key

    if (typeMenu === 'sidebar') return <FixedMenu />

    return <DrawerMenu />

    function FixedMenu() {
        return (
            <>
                <Box
                    position="fixed"
                    top="0"
                    left="0"
                    h="100vh"
                    bg="blackAlpha.300"
                    width={variant.widthMenu}
                >
                    <Box mt="3rem">
                        <ContentMenu />
                    </Box>
                </Box>

            </>
        )
    }

    function DrawerMenu() {

        const { isOpen, onOpen, onClose } = useDisclosure()
        return (
            <>
                <Heading
                    display="flex"
                    alignItems="center"
                    as="header"
                    bg="blackAlpha.300"
                    w="100vw"
                    h="3rem" >
                    <Button size="lg" bg="none" onClick={onOpen}>
                        <Icon as={GiHamburgerMenu} />
                    </Button>
                </Heading>
                <Drawer
                    size={
                        currentSize === 'base' ? 'full' :
                            currentSize === 'md' ? 'sm' :
                                'sm'
                    }
                    isOpen={isOpen}
                    placement='left'
                    onClose={onClose}
                >
                    <DrawerOverlay />
                    <DrawerContent bg="#2B2B2B">
                        <DrawerCloseButton />
                        <DrawerHeader>Menu</DrawerHeader>
                        <DrawerBody>
                            <ContentMenu />
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </>
        )
    }
    function ContentMenu() {

        return (
            <VStack fontSize="1.275rem">
                <Link to="/home">
                    <HStack color={router.asPath === "/home" ? "yellow.400" : ""}>
                        <IoHome />
                        <Text>Home</Text>
                    </HStack>
                </Link>
                <Link to="/login">
                    <HStack>
                        <MdLogout />
                        <Text>Logout</Text>
                    </HStack>
                </Link>
            </VStack>
        )
    }
}

