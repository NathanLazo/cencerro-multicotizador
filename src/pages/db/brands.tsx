import type { NextPage } from "next";
import { api } from "@utils/api";
import json from "@json/chubb.json";
import { Car } from "./types";

const Db: NextPage = () => {
    const brandMutation = api.insuranceData.addBrand.useMutation();

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

    // CSV to JSON and filter
    type Brands = {
        brand: string;
        year: string;
    }[];

    const postBrands = async (jsonData: []) => {
        const brands: Brands = [];

        // Save data in array 'brands'
        jsonData.map((car: Car) => {
            brands.push({
                brand: car.brand,
                year: car.year.toString()
            });
        });


        // delete duplicates
        let filteredBrands: Brands = [];

        const set = new Set(brands.map((el) => JSON.stringify(el)));
        filteredBrands = Array.from(set).map((el) => JSON.parse(el));

        // sort by year
        filteredBrands.sort((a, b) => {
            if (a.year < b.year) {
                return -1;
            }
            if (a.year > b.year) {
                return 1;
            }
            return 0;
        });

        // post to db
        let count = 0;
        const timerId = setInterval(() => {
            const data = filteredBrands[count];
            if (!data) return;

            brandMutation.mutate(data);

            console.log(`On ${count} of ${filteredBrands.length} we have added ${data}`);
            count++;
            if (count === filteredBrands.length) {
                clearInterval(timerId);
            }
        }, 200);
    };


    return (
        <>
            <div className="border py-4 px-36 my-2">
                <div className="mt-8 gap-4 flex flex-col justify-center items-center">
                    <h4 className="text-xl font-bold mb-2">BRANDS_YEAR</h4>
                    <button
                        onClick={() => postBrands(json as [])}
                        className="border border-gray-700 rounded-md px-2 w-96 py-1 focus:border-blue-500"
                    >
                        Post brands (Chubb)
                    </button>

                </div>
            </div>
        </>
    )
}

export default Db