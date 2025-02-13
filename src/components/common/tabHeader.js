'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useSelector } from 'react-redux'
const tabData = [
  { label: 'Edit Profile', path: '/profile/detail' },
  { label: 'Change Password', path: '/profile/change-password' },
  { label: 'Add Address', path: '/profile/add-address' },
  { label: 'Change Language', path: '/profile/select-language' },
]
const tabData2 = [
  { label: 'Edit Profile', path: '/vender/profile/detail' },
  { label: 'Change Password', path: '/vender/profile/change-password' },
  { label: 'Add Address', path: '/vender/profile/add-address' },
  { label: 'Change Language', path: '/vender/profile/select-language' },
]
const TabHeader = () => {
  const userData = useSelector((state) => state.auth?.userData)
  const pathname = usePathname()
  const tabList = userData?.role === 'customer' ? tabData : tabData2
  return (
    <div className='sm:flex max-sm:hidden justify-around mt-3'>
      {tabList.map((item, index) => (
        <Link href={item.path} key={index} className={`tab-header ${pathname === item.path && 'active'} popins_medium w-100 text-center pb-2 max-lg:text-xs max-xl:text-sm`}>
          {item.label}
        </Link>
      ))}
    </div>
  )
}

export default TabHeader