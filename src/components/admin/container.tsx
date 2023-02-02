// UI
import Logo from '@components/logo'
import MobileHeader from './mobileHeader';
import ProfileHeader from './profileHeader';
import ProfileTabs from './profileTabs';
import SearchUsers from './searchUsers';

import Image from 'next/image';
import { toast } from 'react-hot-toast';

// Types
import { type User } from '@prisma/client';

// State management
import { useState } from 'react';

// API
import { api } from '@utils/api';
import ProfileDescription from './profileDescription';


const tabs = [
    { id: 1, name: 'Perfil', current: true },
    { id: 2, name: 'Modificar', current: false },
    { id: 3, name: 'Eliminar', current: false },
]

const Container: React.FC = () => {

    // Users Data
    const { data, error } = api.userData.getAllUsers.useQuery();
    if (error) {
        toast.error('Error al cargar los usuarios');
        console.log(error);
    }

    // User data on Main
    const [selectedUser, setSelectedUser] = useState<User>();

    return (
        <>
            <div className="flex h-full">
                <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                    <MobileHeader />
                    <div className="relative z-0 flex flex-1 overflow-hidden">
                        <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">

                            <div className="flex justify-center items-center px-4 py-3 sm:px-6 lg:px-8 xl:hidden" aria-label="Breadcrumb">
                                <SearchUsers />{/* Mobile search users */}
                            </div>

                            <article>
                                {/* User things here */}

                                {selectedUser && <ProfileHeader selectedUser={selectedUser} />}
                                {selectedUser && <ProfileTabs tabs={tabs} />}
                                {selectedUser && <ProfileDescription selectedUser={selectedUser} />}
                            </article>
                        </main>
                        <aside className="hidden w-96 flex-shrink-0 border-r border-gray-200 xl:order-first xl:flex xl:flex-col">
                            <div className="px-6 pb-4">
                                <Logo />
                                <h2 className="text-lg font-medium text-gray-900 mb-2">Panel de administrador</h2>
                                <SearchUsers /> {/* Desktop search users */}
                            </div>
                            {/* User list */}
                            <nav className="min-h-0 flex-1 overflow-y-auto" aria-label="Users">
                                {data?.map((user) => (
                                    <button key={user.id} className="relative w-full text-left"
                                        onClick={() => setSelectedUser(user)}
                                    >
                                        <div className="sticky top-0 z-10 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                                            <h3>{ }</h3>
                                        </div>
                                        <ul role="list" className="relative z-0 divide-y divide-gray-200">
                                            <li>
                                                <div className="relative flex items-center space-x-3 px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500 hover:bg-gray-50">
                                                    <div className="flex-shrink-0">
                                                        <Image className="rounded-full" width={40} height={40} src={user.image || ''} alt="" />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <a href="#" className="focus:outline-none">
                                                            <span className="absolute inset-0" aria-hidden="true" />
                                                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                                            <p className="truncate text-sm text-gray-500">{user.email}</p>
                                                        </a>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </button>
                                ))}
                            </nav>
                        </aside>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Container
