import { Bars3Icon } from '@heroicons/react/24/outline';
import Logo from '@components/logo'
import Link from 'next/link';


type Props = {
    setMobileMenuOpen: (val: boolean) => void
    navigation: {
        name: string;
        href: string;
    }[]
};

const NavbarDesktop: React.FC<Props> = ({
    setMobileMenuOpen,
    navigation
}) => {

    return (
        <>
            <nav className="flex h-9 items-center justify-between" aria-label="Global">
                <div className="flex lg:min-w-0 lg:flex-1" aria-label="Global">
                    <Logo />
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Abrir menu principal</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-center lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link key={item.name} href={item.href} className="font-semibold text-gray-900 hover:text-gray-900">
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-end">
                    <Link
                        href="/auth/login"
                        className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                    >
                        Inicia sesión
                    </Link>
                </div>
            </nav>
        </>
    )
}

export default NavbarDesktop;