import { SVGProps } from 'react'

type Props = {
    classNames: (...classes: string[]) => string
    navigation: {
        name: string;
        href: string;
        icon: (props: SVGProps<SVGSVGElement> & {
            title?: string | undefined;
            titleId?: string | undefined;
        }) => JSX.Element;
        current: boolean;
    }[]
};

const NavbarDesktop: React.FC<Props> = ({
    classNames,
    navigation
}) => {
    return (
        <>
            <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
                    <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                        <div className="flex flex-shrink-0 items-center px-4">
                            {/* LOGO HERE */}
                        </div>
                        <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                    )}
                                >
                                    <item.icon
                                        className={classNames(
                                            item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                                            'mr-3 flex-shrink-0 h-6 w-6'
                                        )}
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </a>
                            ))}
                        </nav>
                    </div>
                    <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                        <a href="#" className="group block w-full flex-shrink-0">
                            <div className="flex items-center">
                                <div>
                                    {/* PROFILE IMAGE HERE */}
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Tom Cook</p>
                                    <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">View profile</p>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavbarDesktop;