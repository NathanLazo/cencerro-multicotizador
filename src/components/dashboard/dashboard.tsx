
import AllInsurances from './forms/all';

const Dashboard: React.FC = () => {

    return (
        <>
            <main className="flex-1">
                <div className="py-6">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 mb-4">
                        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                    </div>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                        {/* Replace with your content */}
                        <AllInsurances />
                        {/* /End replace */}
                    </div>
                </div>
            </main>
        </>
    )
}

export default Dashboard;