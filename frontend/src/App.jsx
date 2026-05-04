import { Routes, Route, Link } from "react-router-dom";
import Plans from "./pages/Plans";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="app">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>🛡️ BCP</h2>
        <Link to="/">Dashboard</Link>
        <Link to="/plans">Plans</Link>
      </div>

      {/* MAIN */}
      <div className="main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/plans" element={<Plans />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;