"use client";

import React, { useEffect, useState } from "react";
import Stats from "./Stats";
import QAB from "./QAB";
import { AuthServices } from "../../lib/services/AuthServices";
import { enAuthReqType } from "../../lib/utils";

const MainAdmin = ({ slug }) => {
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );
  const getUser = async (token) => {
    try {
      const me = await AuthServices(enAuthReqType.me, "", "", token);
      localStorage.setItem("user", JSON.stringify({ ...user, ...me?.user }));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUser(user?.token);
  }, [user]);
  return (
    <div className="min-h-screen">
      <div className="flex">
        {/* Main content */}
        <main className="flex-1 px-4 md:px-8 py-6">
          {/* Stats */}
          <Stats />
          {/* Quick actions and Banner */}
          <QAB slug={slug} />
          {/* Footer small */}
          <div className="text-center text-xs text-gray-400 mt-6">
            Made with ❤️ for local businesses
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainAdmin;
