"use client";

import {
  Bell,
  Grid,
  Home,
  LogOut,
  MailOpen,
  PhoneCall,
  PlusCircle,
  Settings,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CommonModal from "../Common/CommonModal";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AuthServices } from "../../lib/services/AuthServices";
import { enAuthReqType } from "../../lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
const CmnHeader = () => {
  const [openNotification, setOpenNotification] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [slug, setSlug] = useState("");
  const router = useRouter();
  useEffect(() => {
    setSlug(user?.slug);
  }, [user]);
  const handleLogout = async () => {
    const logout = await AuthServices(enAuthReqType.logout, "", "", "");
    console.log(logout.message);
    if (logout.status === 200) {
      setSidebarOpen(false);
      toast.success(logout.message);
      router.push("/");
    } else {
      toast.error("Error Occured!");
    }
  };
  return (
    <header className="flex justify-between items-center px-2 py-3 bg-white shadow top-0 z-10">
      <h1 className="text-lg font-semibold text-blue-950 hidden md:block lg:block">
        Shop Name
      </h1>
      <div className="flex items-center justify-between md:justify-end gap-4">
        {/* mobile: show small left toggle & title */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md bg-white shadow-sm"
          >
            <svg
              className="w-5 h-5 text-[#008236]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="text-lg font-bold text-gray-800">Dashboard</div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="hidden md:flex flex-col text-right mr-3">
          <div className="text-sm text-gray-500">Welcome back,</div>
          <div className="text-sm font-semibold text-gray-800">
            {user?.name}
          </div>
        </div>
        <button
          className="relative text-blue-900 hover:text-black cursor-pointer mr-3"
          // onClick={() => handleClickToCallBack(false)}
        >
          <PhoneCall size={23} />
        </button>
        <button
          // onClick={handleOpenProfile}
          className="relative text-blue-900 hover:text-black cursor-pointer mr-3"
        >
          <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 rounded-full bg-red-800 text-white text-xs">
            0
          </span>
          <Bell size={23} />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-800 font-semibold">
            {user?.name?.[0]}
          </div>
        </div>
        <AnimatePresence>
          {openNotification && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
              className="absolute right-0 top-12 mt-1 md:w-sm sm:w-2xs bg-white rounded origin-top-right z-50 mr-2"
            >
              {/* Scrollable list */}
              <div className="max-h-96 overflow-y-auto">
                <ul className="flex flex-col py-2">
                  {unreadNotifications.length > 0 &&
                    unreadNotifications.map((notification, index) => (
                      <li
                        key={index}
                        className="m-1 border-gray-500 border rounded-lg"
                      >
                        <div className="flex items-center justify-between space-x-2 px-4 py-2 rounded-lg hover:bg-blue-200 hover:text-gray-800 font-medium w-full text-sm text-blue-950 cursor-pointer">
                          <div
                            className="flex items-center space-x-2"
                            // onClick={() => handleRedirect(notification.type)}
                          >
                            {/* <NotificationIcon type={notification.type} /> */}
                            <span>{notification.title}</span>
                          </div>
                          <div>
                            <button
                              // onClick={() => handleMarkAsRead(notification._id)}
                              className="cursor-pointer"
                              title="Mark as read"
                            >
                              <MailOpen
                                size={20}
                                className="text-blue-600 hover:text-blue-800"
                              />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Fixed footer button */}
              <div className="sticky bottom-0 bg-white border-t p-2">
                <button
                  // onClick={handleMarkAllAsRead}
                  className="w-full rounded-md bg-blue-600 text-white text-sm font-medium py-2 hover:bg-blue-700 transition"
                >
                  Mark all as read
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Mobile Sidebar Drawer (simple overlay) */}
        <div>
          {/* Background Overlay (fades in/out) */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-in-out z-40"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <div
            className={`fixed left-0 top-0 bottom-0 w-72 bg-white p-4 shadow-lg z-50 transform transition-transform duration-300 ease-in-out
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    `}
          >
            {/* User Info */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#008236] flex items-center justify-center text-white font-bold">
                {user?.name?.[0]}
              </div>
              <div>
                <div className="text-sm font-semibold">{user?.name}</div>
                <div className="text-xs text-gray-500">{user?.email}</div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-2">
              <Link
                href={`/${slug}/admin`}
                onClick={() => setSidebarOpen(false)}
                className="py-2 px-3 rounded-md hover:bg-gray-100 flex items-center gap-3"
              >
                <Home className="w-5 h-5 text-[#008236]" /> Dashboard
              </Link>
              <Link
                href={`/${slug}/catalogue`}
                onClick={() => setSidebarOpen(false)}
                className="py-2 px-3 rounded-md hover:bg-gray-100 flex items-center gap-3"
              >
                <Grid className="w-5 h-5 text-[#008236]" /> Products
              </Link>
              <button
                onClick={() => {
                  setSidebarOpen(false);
                  handleAddProduct();
                }}
                className="py-2 px-3 rounded-md hover:bg-gray-100 flex items-center gap-3"
              >
                <PlusCircle className="w-5 h-5 text-[#008236]" /> Add Product
              </button>
              <Link
                href={`/${slug}/subscription`}
                onClick={() => setSidebarOpen(false)}
                className="py-2 px-3 rounded-md hover:bg-gray-100 flex items-center gap-3"
              >
                <Settings className="w-5 h-5 text-[#008236]" /> Subscription
              </Link>
              <button
                onClick={() => handleLogout()}
                className="py-2 px-3 rounded-md hover:bg-gray-100 flex items-center gap-3"
              >
                <LogOut className="w-5 h-5 text-[#008236]" /> Logout
              </button>
            </nav>
          </div>
        </div>
      </div>
      <CommonModal
        // isOpen={clickToCall}
        // onClose={() => setClickToCall(false)}
        // onConfirm={() => handleClickToCallBack(true)}
        message={"Are you sure you want to request to call back ?"}
      />
    </header>
  );
};

export default CmnHeader;
