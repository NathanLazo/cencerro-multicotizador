import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { api } from '@utils/api';
import { useState } from "react";
import { toast } from "react-hot-toast";


const AllCars = () => {

    const [selectedYear, setSelectedYear] = useState<string>("");
    const [selectedBrand, setSelectedBrand] = useState<string>("");
    const [selectedModel, setSelectedModel] = useState<string>("");
    const [selectedSubModel, setSelectedSubModel] = useState<string>("");

    const years = api.insuranceData.getYears.useQuery().data;

    const brand = api.insuranceData.getBrands.useQuery({
        year: selectedYear
    }).data;

    const models = api.insuranceData.getModels.useQuery({
        brand: selectedBrand
    }).data

    const subModels = api.insuranceData.getSubModels.useQuery({
        model: selectedModel
    }).data
    console.log("🚀 ~ file: all.tsx:26 ~ AllCars ~ subModel:", subModels)


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!selectedYear || !selectedBrand || !selectedModel || !selectedSubModel) {
            toast.error("Por favor seleccione todos los campos");
            return;
        }

        // QUERY TO ALL INSURANCES
        toast.success("Peticion enviada aguarde un momento...");
    }

    return (
        <form className="space-y-8 divide-y divide-gray-200" onSubmit={handleSubmit}>
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                <div className="space-y-6 sm:space-y-5">
                    <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Todas las aseguradoras</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Aquí puedes hacer peticiones a todas las aseguradoras que tenemos registradas en el sistema.
                        </p>
                    </div>

                    <div className="space-y-6 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="about" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Año
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <select
                                    id="year"
                                    name="year"
                                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                >
                                    <option value={""}>Not selected</option>
                                    {
                                        years?.map((year) => {
                                            return (
                                                <option key={year.year}>{year.year}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="about" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Marcas
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <select
                                    id="brand"
                                    name="brand"
                                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                    onChange={(e) => setSelectedBrand(e.target.value)}
                                >
                                    <option value={""}>Not selected</option>
                                    {
                                        brand?.map((brand) => {
                                            return (
                                                <option
                                                    key={brand.brand}
                                                    value={brand.id}
                                                >
                                                    {brand.brand}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="about" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Modelos
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <select
                                    id="type"
                                    name="type"
                                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                    onChange={(e) => setSelectedModel(e.target.value)}
                                >
                                    <option value={""}>Not selected</option>
                                    {
                                        models?.map((model) => {
                                            return (
                                                <option
                                                    key={model.model}
                                                    value={model.id}
                                                >
                                                    {model.model}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="about" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Sub-modelos
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <select
                                    id="type"
                                    name="type"
                                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                    onChange={(e) => setSelectedSubModel(e.target.value)}
                                >
                                    <option value={""}>Not selected</option>
                                    {
                                        subModels?.map((subModel) => {
                                            return (
                                                <option
                                                    key={subModel.modelId}
                                                    value={subModel.modelId}
                                                >
                                                    {subModel.subModel}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-5">
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        <MagnifyingGlassIcon className="h-5 w-5 mr-2" /> Search
                    </button>
                </div>
            </div>
        </form>
    )
}


export default AllCars;