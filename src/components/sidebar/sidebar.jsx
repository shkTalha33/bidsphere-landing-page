/* eslint-disable no-unused-vars */
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { icon13dark, icon13light, icon1dark, icon1light, icon2dark, icon2light, icon3dark, icon3light, icon4dark, icon4light, icon5dark, icon5light, icon6dark, icon6light, icon7dark, icon7light, icon8dark, icon8light, icon9dark, icon9light } from "../assets/icons/icon";
import { setToggle } from "../redux/sidebarRedux";

const SidebarMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const userData = useSelector((state) => state.auth?.userData);
  const collapse = useSelector((state) => state.auth?.collapse);
  const isToggle = useSelector((state) => state.sidebar.toggle);
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleLinkClick = (itemId, path) => {
    dispatch(setToggle(false));
    router.push(path);
  };

  const isChildPath = (parentPath, childPath) => {
    return childPath.startsWith(parentPath);
  };

  const allMenuItems = [
    {
      items: t('sidebar.dashboard'),
      path: "/vender/dashboard",
      icon: icon1dark,
      icon2: icon1light,
      badge: false,
      roles: ["influencer", "brand"],
    },
    {
      items: t('sidebar.productOffers'),
      path: "/vender/offer-products",
      icon: icon2dark,
      icon2: icon2light,
      badge: false,
      roles: ["influencer"],
    },
    {
      items: t('sidebar.brands'),
      path: "/vender/brand",
      icon: icon3dark,
      icon2: icon3light,
      badge: false,
      roles: ["influencer"],
    },
    {
      items: t('sidebar.products'),
      path: "/vender/all-products",
      icon: icon4dark,
      icon2: icon4light,
      badge: false,
      roles: ["influencer"],
    },
    {
      items: t('sidebar.influencers'),
      path: "/vender/influencers",
      icon: icon5dark,
      icon2: icon5light,
      badge: false,
      roles: ["brand"],
    },
    {
      items: t('sidebar.products'),
      icon: icon6dark,
      icon2: icon6light,
      subItems: [
        {
          label: t('sidebar.createProduct'),
          path: "/vender/product-form",
        },
        {
          label: t('sidebar.productsList'),
          path: "/vender/all-products",
        },
      ],
      roles: ["brand"],
    },
    {
      items: t('sidebar.assignProducts'),
      path: "/vender/assign-products",
      icon: icon7dark,
      icon2: icon7light,
      badge: false,
      roles: ["brand"],
    },
    {
      items: t('sidebar.campaigns'),
      icon: icon8dark,
      icon2: icon8light,
      subItems: [
        {
          label: t('sidebar.createCampaign'),
          path: "/vender/compaign-form",
        },
        {
          label: t('sidebar.campaignList'),
          path: "/vender/all-compaigns",
        },
      ],
      roles: ["brand"],
    },
    {
      items: t('sidebar.order'),
      path: "/vender/order",
      icon: icon9dark,
      icon2: icon9light,
      badge: false,
      roles: ["influencer", "brand"],
    },
    {
      items: t('sidebar.chat'),
      path: "/vender/chat",
      icon: icon13dark,
      icon2: icon13light,
      badge: false,
      roles: ["brand", "influencer"],
    },
  ];
  const filteredMenuItems = allMenuItems.filter((item) =>
    item.roles.includes(userData?.role)
  );

  return (
    <div className="flex h-screen min-h-screen">
      <div className="h-screen relative" style={{ zIndex: 9999 }}>
        <Sidebar
          width="250px"
          style={{ height: "100%", zIndex: 9999 }}
          collapsed={collapse}
          toggled={isToggle}
          backgroundColor="#f5f5fe"
          onBackdropClick={() => {
            dispatch(setToggle(!isToggle));
          }}
          customBreakPoint="1024px"
        >
          <div
            className="scrolbar"
            style={{
              borderRight: "1px solid #f4f4f4",
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              height: "100%",
              paddingTop: "1rem",
            }}
          >
            <div className="flex items-center mb-3 justify-center">
              <Link href="/vender/dashboard" style={{ textDecoration: "none" }} className="mx-auto">
                <Image width={91} height={55} src="/assets/logo.svg" alt="" />
              </Link>
            </div>
            <Menu className="w-full flex flex-col justify-between h-full">
              <div>
                {filteredMenuItems.map((item, i) => (
                  <Fragment key={i}>
                    {item.subItems ? (
                      <SubMenu
                        icon={item.icon && <Image
                          src={isChildPath(item.path, pathname) ? item.icon2 : item?.icon}
                          width={18}
                          height={18}
                          alt=""
                        />}
                        label={item.items}
                        className={`w-full popins_semibold mb-1 text_secondary`}
                      >
                        {item.subItems.map((subItem, j) => (
                          <MenuItem
                            key={`${i}-${j}`}
                            onClick={() =>
                              handleLinkClick(`${i}-${j}`, subItem.path)
                            }
                            component={<Link href={subItem.path} />}
                            className={`w-full text-sm mb-1 ${isChildPath(subItem.path, pathname) ? `${userData?.role === 'brand' ? 'bg-[#CCA0FD]' : 'bg-[#5B3DD0]'} text_black popins_bold border-r-4 border-r-[#7f55df]` : 'popins_semibold'}`}
                          >
                            <div className="flex items-center gap-4">
                              <div className={`w-full ${isChildPath(subItem.path, pathname) ? 'popins_medium' : 'popins_regular'}`}>
                                {subItem.label}
                              </div>
                            </div>
                          </MenuItem>
                        ))}
                      </SubMenu>
                    ) : (
                      <MenuItem
                        key={i}
                        onClick={() =>
                          handleLinkClick(i.toString(), item.path)
                        }
                        component={<Link href={item.path} />}
                        className={`w-full mb-1 ${isChildPath(item.path, pathname) ? `${userData?.role === 'brand' ? 'bg-[#CCA0FD]' : 'bg-[#5B3DD0]'} text_black popins_bold border-r-4 border-r-[#7f55df]` : 'popins_semibold'}`}
                      >
                        <div className="flex items-center gap-3">
                          <Image
                            src={isChildPath(item.path, pathname) ? item.icon2 : item?.icon}
                            width={18}
                            height={18}
                            alt=""
                          />

                          <div className={`w-full ${isChildPath(item.path, pathname) ? 'popins_medium text_white' : 'popins_regular'}`}>{item.items}</div>
                        </div>
                      </MenuItem>
                    )}
                  </Fragment>
                ))}
              </div>
            </Menu>
          </div>
        </Sidebar>
      </div >
    </div >
  );
};

export default SidebarMenu;