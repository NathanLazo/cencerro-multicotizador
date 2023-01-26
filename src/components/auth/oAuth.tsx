import { signIn } from "next-auth/react";


const OAuth: React.FC = () => {



    return (
        <>
            <div className="mt-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">Or continue with</span>
                    </div>
                </div>

                <div className="mt-6 flex justify-center">
                    <div>
                        <button
                            className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                            onClick={() => {
                                signIn('google', { callbackUrl: "http://localhost:3000/dashboard" })
                            }}
                        >
                            <span className="sr-only">Sign in with Google</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-google"
                                width={30} height={30} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#9e9e9e" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M17.788 5.108a9 9 0 1 0 3.212 6.892h-8" />
                            </svg>

                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}


export default OAuth;