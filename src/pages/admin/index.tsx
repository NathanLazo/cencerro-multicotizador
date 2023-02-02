import { type GetServerSideProps, type NextPage } from "next";
import Head from "next/head";
import { getSession, useSession } from "next-auth/react";
import { api } from "@utils/api";
import z from "zod";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import AdminContainer from "@components/admin/container"

const Home: NextPage = () => {


    const session = useSession();
    const router = useRouter();

    const userSchema = z.object({
        email: z.string().email(),
        name: z.string(),
        image: z.string(),
        id: z.string()
    });


    if (session.status === "authenticated") {
        const user = userSchema.parse(session.data.user);
        const { data, error } = api.userData.getUserData.useQuery({ email: user.email });
        if (error) {
            toast.error("Error al obtener los datos del usuario");
            console.log(error);
        } else if (data) {
            if (data.accessGranted && data.isAdministrator) {
                return (
                    <>
                        <Head>
                            <title>Panel de administrador</title>
                            <meta name="description" content="Multicotizador de seguros creado por Cencerro" />
                        </Head>
                        <AdminContainer />
                    </>
                );
            } else {
                toast.error("No tiene acceso a esta página");
                return (
                    <>
                        <Head>
                            <title>No tiene acceso</title>
                        </Head>
                    </>
                );
            }
        }
    } else {
        toast.error("No se ha podido obtener la sesión, vuelva a iniciar sesión");
        router.push("/auth/login");
    }

    return <></>
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

export default Home;

