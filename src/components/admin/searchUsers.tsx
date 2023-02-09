import { ArrowPathIcon, MagnifyingGlassIcon, UsersIcon } from '@heroicons/react/20/solid'


// router
import { useRouter } from 'next/router';

const SearchUsers: React.FC = () => {

    const router = useRouter();

    return (
        <div>
            <div className='flex justify-between'>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Buscar usuarios
                </label>
                <button className="flex text-sm font-medium text-gray-700"
                    onClick={() => {
                        router.reload();
                    }}
                >
                    <ArrowPathIcon className='w-5 h-5 pr-1' /> recargar
                </button>
            </div>
            <div className="mt-1 flex rounded-md shadow-sm">
                <div className="relative flex flex-grow items-stretch focus-within:z-10">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <UsersIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="block w-full rounded-none rounded-l-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="ejemplo@hotmail.com"
                        onChange={
                            (e) => {
                                console.log(e.target.value);
                            }
                        }
                    />
                </div>
                <button
                    type="button"
                    className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span>Buscar</span>
                </button>
            </div>
        </div>
    )
}

export default SearchUsers
