import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Logo from '@components/logo'

type Props = {
    mobileMenuOpen: boolean
    setMobileMenuOpen: (val: boolean) => void
    navigation: {
        name: string;
        href: string;
    }[]
};

const NavbarMobile: React.FC<Props> = ({
    mobileMenuOpen,
    setMobileMenuOpen,
    navigation
}) => {
    return (
        <>
            <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <Dialog.Panel className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
                    <div className="flex h-9 items-center justify-between">
                        <div className="flex">
                            <a href="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">Multicotizador de seguros</span>
                                <Logo />
                            </a>
                        </div>
                        <div className="flex">
                            <button
                                type="button"
                                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                            <div className="py-6">
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                                >
                                    Inicia sesión
                                </a>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>

        </>
    )
}

export default NavbarMobile