import Link from "next/link";
import { useRouter } from "next/router";

const Title = () => {

    const router = useRouter()

    const { pathname } = router;

    return (
        <>

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                {/* 
                    Logo here 
                    Use Next Image module
                    */}

                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Or{' '}
                    {
                        pathname == "/auth/login" ? (
                            <Link href={"/auth/register"} className="font-medium text-indigo-600 hover:text-indigo-500">
                                register your account
                            </Link>
                        ) : (
                            <Link href={"/auth/login"} className="font-medium text-indigo-600 hover:text-indigo-500">
                                login into your account
                            </Link>
                        )
                    }
                </p>
            </div>
        </>
    )
}

export default Title;