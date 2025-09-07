import { useState } from "react";

import Complainttable from "./components/complainttable";
import Header from "./components/header";
import Searchbar from "./components/searchbar";
import Sidebar from "./components/sidebar";
import Statcard from "./components/statcard";

import ComplaintManagementSystem from "./components/login";
import OfficerProfile from "./components/profile";
import IssueCard from "./components/IssueCard";
import { complaints } from "./complaintsData"; // Import complaints data

function App() {

  const handleLogout = () => {
    setLoggedIn(false);
    setcondition("dashboard"); 
  };

  const [filters, setfilters] = useState({
    searchterm: "",
    issuetype: "All Issue Types",
    Status: "All Status",
    daterange: "All Time",
    priority: "All Priorities",
  });

  const [loggedIn, setLoggedIn] = useState(false); 
  const [condition, setcondition] = useState("dashboard");

  // Handle Login
  const handleLogin = () => setLoggedIn(true);

  const [selectedIssue, setSelectedIssue] = useState(null);
  // When an issue is selected open IssueCard
  if (selectedIssue) {
    return (
      <div>
        <Header onLogout={handleLogout} />
        <div className="flex-grow-1 p-3" style={{ marginTop: "10px" }}>
          <IssueCard issue={selectedIssue} onBack={() => setSelectedIssue(null)} />
        </div>
      </div>
    );
  }

  // ✅ Calculate stats dynamically from complaints
  const totalComplaints = complaints.length;
  const resolvedCount = complaints.filter(c => c.status === "Resolved").length;
  const inProgressCount = complaints.filter(c => c.status === "In Progress").length;
  const pendingCount = complaints.filter(c => c.status === "Pending").length;

  if (!loggedIn) return <ComplaintManagementSystem onLogin={handleLogin} />;

  return (
    <div>
      <Header onLogout={handleLogout} />
      <div className="d-flex">
        <Sidebar onmenuselect={setcondition} className="sidebar-fixed" />
        <div className="flex-grow-1 p-3" style={{ marginTop: "10px" }}>
          {condition === "dashboard" && (
            <div className="dashboard-page">
              <Searchbar filters={filters} setfilters={setfilters} />
              <div className="d-flex justify-content-around flex-wrap statcards-row w-100">
                <Statcard icon="bi-clipboard-data" title="Total Complaints" count={totalComplaints} />
                <Statcard icon="bi-check-circle-fill text-success" title="Resolved" count={resolvedCount} />
                <Statcard icon="bi-hourglass-split text-warning" title="In Progress" count={inProgressCount} />
                <Statcard icon="bi-exclamation-triangle-fill text-danger" title="Pending" count={pendingCount} /> 
              </div>
              {/* <Complainttable complaints={complaints} filters={filters} /> */}
               <Complainttable complaints={complaints} filters={filters} onViewIssue={setSelectedIssue} />
            </div>
          )}

          {condition === "profile" && <OfficerProfile />}
        </div>
      </div>
    </div>
  );
}

export default App;
