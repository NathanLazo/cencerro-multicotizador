import { type User } from "@prisma/client";
import Avatar from "boring-avatars";
import Image from "next/image";


const SideNav: React.FC<{
    data: User[];
    setSelectedUser: (user: User) => void;
}> = ({
    data,
    setSelectedUser
}) => {
        return (
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
                                        {
                                            user.image
                                                ? <Image
                                                    className="rounded-full"
                                                    src={user.image}
                                                    alt=""
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
        )
    }

export default SideNav;
