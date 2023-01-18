import { useState } from 'react'
import {
    BuildingOfficeIcon,
    BuildingOffice2Icon
} from '@heroicons/react/24/outline'
import NavbarMobile from '@components/dashboard/nav/navbarMobile'
import NavbarDesktop from '@components/dashboard/nav/navbarDesktop';
import MainDashboard from '@components/dashboard/main';
import NavbarMobileButton from '@components/dashboard/nav/navbarMobileButton';

const navigation = [
    { name: 'Todos', href: '#', icon: BuildingOffice2Icon, current: true },
    { name: 'HDI Seguros', href: '#', icon: BuildingOfficeIcon, current: false },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Dashboard(): JSX.Element {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

    return (
        <>
            <div>
                {/* Navbar for mobile version */}
                <NavbarMobile
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    classNames={classNames}
                    navigation={navigation}
                />

                {/* Static sidebar for desktop */}
                <NavbarDesktop
                    classNames={classNames}
                    navigation={navigation}
                />
                <div className="flex flex-1 flex-col md:pl-64">
                    {/* Button to open MobileNavbar */}
                    <NavbarMobileButton
                        setSidebarOpen={setSidebarOpen}
                    />
                    {/* Contenido principal */}
                    <MainDashboard />
                </div>
            </div>
        </>
    )
}
