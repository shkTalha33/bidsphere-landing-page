"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { CiShop } from "react-icons/ci";
import { FaHouse } from "react-icons/fa6";
import { HiUser } from "react-icons/hi";
import { IoVideocam } from "react-icons/io5";
import { RiSearch2Line } from "react-icons/ri";

const BottomNavItem = ({ icon, name, path = '/', isActive = false }) => {
  return (
    <>
      <Link className={`text-[#BFBFBF] ${isActive && 'active'} text-center flex items-center flex-col text-xs`} href={path} >
        {icon}
        {name}
      </Link>
    </>
  )
}

const MobileNav = () => {
  const pathname = usePathname();
  const { t } = useTranslation();

  const itemsData = [
    { icon: <FaHouse size={22} />, name: t('nav.home'), path: '/' },
    { icon: <RiSearch2Line size={22} />, name: t('nav.search'), path: '/product' },
    { icon: <CiShop size={22} />, name: 'Influencer', path: '/shop' },
    { icon: <IoVideocam size={22} />, name: t('nav.channel'), path: '/live' },
    // { icon: <HiUser size={20} />, name: t('nav.profile'), path: '/profile' },
  ];

  return (
    <div className="min-sm-hidden bottom-navbar">
      <div className="flex justify-around w-100 gap-3 items-center px-2">
        {itemsData?.map((item, index) => (
          <Fragment key={index}>
            <BottomNavItem icon={item.icon} isActive={pathname === item.path} path={item.path} name={item.name} />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;