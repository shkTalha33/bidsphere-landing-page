"use client"

import { avataruser } from '@/components/assets/icons/icon';
/* eslint-disable no-unused-vars */
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Fragment, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

const NotificationDropdown = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // const fetchData = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await getData(getAllNotifications, header1);
  //     if (res?.success === true) {
  //       setData(res?.notifications);
  //       dispatch(setNotificationCount(null))
  //     } else {
  //       setData([]);
  //     }
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //     console.error("Error fetching notifications:", error);
  //   }
  // };

  // const handleDropdownToggle = (isOpen) => {
  //   if (isOpen) {
  //     fetchData();
  //   }
  // };

  const renderNotificationItems = () => {
    if (loading) {
      return (
        <div className="flex justify-center w-full my-5 items-center">
          <Spinner className='text_primary' />
        </div>
      );
    }

    return (
      <div
        style={{
          maxHeight: '300px',
          overflowY: 'auto',
        }}
        className='flex flex-col'
      >
        {!data || data.length === 0 ? (
          <div className="flex justify-center w-full my-4 items-center">
            <span className="text_primary text-sm plusJakara_medium">No Notification Found</span>
          </div>
        ) : (
          data.map((item, index) => (
            <button
              // onClick={() => handleDetailClick(item)}
              key={index}
              className="d-flex border-b border-b-gray-300 sm:p-4 max-sm:p-3 hover:bg-gray-100 justify-start text-start no-underline"
            >
              <div
                className={`list-item d-flex ${item.switch ? 'align-items-center' : 'align-items-start'
                  }`}
              >
                {!item.switch ? (
                  <Fragment>
                    <div className="me-2">
                      {item.user ? (
                        <div style={{ minWidth: "45px" }}>
                          <Image
                            src={item?.user?.profilePicture || avataruser}
                            width={30}
                            height={30}
                            style={{
                              width: "30px",
                              height: "30px",
                              objectFit: "cover",
                              borderRadius: "50%",
                            }}
                            alt=""
                          />
                        </div>
                      ) : (
                        <div
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            backgroundColor: item.color || "#828282",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            fontWeight: "bold",
                          }}
                        >
                          {item.avatarContent}
                        </div>
                      )}
                    </div>
                    <h6 className="list-item-body medium-font text-black">
                      {item.title}
                      <span className="regular-font text-sm no-underline text-gray-400">
                        {item.description}
                      </span>
                    </h6>
                  </Fragment>
                ) : (
                  <Fragment>
                    {item.title}
                    {item.switch}
                  </Fragment>
                )}
              </div>
            </button>
          ))
        )}
      </div>
    );
  };

  return (
    <UncontrolledDropdown
      tag="li"
      className="dropdown-notification nav-item border-0"
    // onToggle={handleDropdownToggle}
    >
      <DropdownToggle tag="a" className="nav-link py-0 border-0" href="/" onClick={(e) => e.preventDefault()}>
        <div className='relative border-0'>
          <div className="w-[2.2rem] h-[2.2rem] cursor-pointer flex items-center relative justify-center sec-bg rounded-[50%] border-0 primary-color">
            {/* <IoIosNotifications size={23} /> */}
            <Image src={'/assets/notification.svg'} height={24} width={24} alt='notification' />
          </div>
        </div>
      </DropdownToggle>
      <DropdownMenu end tag="ul" className="dropdown-menu-media mt-0">
        <li className="dropdown-menu-header sm:p-2">
          <DropdownItem className="d-flex" tag="div" header>
            <h5 className="sm:text-lg text-sm text-black medium-font mb-0 me-auto">Notifications</h5>
          </DropdownItem>
        </li>
        {renderNotificationItems()}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default NotificationDropdown;
