
import RegisterComponent from '@components/auth/register';
import AuthContainer from '@containers/auth';
import { type NextPage } from "next";
import Head from 'next/head';


const Login: NextPage = () => {


    return (
        <>
            <Head>
                <title>Multicotizador de seguros</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AuthContainer
                element={<RegisterComponent />}
            />
        </>
    );
};

export default Login;