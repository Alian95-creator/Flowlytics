import { useEffect, useState } from "react";
import Card from "../components/Card";
import RevenueChart from "../components/RevenueChart";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Revenue" value="$12,400" change="+12%" />
        <Card title="Users" value="1,240" change="+8%" />
        <Card title="Churn Rate" value="4.2%" change="-1.1%" />
      </div>

      {/* CHART */}
      <RevenueChart />
    </div>
  );
}