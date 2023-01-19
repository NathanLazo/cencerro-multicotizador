import DashboardContainer from "@containers/dashboard";
import { type NextPage } from "next";
import Head from "next/head";

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

export default Dashboard;