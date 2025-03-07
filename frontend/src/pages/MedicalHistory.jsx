import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";

const MedicalHistory = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [filter, setFilter] = useState("All");
  const [patient, setPatient] = useState({ name: "", email: "" });

  useEffect(() => {
    // Sample medical history data
    const fetchedData = {
      patient: { name: "John Doe", email: "john.doe@example.com" },
      records: [
        { id: 1, type: "Diagnosis", title: "Hypertension", date: "Dec 10, 2024", doctor: "Dr. Sarah Johnson", center: "Heart Care Center" },
        { id: 2, type: "Lab Test", title: "Complete Blood Count", date: "Jan 15, 2025", doctor: "Dr. Emily Rodriguez", center: "Community Health Center" },
        { id: 3, type: "Procedure", title: "Echocardiogram", date: "Feb 20, 2025", doctor: "Dr. Sarah Johnson", center: "Heart Care Center" },
        { id: 4, type: "Vaccination", title: "Influenza Vaccine", date: "Mar 5, 2025", doctor: "Dr. Michael Chen", center: "Community Health Center" },
      ],
    };

    setPatient(fetchedData.patient);
    setRecords(fetchedData.records);
    setFilteredRecords(fetchedData.records);
  }, []);

  // Filter records based on type
  const handleFilter = (type) => {
    setFilter(type);
    setFilteredRecords(type === "All" ? records : records.filter((record) => record.type === type));
  };

  // View record details
  const handleViewRecord = (record) => {
    alert(`Record Details:\n\nType: ${record.type}\nTitle: ${record.title}\nDate: ${record.date}\nDoctor: ${record.doctor}\nCenter: ${record.center}`);
  };

  // Download a single record as PDF
  const handleDownloadRecord = (record) => {
    const doc = new jsPDF();
    doc.text(`Medical Record - ${patient.name}`, 10, 10);
    doc.text(`Type: ${record.type}`, 10, 20);
    doc.text(`Title: ${record.title}`, 10, 30);
    doc.text(`Date: ${record.date}`, 10, 40);
    doc.text(`Doctor: ${record.doctor}`, 10, 50);
    doc.text(`Center: ${record.center}`, 10, 60);
    doc.save(`${record.title}_Record.pdf`);
  };

  // Download complete history as PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`Medical History - ${patient.name}`, 10, 10);
    let y = 20;

    filteredRecords.forEach((record, index) => {
      doc.text(`${index + 1}. ${record.type} - ${record.title} (${record.date})`, 10, y);
      doc.text(`   Doctor: ${record.doctor}, ${record.center}`, 10, y + 10);
      y += 20;
    });

    doc.save("Medical_History.pdf");
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <h2 className="text-2xl font-bold mb-4">Medical History</h2>
      <p className="text-gray-600 mb-6">View your complete medical records</p>

      {/* Patient Info */}
      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <p className="text-black"><strong>Patient Name:</strong> {patient.name}</p>
        <p className="text-black"><strong>Email:</strong> {patient.email}</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4">
        {["All", "Diagnosis", "Lab Test", "Procedure", "Vaccination"].map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded-md ${filter === type ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
            onClick={() => handleFilter(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Records Table */}
      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100 text-black">
          <tr>
            <th className="p-3 border text-black">TYPE</th>
            <th className="p-3 border text-black">TITLE</th>
            <th className="p-3 border text-black">DATE</th>
            <th className="p-3 border text-black">DOCTOR</th>
            <th className="p-3 border text-black">ACTIONS</th>
            <th className="p-3 border text-black">UPLOAD REPORTS</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((record) => (
            <tr key={record.id} className="border text-black">
              <td className="p-3 text-black">{record.type}</td>
              <td className="p-3 text-black">{record.title}</td>
              <td className="p-3 text-black">{record.date}</td>
              <td className="p-3 text-black">
                <strong className="text-black">{record.doctor}</strong> <br />
                <span className="text-sm text-black">{record.center}</span>
              </td>
              <td className="p-3">
                <button onClick={() => handleViewRecord(record)} className="px-3 py-1 bg-blue-500 text-white rounded mr-2">
                  👁️ View
                </button>
                <button onClick={() => handleDownloadRecord(record)} className="px-3 py-1 bg-green-500 text-white rounded">
                  ⬇️ Download
                </button>
              </td>
              <td className="p-3">
                <input type="file" className="border p-2 rounded text-black" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Download All Button */}
      <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded" onClick={handleDownloadPDF}>
        Download Complete History
      </button>
    </div>
  );
};

export default MedicalHistory;
