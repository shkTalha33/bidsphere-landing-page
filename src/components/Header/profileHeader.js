/* eslint-disable no-unused-vars */
import { avataruser } from "@/components/assets/icons/icon";
import { setLogin, setUserData, setUserType } from "@/components/redux/loginForm";
import { message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { MdMenu } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import LanguageSwitcher from "../language-switcher/langauge-switcher";
import NotificationDropdown from "../common/NotificationDropdown";
import { Badge } from "reactstrap";

const ProfileHeader = ({ broken, setToggled, toggled }) => {
    const router = useRouter();
    const [count, setcount] = useState(0)
    const userData = useSelector((state) => state.auth?.userData);
    const isLogin = useSelector((state) => state.auth.isLogin)
    const dispatch = useDispatch();
    const cartItem = useSelector(state => state.cart.cartDetail)

    const handleLogout = () => {
        dispatch(setLogin(false));
        dispatch(setUserType(''));
        dispatch(setUserData(null));
        message.success('Successfully logged out');
        router.push('/', { replace: true });
    };

    return (
        <>
            <Navbar
                bg="white"
                expand="lg"
                sticky="top"
                className="px-2 py-[12px] border-b border-[#E6E6E6] w-[100%] min-sm-hidden"
                id="navbar"
            >
                <Container fluid className="w-full">
                    <div className="flex items-center gap-3 md:w-1/2">
                        {broken && (
                            <button
                                className="sb-button"
                                onClick={() => setToggled(!toggled)}
                            >
                                <MdMenu size={28} />
                            </button>
                        )}
                        <Link href='/' style={{ textDecoration: "none" }} className=' w-100' >
                            <Image width={70} height={37} src='/assets/logo.svg' alt='' className='' />
                        </Link>
                    </div>
                    <Nav className="ms-auto flex">
                        <div className="flex gap-1 justify-center items-center">
                            <LanguageSwitcher />
                            <Link href='/cart' className="relative me-2">
                                <Image src={'/assets/bag.svg'} height={20} width={20} alt='notification' />
                                {cartItem?.length > 0 ?
                                    <div className='absolute -top-3 left-auto -right-1'>
                                        <Badge pill color='danger' style={{ fontSize: '10px' }} >
                                            {cartItem?.length}
                                        </Badge>
                                    </div> : ''}
                            </Link>
                            {!isLogin ?
                                <Link href='/profile'>
                                    <Image width={30} height={30} className="rounded-full object-cover" alt="" src={avataruser} />
                                </Link>
                                :
                                <div onClick={() => router.push('/profile')} className="flex cursor-pointer gap-2 items-center w-fit">
                                    <div>
                                        <Image src={userData?.customer?.profile_image || avataruser} width={40} height={40} style={{ borderRadius: '50%', objectFit: 'cover' }} alt="" />
                                    </div>
                                    {/*<div className="text-[#474747]">
                                         <h6 className="popins_light mb-0 text-sm">Good  Morning</h6>
                                        <h6 className="popins_medium max-sm:text-sm mb-0 ">{userData?.customer?.first_name} {userData?.customer?.last_name}</h6>
                                    </div> */}
                                </div>}
                            {/* <Image src={'/assets/messages-2.svg'} height={24} width={24} alt='notification' /> */}
                            {/* <NotificationDropdown /> */}
                        </div>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

export default ProfileHeader;