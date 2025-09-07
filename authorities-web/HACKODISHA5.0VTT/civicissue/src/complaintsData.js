// src/data.js

// Officer Data
export const officerData = {
  name: "Michael Johnson",
  position: "Senior Complaint Management Officer",
  department: "Public Works Department",
  employeeId: "PWD-2023-0458",
  serviceYears: "12 years",
  education: "Master’s in Public Administration",
  certification: "Certified Public Manager (CPM)",
  appointmentDate: "March 15, 2011",
  status: "Active",
  reportingOfficer: "Sarah Williams, Director",
  jurisdiction: "Westlake Central District",
  address: "City Hall, 123 Municipal Plaza, Westlake, WI 54321",
  phone: "(555) 221-4567 ext. 890",
  email: "mjohnson@westlake.gov",
  hours: "Mon–Fri, 8:30 AM – 3:30 PM",
};

// Complaints Data
// export const complaints = [
//   { id: "#C-7845", issue: "Road Damage", location: "123 Main St, Downtown", citizen: "Sarah Johnson", date: "Sept 15, 2025", status: "Resolved" },
//   { id: "#C-7844", issue: "Water Supply", location: "456 Oak Ave, Westside", citizen: "Michael Brown", date: "Sept 14, 2025", status: "In Progress" },
//   { id: "#C-7843", issue: "Electricity", location: "789 Pine Rd, Northside", citizen: "Emily Davis", date: "Aug 14, 2025", status: "Pending" },
//   { id: "#C-7842", issue: "Waste Management", location: "101 Elm St, Eastside", citizen: "Robert Wilson", date: "May 13, 2023", status: "Pending" },
//   { id: "#C-7841", issue: "Public Safety", location: "202 Cedar Ln, Southside", citizen: "Jennifer Lee", date: "May 12, 2023", status: "In Progress" },
//   { id: "#C-7840", issue: "Road Damage", location: "303 Maple Dr, Downtown", citizen: "David Thompson", date: "May 11, 2023", status: "Resolved" },
//   { id: "#C-7839", issue: "Street Lighting", location: "404 Birch St, Uptown", citizen: "Sophia Martinez", date: "May 10, 2023", status: "Pending" },
//   { id: "#C-7838", issue: "Noise Pollution", location: "505 Walnut Ave, Central", citizen: "James Anderson", date: "May 09, 2023", status: "Pending" },
// ];

export const complaints = [
  {
    id: "#C-7845",
    issue: "Road Damage",
    location: "123 Main St, Downtown",
    citizen: "Sarah Johnson",
    date: "Sep 15, 2025",
    status: "Resolved",
    department: "Public Works",
    assignedOfficer: "Michael Johnson",
    citizenPhone: "(555) 123-4567",
    citizenEmail: "sarah.johnson@example.com",
    estimatedResolution: "Sep 30, 2025",
    description: "Road Damage reported by Sarah Johnson at 123 Main St, Downtown.",
    images: ["https://via.placeholder.com/1200x800?text=Road+Damage"],
    updates: [
      { status: "In Progress", note: "Work started", date: "Sep 15, 2025" },
      { status: "Resolved", note: "Issue resolved", date: "Sep 15, 2025" }
    ]
  },
  {
    id: "#C-7844",
    issue: "Water Supply",
    location: "456 Oak Ave, Westside",
    citizen: "Michael Brown",
    date: "Sep 14, 2025",
    status: "In Progress",
    department: "Water Department",
    assignedOfficer: "Michael Johnson",
    citizenPhone: "(555) 123-4567",
    citizenEmail: "michael.brown@example.com",
    estimatedResolution: "Sep 30, 2025",
    description: "Water Supply reported by Michael Brown at 456 Oak Ave, Westside.",
    images: ["https://via.placeholder.com/1200x800?text=Water+Supply"],
    updates: [
      { status: "In Progress", note: "Investigation started", date: "Sep 14, 2025" }
    ]
  },
  {
    id: "#C-7843",
    issue: "Electricity",
    location: "789 Pine Rd, Northside",
    citizen: "Emily Davis",
    date: "Aug 14, 2025",
    status: "Pending",
    department: "Electric Department",
    assignedOfficer: "Michael Johnson",
    citizenPhone: "(555) 123-4567",
    citizenEmail: "emily.davis@example.com",
    estimatedResolution: "Sep 30, 2025",
    description: "Electricity reported by Emily Davis at 789 Pine Rd, Northside.",
    images: ["https://via.placeholder.com/1200x800?text=Electricity"],
    updates: [
      { status: "Pending", note: "Complaint received", date: "Aug 14, 2025" }
    ]
  },
  {
    id: "#C-7842",
    issue: "Waste Management",
    location: "101 Elm St, Eastside",
    citizen: "Robert Wilson",
    date: "May 13, 2023",
    status: "Pending",
    department: "Sanitation",
    assignedOfficer: "Michael Johnson",
    citizenPhone: "(555) 123-4567",
    citizenEmail: "robert.wilson@example.com",
    estimatedResolution: "Sep 30, 2025",
    description: "Waste Management reported by Robert Wilson at 101 Elm St, Eastside.",
    images: ["https://via.placeholder.com/1200x800?text=Waste+Management"],
    updates: [
      { status: "Pending", note: "Complaint received", date: "May 13, 2023" }
    ]
  },
  {
    id: "#C-7841",
    issue: "Public Safety",
    location: "202 Cedar Ln, Southside",
    citizen: "Jennifer Lee",
    date: "May 12, 2023",
    status: "In Progress",
    department: "Safety Division",
    assignedOfficer: "Michael Johnson",
    citizenPhone: "(555) 123-4567",
    citizenEmail: "jennifer.lee@example.com",
    estimatedResolution: "Sep 30, 2025",
    description: "Public Safety reported by Jennifer Lee at 202 Cedar Ln, Southside.",
    images: ["https://via.placeholder.com/1200x800?text=Public+Safety"],
    updates: [
      { status: "In Progress", note: "Investigation started", date: "May 12, 2023" }
    ]
  },
  {
    id: "#C-7840",
    issue: "Road Damage",
    location: "303 Maple Dr, Downtown",
    citizen: "David Thompson",
    date: "May 11, 2023",
    status: "Resolved",
    department: "Public Works",
    assignedOfficer: "Michael Johnson",
    citizenPhone: "(555) 123-4567",
    citizenEmail: "david.thompson@example.com",
    estimatedResolution: "Sep 30, 2025",
    description: "Road Damage reported by David Thompson at 303 Maple Dr, Downtown.",
    images: ["https://via.placeholder.com/1200x800?text=Road+Damage"],
    updates: [
      { status: "In Progress", note: "Work started", date: "May 11, 2023" },
      { status: "Resolved", note: "Issue resolved", date: "May 11, 2023" }
    ]
  },
  {
    id: "#C-7839",
    issue: "Street Lighting",
    location: "404 Birch St, Uptown",
    citizen: "Sophia Martinez",
    date: "May 10, 2023",
    status: "Pending",
    department: "Lighting Authority",
    assignedOfficer: "Michael Johnson",
    citizenPhone: "(555) 123-4567",
    citizenEmail: "sophia.martinez@example.com",
    estimatedResolution: "Sep 30, 2025",
    description: "Street Lighting reported by Sophia Martinez at 404 Birch St, Uptown.",
    images: ["https://via.placeholder.com/1200x800?text=Street+Lighting"],
    updates: [
      { status: "Pending", note: "Complaint received", date: "May 10, 2023" }
    ]
  },
  {
    id: "#C-7838",
    issue: "Noise Pollution",
    location: "505 Walnut Ave, Central",
    citizen: "James Anderson",
    date: "May 09, 2023",
    status: "Pending",
    department: "Environmental Control",
    assignedOfficer: "Michael Johnson",
    citizenPhone: "(555) 123-4567",
    citizenEmail: "james.anderson@example.com",
    estimatedResolution: "Sep 30, 2025",
    description: "Noise Pollution reported by James Anderson at 505 Walnut Ave, Central.",
    images: ["https://via.placeholder.com/1200x800?text=Noise+Pollution"],
    updates: [
      { status: "Pending", note: "Complaint received", date: "May 09, 2023" }
    ]
  }
];


export default complaints;