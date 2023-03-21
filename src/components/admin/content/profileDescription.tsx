
import { type User } from '@prisma/client';

const ProfileDescription: React.FC<{
    selectedUser: User
}> = ({
    selectedUser
}) => {

    const keys = Object.keys(selectedUser)
        const values = Object.values(selectedUser)

        return (
            <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8 mb-12">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    {keys.map((field, index) => (
                        field == 'accessGranted' ? (
                            <div key={`key: ${field}`} className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500 mb-2">{field}</dt>
                                <SwitchComponent value={values[index] as boolean} userId={values[0] as string} />
                            </div>
                        ) : (
                                <div key={`key: ${field}`} className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">{field}</dt>
                                    <dd className="mt-1 text-sm text-gray-900 truncate">{values[index]?.toString()}</dd>
                                </div>
                            )
                    ))}
                </dl>
            </div>
        )
    }

export default ProfileDescription


// This is the code for the button to give users access to the dashboard
import { useState, useEffect } from 'react'
import { Switch } from '@headlessui/react'
import { api } from '@utils/api';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

interface SwitchComponentProps {
    value: boolean
    userId: string
}

const SwitchComponent: React.FC<SwitchComponentProps> = ({
    value,
    userId
}) => {
    const [enabled, setEnabled] = useState(value)

    useEffect(() => {
        setEnabled(value)
    }, [value])

    const giveAccess = api.userData.giveAccess.useMutation();
    const revokeAccess = api.userData.revokeAccess.useMutation();

    const handleChange = async () => {
        if (enabled) {
            await revokeAccess.mutateAsync({
                id: userId
            })
        }
        if (!enabled) {
            await giveAccess.mutateAsync({
                id: userId
            })
        }
        setEnabled(!enabled)
    }

    return (
        <Switch
            checked={value}
            onChange={handleChange}
            className={classNames(
                enabled ? 'bg-indigo-600' : 'bg-gray-200',
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
            )}
        >
            <span className="sr-only">Use setting</span>
            <span
                className={classNames(
                    enabled ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                )}
            >
                <span
                    className={classNames(
                        enabled ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in',
                        'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                    )}
                    aria-hidden="true"
                >
                    <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                        <path
                            d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </span>
                <span
                    className={classNames(
                        enabled ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out',
                        'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                    )}
                    aria-hidden="true"
                >
                    <svg className="h-3 w-3 text-indigo-600" fill="currentColor" viewBox="0 0 12 12">
                        <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                    </svg>
                </span>
            </span>
        </Switch>
    )
}