
import { useState } from 'react';
import NavbarDesktop from '@components/home/navbarDesktop'
import NavbarMobile from '@components/home/navbarMobile';

type NavTypes = {
    name: string
    href: string
}


const navigation: NavTypes[] = [
    { name: 'Inicio', href: '/' },
    { name: 'Contacto', href: '/contact' },
    { name: 'Ayuda', href: '/help' },
]


const NavContainer: React.FC = () => {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <>
            <div>
                <NavbarDesktop
                    setMobileMenuOpen={setMobileMenuOpen}
                    navigation={navigation}
                />
                <NavbarMobile
                    mobileMenuOpen={mobileMenuOpen}
                    setMobileMenuOpen={setMobileMenuOpen}
                    navigation={navigation}
                />
            </div>
        </>
    )
}

export default NavContainer;