import type { NextPage } from "next";
import { api } from "@utils/api";
import json from "@json/chubb.json";
import { Car } from "./types";

const Db: NextPage = () => {
    const subModelMutation = api.insuranceData.addSubModel.useMutation();
    const model = api.insuranceData.getAllModels.useQuery().data;

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
    }

    const postSubModels = async (jsonData: []) => {
        // Save data in array 'models'

        let subModels: SubModel[] = [];
        jsonData.map((car: Car) => {
            subModels = [...subModels, {
                subModel: car.model.toString(),
                model: car.type.toString()
            }]
        });

        console.log(subModels);

    }

    return (
        <>
            <div className="border py-4 px-36 my-2">
                <div className="mt-8 gap-4 flex flex-col justify-center items-center">
                    <h4 className="text-xl font-bold mb-2">YEAR_BRAND_MODEL</h4>
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