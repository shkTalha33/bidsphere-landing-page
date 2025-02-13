'use client'
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Dropdown, Space } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container, Navbar, } from 'react-bootstrap';
import { Menu } from 'react-feather';
import { BiUser } from "react-icons/bi";
import { BsShop } from 'react-icons/bs';
import { TbLogout } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { avataruser } from '../assets/icons/icon';
import { setLogout } from '../redux/loginForm';
import { setToggle } from '../redux/sidebarRedux';
import BackNavHeader from './backNavHeader';
import './navbar.scss';
import ProfileHeader from './profileHeader';

const InfluencerHeader = () => {
  const pathname = usePathname()
  const isLogin = useSelector(state => state.auth.isLogin)
  const userData = useSelector(state => state.auth.userData)
  const dispatch = useDispatch()
  const isToggle = useSelector(state => state.sidebar.toggle)

  const items = [
    // {
    //   key: '1',
    //   label: <Link href={'/vender/profile/detail'}>Profile</Link>,
    //   icon: <BiUser size={18} />
    // },
    {
      key: '2',
      label: userData?.role === 'influencer' ? <Link href={'/vender/my-store'}>My Shop</Link> : <Link href={'/vender/my-store'}>My Store</Link>,
      icon: <BsShop size={18} />
    },
    {
      key: '6',
      label: <Link onClick={() => dispatch(setLogout())} href={'/auth/login'}>Logout</Link>,
      icon: <TbLogout size={18} />
    },
  ];
  return (
    <>
      <Navbar bg="white" sticky='top' className='main_nav border-b flex-column max-sm-hidden px-sm-1 py-1 ' style={{ zIndex: '998' }} id="navbar">
        <Container fluid={'xxl'} className='px-3 py-2 gap-4' id='nav_id'>
          <button
            className="lg:hidden text-muted"
            onClick={() => dispatch(setToggle(!isToggle))}
          >
            <Menu size={28} />
          </button>
          <div className='flex gap-2 text-[#818181] ms-auto'>
            <Dropdown
              menu={{ items }}
            >
              <Space className=''>
                <div className="flex cursor-pointer gap-2 items-center w-fit">
                  <div>

                    <Image src={avataruser} width={40} height={40} style={{ borderRadius: '50%', objectFit: 'cover' }} alt="" />
                  </div>
                  <div className="text-[#474747]">
                    <h6 className="popins_medium mb-0 text-sm">Good  Morning</h6>
                    <h6 className="popins_light mb-0 text-xs ">William John</h6>
                  </div>
                </div>
              </Space>
            </Dropdown>
          </div>
        </Container>
      </Navbar >
      {pathname === '/' ? (
        <ProfileHeader />
      ) : (
        <BackNavHeader name={pathname.split('?')[0].replace('-', ' ').split('/')[1]} />
      )}
    </>

  )
}

export default InfluencerHeader