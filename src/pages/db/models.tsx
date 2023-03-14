import type { NextPage } from "next";
import { api } from "@utils/api";
import json from "@json/chubb.json";
import { type Car } from "../../json/types";

const Db: NextPage = () => {
    const modelMutation = api.insuranceData.addModel.useMutation();
    const years = api.insuranceData.getYears.useQuery().data;
    const brands = api.insuranceData.getAllBrands.useQuery().data;

    /* 
        JSON comes in this way:
        [
            "car": 8609,
            "brand": "VOLVO",
            "type": "XC90",
            "model": "XC90 T8 RECHARGE ULTIMATE DARK L4 FSI AUT 5 ABS CA CE PIEL SM CQ CB",
            "year": 2023
        ]
    */

    type Models = {
        model: string;
        brand: string;
        year: string;
    }[];


    // CSV to JSON, filter and save in db
    const postModels = async (jsonData: []) => {
        const models: Models = [];

        // Save data in array 'models' to delete duplicates
        jsonData.map((car: Car) => {
            models.push({
                model: car.type.toString(),
                brand: car.brand.toString(),
                year: car.year.toString()
            });
        });

        // delete duplicates
        let filteredModels: Models = [];

        const set = new Set(models.map((el) => JSON.stringify(el)));
        filteredModels = Array.from(set).map((el) => JSON.parse(el));

        // save in array
        const modelsArray: {
            model: string;
            brand: string;
        }[] = [];
        years?.map((year) => {
            const selectedBrands = brands?.filter((brand) => brand.yearId === year.year);
            selectedBrands?.map((brand) => {
                const selectedModels = filteredModels.filter((model) => model.brand === brand.brand && model.year === year.year);
                selectedModels.map((model) => {
                    modelsArray.push({
                        model: model.model,
                        brand: brand.id,
                    });
                });
            });
        });

        // post to db
        let count = 0;
        const timerId = setInterval(() => {
            const model = modelsArray[count]?.model;
            const brand = modelsArray[count]?.brand;
            if (!model || !brand) return;
            modelMutation.mutate({
                model: model,
                brand: brand,
            });
            count++;
            if (count === modelsArray.length) {
                clearInterval(timerId);
            }
        }, 200);
    };

    return (
        <>
            <div className="border py-4 px-36 my-2">
                <div className="mt-8 gap-4 flex flex-col justify-center items-center">
                    <h4 className="text-xl font-bold mb-2">YEAR_BRAND_MODEL</h4>
                    <button
                        onClick={() => postModels(json as [])}
                        className="border border-gray-700 rounded-md px-2 w-96 py-1 focus:border-blue-500"
                    >
                        Post models (Chubb)
                    </button>

                </div>
            </div>
        </>
    )
}

export default Db