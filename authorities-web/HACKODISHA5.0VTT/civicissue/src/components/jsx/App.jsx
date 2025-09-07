import { useState } from "react";
import Home from "./components/home";
import Complainttable from "./components/complainttable";
import Header from "./components/header";
import Searchbar from "./components/searchbar";
import Sidebar from "./components/sidebar";
import Statcard from "./components/statcard";
import Hometop from "./components/hometop";
import LandingContent from "./components/content";
import ComplaintManagementSystem from "./components/login";
import OfficerProfile from "./components/profile";

function App() {
  const [filters, setfilters] = useState({
    searchterm: "",
    issuetype: "All Issue Types",
    Status: "All Status",
    daterange: "All Time",
    priority: "All Priorities",
  });

  const [loggedIn, setLoggedIn] = useState(false); // login state
  const [condition, setcondition] = useState("dashboard");

  const complaints = [
    { id: "#C-7845", issue: "Road Damage", location: "123 Main St, Downtown", citizen: "Sarah Johnson", date: "May 15, 2023", status: "Resolved" },
    { id: "#C-7844", issue: "Water Supply", location: "456 Oak Ave, Westside", citizen: "Michael Brown", date: "May 14, 2023", status: "In Progress" },
    { id: "#C-7843", issue: "Electricity", location: "789 Pine Rd, Northside", citizen: "Emily Davis", date: "May 14, 2023", status: "Urgent" },
    { id: "#C-7842", issue: "Waste Management", location: "101 Elm St, Eastside", citizen: "Robert Wilson", date: "May 13, 2023", status: "Pending" },
    { id: "#C-7841", issue: "Public Safety", location: "202 Cedar Ln, Southside", citizen: "Jennifer Lee", date: "May 12, 2023", status: "In Progress" },
    { id: "#C-7840", issue: "Road Damage", location: "303 Maple Dr, Downtown", citizen: "David Thompson", date: "May 11, 2023", status: "Resolved" },
    { id: "#C-7839", issue: "Street Lighting", location: "404 Birch St, Uptown", citizen: "Sophia Martinez", date: "May 10, 2023", status: "Pending" },
    { id: "#C-7838", issue: "Noise Pollution", location: "505 Walnut Ave, Central", citizen: "James Anderson", date: "May 09, 2023", status: "Urgent" }
  ];

  // ✅ Handle Login
  const handleLogin = () => {
    setLoggedIn(true);
  };

  // ✅ Handle Logout → go back to Login page
  const handleLogout = () => {
    setLoggedIn(false);
    setcondition("dashboard"); // reset to default page
  };

  if (!loggedIn) {
    return <ComplaintManagementSystem onLogin={handleLogin} />;
  }

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
                <Statcard icon="bi-clipboard-data" title="Total Complaints" count={248} bgColor="bg-light" />
                <Statcard icon="bi-check-circle-fill text-success" title="Resolved" count={156} bgColor="bg-light" />
                <Statcard icon="bi-hourglass-split text-warning" title="In Progress" count={20} bgColor="bg-light" />
                <Statcard icon="bi-exclamation-triangle-fill text-danger" title="Urgent" count={20} bgColor="bg-light" />
              </div>
              <Complainttable complaints={complaints} filters={filters} />
            </div>
          )}

          {condition === "profile" && (
            <div style={{ marginTop: "20px" }}>
              <OfficerProfile />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
