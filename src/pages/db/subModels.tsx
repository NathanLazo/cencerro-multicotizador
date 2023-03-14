import type { NextPage } from "next";
import { api } from "@utils/api";
import json from "@json/chubb.json";
import { type Car } from "../../json/types";

const Db: NextPage = () => {
    const subModelMutation = api.insuranceData.addSubModel.useMutation();

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



    type SubModel = {
        subModel: string;
        model: string;
        brand: string;
        year?: string;
    }

    const postSubModels = async (jsonData: []) => {
        // Save data in array 'models'

        let subModels: SubModel[] = [];
        jsonData.map((car: Car) => {
            subModels = [...subModels, {
                subModel: car.model.toString(),
                model: car.type.toString(),
                brand: car.brand.toString(),
                year: car.year.toString()
            }]
        });


        // post to db
        let count = 0;
        const timerId = setInterval(() => {
            const subModel = subModels[count]?.subModel;
            const model = subModels[count]?.model;
            const brand = subModels[count]?.brand;
            const year = subModels[count]?.year;
            if (!model || !brand || !subModel || !year) return;
            subModelMutation.mutate({
                subModel: subModel,
                model: model,
                brand: brand,
                year: year
            });
            count++;
            if (count === subModels.length) {
                clearInterval(timerId);
            }
        }, 200);



    }

    return (
        <>
            <div className="border py-4 px-36 my-2">
                <div className="mt-8 gap-4 flex flex-col justify-center items-center">
                    <h4 className="text-xl font-bold mb-2">MODEL_SUBMODELS</h4>
                    <button
                        onClick={() => postSubModels(json as [])}
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