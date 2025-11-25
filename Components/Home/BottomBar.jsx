"use client";

import { usePathname, useRouter } from "next/navigation";
import { Home, User, PlusCircle, Grid, ArrowRightCircle } from "lucide-react";
import { useState } from "react";

export default function BottomBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // mobile bottom bar items
  const bottomItems = [
    { label: "Home", path: `/${user?.slug}/admin`, icon: Home },
    { label: "Products", path: `/${user?.slug}/admin/products`, icon: Grid },
    {
      label: "Add",
      path: `/${user?.slug}/admin/addProducts`,
      icon: PlusCircle,
    },
    {
      label: "Orders",
      path: `/${user?.slug}/admin/orders`,
      icon: ArrowRightCircle,
    },
    { label: "Profile", path: `/${user?.slug}/admin/profile`, icon: User },
  ];
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40">
      <div className="bg-white border-t border-gray-200">
        <div className="flex items-center justify-around h-14">
          {bottomItems.map((it) => {
            const Icon = it.icon;
            return (
              <button
                key={it.label}
                onClick={() => router.push(it.path)}
                className="flex flex-col items-center justify-center text-xs text-gray-700"
              >
                <Icon className="w-5 h-5 text-[#008236]" />
                <span className="text-[10px]">{it.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
