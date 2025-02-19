'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'

const navItems = [
    { label: 'Personal Information', path: '/profile/personal-information' },
    { label: 'Won Lots', path: '/profile/won-lots' },
    { label: 'Help Centre', path: '/profile/help-center' },
    { label: 'Privacy Policy', path: '/profile/privacy-policy' },
    { label: 'Terms & Conditions', path: '/profile/terms-condition' },
];
const TabHeader = () => {
    const userData = useSelector((state) => state.auth?.userData)
    const pathname = usePathname()


    return (
        <div className="rounded flex h-100 flex-col gap-2 p-3 bg-white">
            {navItems.map((item, index) => (
                <Link
                    key={index}
                    href={item.path}
                    className={`
              block py-3 px-6 text-lg rounded-lg popins_medium
              ${pathname === item.path
                            ? 'bg-emerald-400 text-white'
                            : 'bg-gray-50 text-gray-800 hover:bg-gray-100 border-b border-gray-200'
                        }
              transition-colors duration-200
            `}
                >
                    {item.label}
                </Link>
            ))}
        </div>
    )
}

export default TabHeader