import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles.css";

export default function Dashboard() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    api.get("/api/plans").then(res => setPlans(res.data));
  }, []);

  const total = plans.length;
  const active = plans.filter(p => p.status === "Active").length;
  const pending = plans.filter(p => p.status === "Pending").length;
  const failed = plans.filter(p => p.status === "Failed").length;

  return (
    <div className="main">

      {/* TOPBAR */}
      <div className="topbar">
        <h2>Dashboard</h2>
      </div>

      <div className="content">

        <div className="stats-grid">

          <div className="stat-card">
            <h3>{total}</h3>
            <p>Total Plans</p>
          </div>

          <div className="stat-card active">
            <h3>{active}</h3>
            <p>Active</p>
          </div>

          <div className="stat-card pending">
            <h3>{pending}</h3>
            <p>Pending</p>
          </div>

          <div className="stat-card failed">
            <h3>{failed}</h3>
            <p>Failed</p>
          </div>

        </div>

      </div>
    </div>
  );
}