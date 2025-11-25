import React from "react";
import StatCard from "./StatCard";
import { PRIMARY } from "../../common/commoncss";
import { Eye, Heart, RefreshCcw, ShoppingBag } from "lucide-react";

const Stats = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        title="Products"
        value={50}
        subtitle={<ShoppingBag />}
        accent={PRIMARY}
      />
      <StatCard title="Views" value={100} subtitle={<Eye />} accent={PRIMARY} />
      <StatCard
        title="Favorites"
        value={500}
        subtitle={<Heart />}
        accent={PRIMARY}
      />
      <StatCard
        title="Updated"
        value={"2 Hours ago"}
        subtitle={<RefreshCcw />}
        accent={PRIMARY}
      />
    </div>
  );
};

export default Stats;
