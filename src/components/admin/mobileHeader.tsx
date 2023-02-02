import Logo from "@components/logo"

const MobileHeader: React.FC = () => {
    return (
        <div className="xl:hidden">
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4">
                <div>
                    <Logo />
                </div>
            </div>
        </div>
    )
}

export default MobileHeader
