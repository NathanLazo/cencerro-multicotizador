import { useState } from 'react'
import {
    BuildingOfficeIcon,
    BuildingOffice2Icon
} from '@heroicons/react/24/outline'
import MobileNav from '@components/dashboard/nav/mobileNav'
import DesktopNav from '@components/dashboard/nav/desktopNav';
import Dashboard from '@components/dashboard/dashboard';
import MobileNavButton from '@components/dashboard/nav/mobileNavButton';

const navigation = [
    { id: 1, name: 'Todos', href: '#', icon: BuildingOffice2Icon, current: true },
    { id: 2, name: 'HDI Seguros', href: '#', icon: BuildingOfficeIcon, current: false },
    { id: 3, name: 'Afirme seguros', href: '#', icon: BuildingOfficeIcon, current: false },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const DashboardContainer: React.FC<{
    name: string,
    image: string | null,
    isAdministrator: boolean,
}> = ({
    name, // This is the name of the user
    image, // This is the image of the user
    isAdministrator, // This is a boolean that indicates if the user is an administrator
}) => {
        const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
        const [navbarState, setNavbarState] = useState<number>(1);

        console.log(name, image, isAdministrator);

        return (
            <>
                <div className='bg-gray-100 h-screen'>
                    {/* Mobile navigation */}
                    <MobileNav
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        classNames={classNames}
                        navigation={navigation}
                        navbarState={navbarState}
                        setNavbarState={setNavbarState}
                    />

                    {/* Desktop navigation */}
                    <DesktopNav
                        classNames={classNames}
                        navigation={navigation}
                        navbarState={navbarState}
                        setNavbarState={setNavbarState}
                        userImage={image}
                        userName={name}
                        isAdministrator={isAdministrator}
                    />
                    <div className="flex flex-1 flex-col md:pl-64">
                        {/* Button to open MobileNav */}
                        <MobileNavButton
                            setSidebarOpen={setSidebarOpen}
                        />
                        {/* Contenido principal */}
                        <Dashboard />
                    </div>
                </div>
            </>
        )
    }

export default DashboardContainer;
