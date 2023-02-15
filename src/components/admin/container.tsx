// UI
import MobileHeader from './mobile/mobileHeader';
import ProfileHeader from './content/profileHeader';
import ProfileTabs from './content/profileTabs';
import Title from './sidenav/title';

import { toast } from 'react-hot-toast';

// Types
import { type User } from '@prisma/client';

// State management
import { useState } from 'react';

// API
import { api } from '@utils/api';
import ProfileDescription from './content/profileDescription';
import SideNav from './sidenav';



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
                    <div className="relative z-0 flex flex-1 overflow-hidden">
                        {/* Main content || profile info and CRUD */}
                        <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none lg:order-last">
                            <article className="hidden lg:block">
                                {/* User things here */}
                                {selectedUser && <ProfileHeader selectedUser={selectedUser} />}
                                {selectedUser && <ProfileTabs selectedUser={selectedUser} />}
                                {selectedUser && <ProfileDescription selectedUser={selectedUser} />}
                            </article>
                        </main>
                        {/* Main content ends */}


                        {/* Side nav starts */}
                        <aside className="hidden w-96 flex-shrink-0 border-r border-gray-200 lg:order-first lg:flex lg:flex-col">
                            <Title />
                            {data && <SideNav data={data} setSelectedUser={setSelectedUser} />}
                        </aside>
                        {/* Side nav ends */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Container
