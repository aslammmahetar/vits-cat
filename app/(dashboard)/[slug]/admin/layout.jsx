import {
  BarChartIcon,
  BellDot,
  BellElectricIcon,
  HomeIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import CmnHeader from "../../../../Components/Dashboard/CmnHeader";
import CmnSideBar from "../../../../Components/Dashboard/CmnSideBar";
import BottomBar from "../../../../Components/Home/BottomBar";

const Rootlayout = async ({ children }) => {
  const adminMenu = [
    {
      title: "Dashboard",
      icon: <LayoutDashboardIcon />,
      path: "/admin/dashboard",
    },
    {
      title: "Analytics",
      icon: <BarChartIcon />,
      path: "/admin/analytics",
      // submenu: [
      //   { title: "Platform Growth", path: "/admin/analytics/growth" },
      //   { title: "User Behavior", path: "/admin/analytics/behavior" },
      //   { title: "Revenue Reports", path: "/admin/analytics/revenue" },
      // ],
    },
    {
      title: "Users",
      icon: <UsersIcon />,
      path: "/admin/users",
      // submenu: [
      //   { title: "All Users", path: "/admin/users" },
      //   { title: "Agents", path: "/admin/users/agents" },
      //   { title: "Sellers", path: "/admin/users/sellers" },
      //   { title: "Banned Accounts", path: "/admin/users/banned" },
      // ],
    },
    {
      title: "Properties",
      icon: <HomeIcon />,
      path: "/admin/manageproperties",
      // submenu: [
      //   {
      //     title: "Pending Approval",
      //     path: "/admin/properties/pending",
      //     badge: "24",
      //   },
      //   { title: "Active Listings", path: "/admin/properties/active" },
      //   { title: "Flagged Listings", path: "/admin/properties/flagged" },
      //   { title: "Bulk Upload", path: "/admin/properties/upload" },
      // ],
    },
    {
      title: "Leads",
      icon: <BellDot />,
      path: "/admin/leads",
      // submenu: [
      //   { title: "All Users", path: "/admin/users" },
      //   { title: "Agents", path: "/admin/users/agents" },
      //   { title: "Sellers", path: "/admin/users/sellers" },
      //   { title: "Banned Accounts", path: "/admin/users/banned" },
      // ],
    },

    {
      title: "Notifications",
      icon: <BellElectricIcon />,
      path: "/admin/notifications",
      // submenu: [
      //   { title: "All Transactions", path: "/admin/transactions" },
      //   { title: "Payout Requests", path: "/admin/transactions/payouts" },
      //   { title: "Refunds", path: "/admin/transactions/refunds" },
      // ],
    },
    {
      title: "Settings",
      icon: <SettingsIcon />,
      // submenu: [
      //   { title: "Admin Roles", path: "/admin/settings/roles" },
      //   { title: "Payment Gateways", path: "/admin/settings/payments" },
      //   { title: "API Keys", path: "/admin/settings/api" },
      // ],
    },
  ];
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden sm:block sticky top-0 z-20 h-screen">
        <CmnSideBar navItems={adminMenu} />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <CmnHeader />
        <div className="flex-1 overflow-y-auto p-0 md:p-6 bg-green-50">
          {children}
        </div>
      </div>
      <BottomBar />
    </div>
  );
};

export default Rootlayout;
