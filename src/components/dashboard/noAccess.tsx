
import { XCircleIcon } from '@heroicons/react/20/solid'


const NoAccess: React.FC<{ email: string | null }> = ({
    email
}) => {

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Usted no tiene acceso a esta pagina</h3>
                            <div className="mt-2 text-sm text-red-700">
                                <ul role="list" className="list-disc space-y-1 pl-5">
                                    <li>Por favor contacte a un administrador para que le de acceso a la plataforma</li>
                                    <li>Proporcione su correo al administrador para poder darlo de alta</li>

                                </ul>
                            </div>
                            <br />
                            <code className='select-all bg-gray-800 text-white px-2 py-1 rounded-xl flex justify-center'>{email ? email : 'email no encontrado'}</code>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoAccess;
