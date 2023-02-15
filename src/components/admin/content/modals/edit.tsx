import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { PaintBrushIcon } from '@heroicons/react/24/outline'
import { type User } from '@prisma/client'
import { useForm } from "react-hook-form";
import { type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@utils/api";


const EditModal: React.FC<{
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    user: User
}> = ({
    open,
    setOpen,
    user
}) => {



        const formObjectValidation = z.object({
            name: z.string(),
            image: z.string().optional(),
        });



        type FormObjectValidation = z.infer<typeof formObjectValidation>;

        const createUserMutation = api.userData.updateUser.useMutation();

        const { register, handleSubmit, formState: { errors } } = useForm<FormObjectValidation>({
            resolver: zodResolver(formObjectValidation),
            values: {
                name: user.name,
                image: user.image || "",
            }
        });

        const onSubmit: SubmitHandler<FormObjectValidation> = (data) => {
            createUserMutation.mutate({
                email: user.email,
                name: data.name,
                image: data.image,
            })
            setOpen(false);
        };

        console.log(errors);


        return (
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                    <form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <PaintBrushIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                            </div>

                                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                                    Editar
                                                </Dialog.Title>
                                                <p className="text-sm text-gray-500">
                                                    Aquí puedes editar el contenido del usuario seleccionado.
                                                    todos los cambios tendrán un efecto inmediato en la pagina.
                                                </p>
                                                <input
                                                    type="text"
                                                    className="mt-2 w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                                    placeholder="name"
                                                    {...register("name")}
                                                />
                                                <input
                                                    type="text"
                                                    className="mt-2 w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                                    placeholder="image"
                                                    {...register("image")}
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-5 sm:mt-4 sm:ml-10 sm:flex sm:pl-4">
                                            <button
                                                type="submit"
                                                className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
                                            >
                                                Editar!
                                            </button>
                                            <button
                                                type="button"
                                                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                                onClick={() => setOpen(false)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        )
    }

export default EditModal
