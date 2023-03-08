import type { NextPage } from "next";
import { api } from "@utils/api";
import { useState } from "react";

const Db: NextPage = () => {
    const yearMutation = api.insuranceData.addYear.useMutation();

    const [year, setYear] = useState<string>("");

    const postYears = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (year.length < 4) return
        yearMutation.mutate({ year });
    }


    return (
        <>
            <div className="border py-4 px-36 my-2">
                <form onSubmit={postYears}>
                    <div className="flex flex-col items-center w-full gap-4">
                        <h4 className="text-xl font-bold">ADD_YEARS</h4>
                        <input
                            type="text"
                            name="year"
                            id="year"
                            placeholder="Year"
                            className="border rounded-md w-96"
                            onChange={(e) => setYear(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="border rounded-md px-2 py-1"
                        >
                            submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Db