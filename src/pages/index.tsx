import { type GetServerSideProps, type NextPage } from "next";
import Head from "next/head";
import HomePage from "@components/home/container";
import { getSession } from "next-auth/react";

const Home: NextPage = () => {


  return (
    <>
      <Head>
        <title>Multicotizador de seguros</title>
      </Head>
      <HomePage />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {

  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {}
  }
}


export default Home;

