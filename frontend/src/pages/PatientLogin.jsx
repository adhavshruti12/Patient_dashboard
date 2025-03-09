import { useState } from "react";
import { User, Lock } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const PatientLogin = () => {
  const [formData, setFormData] = useState({ patient_username: "", patient_password: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.patient_username || !formData.patient_password) {
      toast.error("Please enter username and password!", { position: "top-right" });
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/auth/patientLogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patient_email: formData.patient_username,
          patient_password: formData.patient_password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Login Successful!", { position: "top-right" });
        localStorage.setItem("token", data.token);
        setFormData({ patient_username: "", patient_password: "" });
      } else {
        toast.error(data.message || "Login failed!", { position: "top-right" });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!", { position: "top-right" });
    }
  };

  return (
    <>
      <div className="h-screen w-full bg-[#E6F8F7] flex justify-center items-center">
        <div className="p-12 max-w-2xl w-fit h-[400px] bg-white shadow-md rounded-xl border border-[#66D2CE] flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-[#66D2CE] mb-4 flex items-center justify-center">
            <User className="w-6 h-6 mr-2" />Patient Login
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col justify-center">
            <div className="mb-4 flex items-center bg-white shadow rounded-lg border border-[#66D2CE] p-2">
              <User className="text-[#66D2CE] w-5 h-5 mx-2" />
              <input
                name="patient_username"
                type="text"
                placeholder="Email"
                onChange={handleChange}
                value={formData.patient_username}
                className="w-full p-2 focus:outline-none"
              />
            </div>

            <div className="mb-4 flex items-center bg-white shadow rounded-lg border border-[#66D2CE] p-2">
              <Lock className="text-[#66D2CE] w-5 h-5 mx-2" />
              <input
                name="patient_password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                value={formData.patient_password}
                className="w-full p-2 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 text-white bg-[#66D2CE] rounded hover:bg-[#4ab7b3] transition duration-200 w-full"
            >
              Login
            </button>

            {/* Sign-up link */}
            <p className="mt-4 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/patient_signup" className="text-[#66D2CE] font-semibold ">
                Sign Up
              </Link>
             
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default PatientLogin;
