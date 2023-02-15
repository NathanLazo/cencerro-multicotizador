import type { NextPage } from "next";
import { api } from "@utils/api";

const Db: NextPage = () => {
    const yearMutation = api.insuranceData.addYear.useMutation();
    const handleSubmitYears = async (e: any) => {
        e.preventDefault();
        const year: string = e.target.years.value;
        yearMutation.mutate({ year });
    }
    return (
        <>
            <div className="border py-4 px-36">
                <form onSubmit={handleSubmitYears}>
                    <div className="flex flex-col items-center w-full gap-4">
                        <h4 className="text-xl font-bold">Years</h4>
                        <input
                            type="text"
                            name="years"
                            id="years"
                            className="border rounded-md w-full"
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