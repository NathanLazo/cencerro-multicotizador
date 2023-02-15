import Logo from '@components/logo';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { type SVGProps } from 'react'
import { useRouter } from 'next/router';
import { User } from '@prisma/client';
import Avatar from 'boring-avatars';

type Props = {
    classNames: (...classes: string[]) => string
    navigation: {
        id: number
        name: string;
        href: string;
        icon: (props: SVGProps<SVGSVGElement> & {
            title?: string | undefined;
            titleId?: string | undefined;
        }) => JSX.Element;
        current: boolean;
    }[]
    navbarState: number
    setNavbarState: (val: number) => void
    user: User
};

const NavbarDesktop: React.FC<Props> = ({
    classNames,
    navigation,
    navbarState,
    setNavbarState,
    user
}) => {

    const router = useRouter();

    return (
        <>
            <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
                    <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                        <div className="flex flex-shrink-0 items-center px-4">
                            <Logo />
                        </div>
                        <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
                            {navigation.map((item) => (
                                <button
                                    key={item.name}
                                    className={classNames(
                                        navbarState === item.id ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full'
                                    )}
                                    onClick={() => {
                                        setNavbarState(item.id)
                                    }}
                                >
                                    <item.icon
                                        className={classNames(
                                            navbarState === item.id ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                                            'mr-3 flex-shrink-0 h-6 w-6'
                                        )}
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </button>
                            ))}
                        </nav>
                    </div>
                    <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                        <div className="group block w-full flex-shrink-0">
                            <div className="flex items-center">
                                <div>
                                    {
                                        user.image !== null
                                            ? <Image
                                                className="rounded-full"
                                                src={user.image}
                                                alt="User image"
                                                width={40}
                                                height={40}
                                            />
                                            : <Avatar
                                                size={40}
                                                name={user.name || 'random'}
                                                variant="beam"
                                            />
                                    }
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                    {user.isAdministrator && (<button className="text-xs font-medium text-gray-400 hover:text-gray-800"
                                        onClick={
                                            () => {
                                                router.push('/admin')
                                            }
                                        }
                                    >
                                        Admin panel
                                    </button>
                                    )}
                                    <br />
                                    <button className="text-xs font-medium text-gray-400 hover:text-gray-800"
                                        onClick={
                                            () => {
                                                signOut()
                                            }
                                        }
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavbarDesktop;