import Link from "next/link";
import { useRouter } from "next/router";

const Title = () => {

    const router = useRouter()

    const { pathname } = router;

    return (
        <>

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h3 className="text-4xl flex justify-center items-center">🔐</h3>

                <h4 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">

                    {
                        pathname == "/auth/login" ? (
                            <>Inicia sesión con tu cuenta</>
                        ) : (
                            <>Registra tu cuenta</>
                        )
                    }
                </h4>
                <p className="mt-2 text-center text-sm text-gray-600">
                    O{' '}
                    {
                        pathname == "/auth/login" ? (
                            <Link href={"/auth/register"} className="font-medium text-indigo-600 hover:text-indigo-500">
                                registra tu cuenta
                            </Link>
                        ) : (
                            <Link href={"/auth/login"} className="font-medium text-indigo-600 hover:text-indigo-500">
                                inicia sesión con tu cuenta
                            </Link>
                        )
                    }
                </p>
            </div>
        </>
    )
}

export default Title;