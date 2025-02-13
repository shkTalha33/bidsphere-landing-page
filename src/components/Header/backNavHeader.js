/* eslint-disable no-unused-vars */
import { usePathname, useRouter } from "next/navigation";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Menu } from "react-feather";
import { BsArrowLeftShort } from "react-icons/bs";
import { setToggle } from "../redux/sidebarRedux";
import { useDispatch, useSelector } from "react-redux";
const BackNavHeader = ({ name }) => {
    const { back } = useRouter()
    const userData = useSelector(state => state.auth.userData)
    const isLogin = useSelector(state => state.auth.isLogin)
    const dispatch = useDispatch()
    const isToggle = useSelector(state => state.sidebar.toggle)
    const pathname = usePathname()
    const isBackNav = !isLogin || userData?.role === 'customer' || pathname.startsWith('/vender/profile')

    return (
        <>
            <Navbar
                bg="white"
                expand="lg"
                sticky="top"
                className="px-2 py-[12px] min-h-[60px] border-b border-[#E6E6E6] w-[100%] min-sm-hidden"
                id="navbar"
            >
                <Container fluid className="w-full relative">
                    {isBackNav ?
                        <button onClick={() => back()} className="absolute inset-0 w-fit" ><BsArrowLeftShort size={30} /> </button> :
                        <button
                            className="lg:hidden text-muted"
                            onClick={() => dispatch(setToggle(!isToggle))}
                        >
                            <Menu size={28} />
                        </button>}
                    <span className="popins_medium mx-auto text-lg mt-1 capitalize">{name === 'shop' ? 'influencer' : name}</span>
                </Container>
            </Navbar>
        </>
    );
};

export default BackNavHeader;