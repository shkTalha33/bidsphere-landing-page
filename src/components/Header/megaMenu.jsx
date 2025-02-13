"use client";

import React, { useState } from "react";
import { Skeleton, Popover } from "antd";
import Link from "next/link";
import { useGetQuery } from "../redux/apiSlice2";
import { useRouter, useSearchParams } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";
import { Container } from "reactstrap";

const MegaMenu = () => {
    const [visiblePopoverIndex, setVisiblePopoverIndex] = useState(null);
    const { pathname, replace } = useRouter();
    const searchParams = useSearchParams()
    const { data: mainMenu, isLoading: isLoading } = useGetQuery({
        endpoint: "api/category/list/menu-items",
        category: "MainMenu",
    });
    const skelData = new Array(18).fill(0);

    // Handle popover visibility
    const togglePopover = (index) => {
        setVisiblePopoverIndex(visiblePopoverIndex === index ? null : index);
    };

    // Render subcategories
    const renderSubcategories = (subcategories) => (
        <ul className="flex flex-col pl-0 gap-1">
            {subcategories.map((sub) => (
                <li key={sub._id} className="text_dark">
                    <button className="text-start" onClick={() => onClickMenu(sub, "subCategory")}>
                        <span className="text_dark popins_regular">{sub.name}</span>
                    </button>
                </li>
            ))}
        </ul>
    );

    // Render popover content
    const renderPopoverContent = (itemData) => (
        <Container className="bg-white cuscon ">
            <div className="flex justify-start gap-5 w-full">
                {itemData.sub_main_categories?.map((subMain) => (
                    <div key={subMain._id} className="sub-maincategory" >
                        <button  onClick={() => onClickMenu(subMain, "subMainCategory")} className="sub-main-categorytitle text-[16px] mb-2 popins_medium">{subMain.name}</button>
                        {subMain.subcategories && renderSubcategories(subMain.subcategories)}
                    </div>
                ))}
            </div>
        </Container>
    );

    // Handle menu item click
    const onClickMenu = (selectedItem, type) => {
        const urlParams = new URLSearchParams(searchParams);

        if (type === "category") {
            urlParams.set("category", selectedItem?._id);
        } else if (type === "subMainCategory") {
            urlParams.set("mainCat", selectedItem?._id);
        } else if (type === "subCategory") {
            urlParams.set("subCat", selectedItem?._id);
        }

        replace(`/product?${urlParams.toString()}`);
    };

    return (
        <nav className="megamenu">
            <ul className={`menu-list ${isLoading ? 'overflow-hidden justify-between' : 'overflow-x-auto justify-start'} gap-3 flex `}>
                {isLoading || !mainMenu?.menuItems?.length
                    ? skelData.map((_, index) => (
                        <Skeleton.Button
                            key={index}
                            active={true}
                            size="small"
                            shape="square"
                            block={false}
                        />
                    ))
                    : mainMenu.menuItems.map((itemData, index) => (
                        <li key={`${itemData.name}-${index}`} className="menu-item">
                            <Popover
                                placement="bottom"
                                onOpenChange={() => togglePopover(index)}
                                open={visiblePopoverIndex === index}
                                content={renderPopoverContent(itemData)}
                            >
                                <button
                                    className={`no-underline text-[13px] whitespace-nowrap ${pathname === itemData?.path ? "active" : ""
                                        }`}
                                    // href={itemData?.path || "/"}
                                    onClick={() => onClickMenu(itemData, "category")}
                                >
                                    <div className="flex gap-2 items-center">
                                        <span className="">
                                            {itemData?.name}
                                        </span>
                                        <IoIosArrowDown />
                                    </div>
                                </button>
                            </Popover>
                        </li>
                    ))}
            </ul>

            <style jsx>{`
    .megamenu {
        background-color: #fff;
        padding: 10px;
    }
    .menu-list {
        display: flex;
        overflow-x: auto;
        gap: 1rem;
        scrollbar-width: none; /* For Firefox */
        -ms-overflow-style: none; /* For Internet Explorer and Edge */
    }
    .menu-list::-webkit-scrollbar {
        display: none; /* For Chrome, Safari, and Opera */
    }
    .menu-item {
        position: relative;
    }
    .nav-link {
        padding: 10px;
        color: #000;
        text-decoration: none;
    }
    .nav-link.active {
        font-weight: bold;
    }
    .sub-main-category {
        margin-bottom: 20px;
        border-bottom: 1px solid #f0f0f0;
        padding-bottom: 10px;
    }
    .sub-main-category-title {
        font-weight: bold;
        margin-bottom: 10px;
    }
    .subcategories-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .subcategories-item {
        margin: 5px 0;
    }
`}</style>

        </nav>
    );
};

export default MegaMenu;
