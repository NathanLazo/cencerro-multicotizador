



const ProfileTabs: React.FC = () => {

    return (
        <div className="mt-6 sm:mt-2 2xl:mt-5">
            <div className="border-b border-gray-200">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                        <button
                            className="bg-green-100 text-gray-700 hover:bg-green-200 py-1 px-2 text-sm font-medium rounded-t-md border-b"
                        >
                            Editar
                        </button>

                        <button
                            className="bg-red-100 text-gray-700 hover:bg-red-200 py-1 px-2 text-sm font-medium rounded-t-md border-b"
                        >
                            Eliminar
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default ProfileTabs