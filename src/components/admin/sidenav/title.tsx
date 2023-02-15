// UI
import Logo from '@components/logo'
import SearchUsers from '../searchUsers';

export default function title() {
    return (
        <div className="px-6 pb-4">
            <Logo />
            <h2 className="text-lg font-medium text-gray-900 mb-2">Panel de administrador</h2>
            <SearchUsers />
        </div>
    )
}
