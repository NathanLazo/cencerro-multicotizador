import { useForm } from "react-hook-form";
import { type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-hot-toast";

const RegisterComponent: React.FC = () => {

    const formObjectValidation = z.object({
        email: z.string().email(),
        name: z.string(),
        password: z.string()
            .regex(new RegExp(".*[A-Z].*"), "Debe contener una mayúscula")
            .regex(new RegExp(".*[a-z].*"), "Debe contener una minúscula")
            .regex(new RegExp(".*\\d.*"), "Debe contener un numero")
            .regex(
                new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
                "Debe contener un carácter especial"
            )
            .min(8, "Must be at least 8 characters in length"),
        password_confirmation: z.string(),
        remember_me: z.boolean()
    }).refine((data) => data.password === data.password_confirmation, {
        path: ["password_confirmation"],
    });



    type FormObjectValidation = z.infer<typeof formObjectValidation>;


    const { register, handleSubmit, formState: { errors } } = useForm<FormObjectValidation>({
        resolver: zodResolver(formObjectValidation),
    });
    const onSubmit: SubmitHandler<FormObjectValidation> = (data) => {
        toast.success("Registrado correctamente!!");
        // send to next auth
    };

    if (errors.email?.message) toast.error("Email no valido");
    if (errors.name?.message) toast.error("Nombre no valido");
    if (errors.password?.message) toast.error(`${errors.password?.message}`);
    if (errors.password_confirmation?.message) toast.error("Las contraseñas no coinciden");

    return (
        <>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                    </label>
                    <div className="mt-1">
                        <input
                            id="email"
                            {...register("email")}
                            type="email"
                            autoComplete="email"
                            required
                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Complete name
                    </label>
                    <div className="mt-1">
                        <input
                            id="name"
                            {...register("name")}
                            type="text"
                            autoComplete="name"
                            required
                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <div className="mt-1">
                        <input
                            id="password"
                            placeholder="********"
                            {...register("password")}
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="tooltip-inner block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>
                < div >
                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <div className="mt-1">
                        <input
                            placeholder="********"
                            id="password_confirmation"
                            {...register("password_confirmation")}
                            type="password"
                            autoComplete="current-password"
                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            {...register("remember_me")}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                            Remember me
                        </label>
                    </div>

                    <div className="text-sm">
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Forgot your password?
                        </a>
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Sign in
                    </button>
                </div>
            </form>
        </>
    )
}

export default RegisterComponent;