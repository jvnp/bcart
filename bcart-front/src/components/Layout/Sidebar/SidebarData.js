import React from "react";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
{
	title: "Logout",
	path: "/logout",
	icon: <IoIcons.IoIosLogOut />,
	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,
},
{
	title: "Dashboard",
	path: "/",
	icon: <AiIcons.AiFillHome />,
	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,
},
{
	title: "Products",
	path: "/products",
	icon: <IoIcons.IoIosPaper />,
	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

	subNav: [
	{
		title: "View",
		path: "/products",
		icon: <IoIcons.IoIosEye />,
		cName: "sub-nav",
	},
	{
		title: "Cart",
		path: "/products/cart",
		icon: <IoIcons.IoIosCart />,
		cName: "sub-nav",
	},
	],
},
{
	title: "About",
	path: "/about",
	icon: <IoIcons.IoMdHelpCircle />,
},
];
