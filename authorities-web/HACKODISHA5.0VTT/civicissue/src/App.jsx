// App.jsx
import { useState, useEffect } from "react";
import api from "./client/Client"; // Axios instance

// Components
import ComplaintManagementSystem from "./components/complaintManagementSystem.jsx";
import Login from "./components/login";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Searchbar from "./components/searchbar";
import Statcard from "./components/statcard";
import Complainttable from "./components/complainttable";
import OfficerProfile from "./components/profile";
import IssueCard from "./components/IssueCard";

function App() {
const [filters, setfilters] = useState({
searchterm: "",
issuetype: "All Issue Types",
Status: "All Status",
daterange: "All Time",
priority: "All Priorities",
});

const [loggedIn, setLoggedIn] = useState(false);
const [condition, setcondition] = useState("dashboard");
const [selectedIssue, setSelectedIssue] = useState(null);
const [complaintsFromApi, setComplaints] = useState([]);

// ✅ Login success → just update local state
const handleLoginSuccess = () => {
setLoggedIn(true);
};

// ✅ Logout resets state
const handleLogout = () => {
setLoggedIn(false);
setcondition("dashboard");
localStorage.removeItem("token");
};

// ✅ Fetch complaints from backend
const fetchData = async () => {
try {
const response = await api.get("/api/complaints");
setComplaints(response.data);
} catch (error) {
console.error("Error fetching complaints:", error);
}
};

// ✅ Fetch on first load
useEffect(() => {
fetchData();
}, []);

// ✅ If not logged in, show login screen
if (!loggedIn) {
return <ComplaintManagementSystem onLogin={handleLoginSuccess} />;
}

// ✅ If user clicked a complaint, show IssueCard
if (selectedIssue) {
return (
<div>
<Header onLogout={handleLogout} />
<div className="flex-grow-1 p-3" style={{ marginTop: "10px" }}>
<IssueCard
issue={selectedIssue}
onBack={() => setSelectedIssue(null)}
onUpdate={fetchData} // Refetch after update
/>
</div>
</div>
);
}

// ✅ Calculate dashboard stats
const totalComplaints = complaintsFromApi.length;
const resolvedCount = complaintsFromApi.filter((c) => c.status === "Resolved").length;
const inProgressCount = complaintsFromApi.filter((c) => c.status === "In Progress").length;
const pendingCount = complaintsFromApi.filter((c) => c.status === "Pending").length;

// ✅ Main dashboard layout
return (
<div>
<Header onLogout={handleLogout} />
<div className="d-flex">
<Sidebar onmenuselect={setcondition} className="sidebar-fixed" />
<div className="flex-grow-1 p-3" style={{ marginTop: "10px" }}>
{condition === "dashboard" && (
<>
<Searchbar filters={filters} setfilters={setfilters} />
<div className="d-flex justify-content-around flex-wrap statcards-row w-100">
<Statcard icon="bi-clipboard-data" title="Total Complaints" count={totalComplaints} />
<Statcard icon="bi-check-circle-fill text-success" title="Resolved" count={resolvedCount} />
<Statcard icon="bi-hourglass-split text-warning" title="In Progress" count={inProgressCount} />
<Statcard icon="bi-exclamation-triangle-fill text-danger" title="Pending" count={pendingCount} />
</div>
<Complainttable complaints={complaintsFromApi} filters={filters} onViewIssue={setSelectedIssue} />
</>
)}

      {condition === "profile" && <OfficerProfile />}
    </div>
  </div>
</div>


);
}

export default App;
