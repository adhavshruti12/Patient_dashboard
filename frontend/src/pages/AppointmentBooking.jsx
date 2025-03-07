import React, { useState } from "react";

const AppointmentBooking = ({ darkMode }) => {
  const [appointment, setAppointment] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    gender: "",
    address: "",
    date: "",
    time: "",
    department: "",
    doctor: "",
    booked: false,
  });

  const departments = {
    "Cardiology": ["Dr. Smith", "Dr. Williams"],
    "Neurology": ["Dr. Johnson"],
    "Dermatology": ["Dr. Brown", "Dr. Davis"],
  };

  const times = ["10:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"];
  const genders = ["Male", "Female", "Other"];

  const handleChange = (e) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

 const handleSubmit = () => {
  setAppointment({ ...appointment, booked: true });
  setAppointments((prev) => [...prev, appointment]);
  navigate("/appointments");
};

  const handleReschedule = () => {
    setAppointment({ ...appointment, booked: false });
  };

  const handleCancel = () => {
    setAppointment({
      firstName: "",
      lastName: "",
      mobile: "",
      email: "",
      birthDate: "",
      gender: "",
      address: "",
      date: "",
      time: "",
      department: "",
      doctor: "",
      booked: false,
    });
  };

  return (
    <div
    className={`flex justify-center items-center min-h-screen h-screen w-full fixed top-0 left-0 transition-all 
        ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-700"}`}
  >
    <div
      className={`p-8 rounded-2xl shadow-lg w-2/3 max-w-2xl transition-all 
          ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-700"}`}
    >
      <h2 className="text-2xl font-semibold text-center mb-6">
        {appointment.booked ? "Appointment Details" : "Book an Appointment"}
      </h2>
  
        {!appointment.booked ? (
          <>
            {/* First Name & Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter First Name"
                  className={`border p-3 rounded-lg w-full focus:ring-2 focus:ring-[#64CCC5] ${
                    darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"
                  }`}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter Last Name"
                  className={`border p-3 rounded-lg w-full focus:ring-2 focus:ring-[#64CCC5] ${
                    darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"
                  }`}
                  onChange={handleChange}
                />
              </div>
            </div>
  
            {/* Mobile Number */}
            <div className="mt-4">
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Mobile Number
              </label>
              <input
                type="text"
                name="mobile"
                placeholder="Enter Mobile Number"
                className={`border p-3 rounded-lg w-full focus:ring-2 focus:ring-[#64CCC5] ${
                  darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"
                }`}
                onChange={handleChange}
              />
            </div>
  
            {/* Email */}
            <div className="mt-4">
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                className={`border p-3 rounded-lg w-full focus:ring-2 focus:ring-[#64CCC5] ${
                  darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"
                }`}
                onChange={handleChange}
              />
            </div>
  
            {/* Gender Selection */}
            <div className="mt-4">
              <label className="block text-gray-600 text-sm font-medium mb-1">Gender</label>
              <select
                name="gender"
                className={`border p-3 rounded-lg w-full focus:ring-2 focus:ring-[#64CCC5] ${
                  darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"
                }`}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
  
            {/* Age Input */}
            <div className="mt-4">
              <label className="block text-gray-600 text-sm font-medium mb-1">Age</label>
              <input
                type="number"
                name="age"
                placeholder="Enter Age"
                className={`border p-3 rounded-lg w-full focus:ring-2 focus:ring-[#64CCC5] ${
                  darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"
                }`}
                onChange={handleChange}
              />
            </div>
  
            {/* Appointment Date & Time */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-1">Appointment Date</label>
                <input
                  type="date"
                  name="date"
                  className={`border p-3 rounded-lg w-full focus:ring-2 focus:ring-[#64CCC5] ${
                    darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"
                  }`}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-1">Appointment Time</label>
                <select
                  name="time"
                  className={`border p-3 rounded-lg w-full focus:ring-2 focus:ring-[#64CCC5] ${
                    darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"
                  }`}
                  onChange={handleChange}
                >
                  <option value="">Select Time</option>
                  {times.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>
  
            {/* Select Department */}
            <div className="mt-4">
              <label className="block text-gray-600 text-sm font-medium mb-1">Select Department</label>
              <select
                name="department"
                className={`border p-3 rounded-lg w-full focus:ring-2 focus:ring-[#64CCC5] ${
                  darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"
                }`}
                onChange={handleChange}
              >
                <option value="">Choose a Department</option>
                {Object.keys(departments).map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
  
            {/* Select Doctor */}
            <div className="mt-4">
              <label className="block text-gray-600 text-sm font-medium mb-1">Select Doctor</label>
              <select
                name="doctor"
                className={`border p-3 rounded-lg w-full focus:ring-2 focus:ring-[#64CCC5] ${
                  darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"
                }`}
                onChange={handleChange}
                disabled={!appointment.department}
              >
                <option value="">Choose a Doctor</option>
                {appointment.department &&
                  departments[appointment.department].map((doctor) => (
                    <option key={doctor} value={doctor}>
                      {doctor}
                    </option>
                  ))}
              </select>
            </div>

            {/* Have You Visited Before? Checkbox */}
            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                name="visitedBefore"
                id="visitedBefore"
                className="mr-2 w-5 h-5 accent-[#64CCC5]"
                onChange={handleChange}
              />
              <label htmlFor="visitedBefore" className="text-gray-600 text-sm font-medium">
                Have you visited before?
              </label>
            </div>

            {/* Book Appointment Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-[#64CCC5] hover:bg-[#4DA9A5] text-white font-bold py-3 px-4 rounded-xl mt-6"
            >
              BOOK APPOINTMENT
            </button>
          </>
        ) : (
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-600">Appointment Scheduled Successfully!</p>
          </div>
        )}
      </div>
    </div>
  );
  
};

export default AppointmentBooking;
