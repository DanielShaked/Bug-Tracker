'use client'
import { Container, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import { AiOutlineBug } from "react-icons/ai";
import AuthStatus from './_navbar/AuthStatus';
import NavLinks from './_navbar/NavLinks';

const NavBar = () => {

    return (
        <nav className='border-b mb-5 px-5 py-3 '>
            <Container>
                <Flex justify='between'>
                    <Flex align='center' gap='3'>
                        <Link href='/'><AiOutlineBug /></Link>
                        <NavLinks />
                    </Flex>
                    <AuthStatus />
                </Flex>
            </Container>
        </nav >
    )
}


export default NavBar