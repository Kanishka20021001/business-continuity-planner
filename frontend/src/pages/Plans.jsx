import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles.css";



export default function Plans() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [plans, setPlans] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: ""
  });

  const fetchPlans = () => {
    api.get("/api/plans").then(res => setPlans(res.data));
  };

  useEffect(() => {
    fetchPlans();
  }, []);

 const handleSubmit = (e) => {
  e.preventDefault();

  if (editingId) {
    api.put(`/api/plans/${editingId}`, form)
      .then(() => {
        alert("Plan updated!"); 
        fetchPlans();
        setForm({ title: "", description: "", status: "" });
        setEditingId(null);
      });
  } else {
    api.post("/api/plans", form)
      .then(() => {
        alert("Plan added!");
        fetchPlans();
        setForm({ title: "", description: "", status: "" });
      });
  }
};

  const handleDelete = (id) => {
  api.delete(`/api/plans/${id}`).then(() => {
    fetchPlans();
  });
};
  
  const handleEdit = (plan) => {
  setForm({
    title: plan.title,
    description: plan.description,
    status: plan.status
  });

  setEditingId(plan.id);
};
 
  return (
  <div className="main">

    {/* TOPBAR */}
    <div className="topbar">
      <h2>Business Continuity Planner</h2>
    </div>

    {/* CONTENT */}
    <div className="content">

      {/* FORM */}
      <div className="card">
        <h3>{editingId ? "Edit Plan" : "Create Plan"}</h3>

        <form onSubmit={handleSubmit}>
          <input
            className="input"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <input
            className="input"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <select
            className="input"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>

          <button type="submit" className="button">
            {editingId ? "Update Plan" : "+ Add Plan"}
          </button>
        </form>
      </div>
    <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
  <input
    className="input"
    placeholder="Search title..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <select
    className="input"
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
  >
    <option value="">All</option>
    <option value="Active">Active</option>
    <option value="Pending">Pending</option>
    <option value="Failed">Failed</option>
  </select>

  <button
    className="button"
    onClick={() => {
      api.get(`/api/plans/search?q=${search}&status=${statusFilter}`)
        .then(res => setPlans(res.data));
    }}
  >
    Search
  </button>
</div>

  <button
  className="button"
  style={{ marginBottom: "15px" }}
  onClick={() => {
    window.open("http://localhost:8080/api/plans/export");
  }}
>
  Export CSV
</button>

      {/* TABLE */}
      <div className="card">
        <h3>All Plans</h3>

        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {plans.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                  🚀 No plans yet
                </td>
              </tr>
            ) : (
              plans.map(plan => (
                <tr key={plan.id}>
                  <td>{plan.title}</td>
                  <td>{plan.description}</td>
                  <td>
                    <span className={`status ${plan.status?.toLowerCase()}`}>
                      {plan.status}
                    </span>
                  </td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(plan)}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(plan.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

      </div>

    </div>
  </div>
);
}