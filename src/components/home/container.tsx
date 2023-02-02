import Background from '@components/home/background'
import MainContent from '@components/home/main'
import NavContainer from '@components/nav/navContainer'


const HomePage: React.FC = () => {

    return (
        <>
            <main className="">
                <div className="isolate bg-white">
                    <Background />
                    <div className="px-6 pt-6 lg:px-8">
                        <NavContainer />
                    </div>
                    <div>
                        <MainContent />
                    </div>
                </div>
            </main>
        </>
    )
}

export default HomePage;