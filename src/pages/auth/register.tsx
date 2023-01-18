
import OAuth from '@components/auth/oAuth';
import RegisterComponent from '@components/auth/register';
import Title from '@components/auth/title';
const Register: React.FC = () => {

    return (
        <>
            <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">

                <Title />

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <RegisterComponent />
                        <OAuth />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;