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
            </div>
        </>
    )
}

export default Title;