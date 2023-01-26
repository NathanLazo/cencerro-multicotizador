import DashboardContainer from "@containers/dashboard";
import { type GetServerSideProps, type NextPage } from "next";
import Head from "next/head";

import { getSession } from "next-auth/react";

const Dashboard: NextPage = () => {


    return (
        <>
            <Head>
                <title>Multicotizador de seguros</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <DashboardContainer />
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {

    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: "/auth/login",
                permanent: false,
            },
        };
    }

    return {
        props: {
            session
        }
    }
}

export default Dashboard;