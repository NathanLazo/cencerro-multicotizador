
import { type User } from '@prisma/client';

const ProfileHeader: React.FC<{
    selectedUser: User
}> = ({
    selectedUser
}) => {
        return (
            <div>
                <div>
                    <img className="h-32 w-full object-cover lg:h-48" src="https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" alt="" />
                </div>
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                        <div className="flex">
                            <img
                                className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                                src={selectedUser.image || ''}
                                alt=""
                            />
                        </div>
                        <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                            <div className="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                                <h1 className="truncate text-2xl font-bold text-gray-900">{selectedUser.name}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
                        <h1 className="truncate text-2xl font-bold text-gray-900">{selectedUser.name}</h1>
                    </div>
                </div>
            </div>
        )
    }

export default ProfileHeader