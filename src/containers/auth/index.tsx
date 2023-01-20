
import OAuth from '@components/auth/oAuth';
import Title from '@components/auth/title';
import { type ReactNode } from 'react';
import NavContainer from '@containers/home/nav';


type Props = {
    element: ReactNode
}

const AuthContainer: React.FC<Props> = ({
    element
}) => {

    return (
        <>
            <div className="flex min-h-full flex-col justify-center pb-12">
                <div className='mb-4 px-6 pt-6 lg:px-8'>
                    <NavContainer />
                </div>

                <Title />

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        {element}
                        <OAuth />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AuthContainer;