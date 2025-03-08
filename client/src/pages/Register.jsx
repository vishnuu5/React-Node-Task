import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { registerUser } from "../services/api";
import { UserCircle } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await registerUser({ name, email, dateOfBirth, password, profilePhoto });
      localStorage.setItem("profilePhoto", profilePhoto);
      login(response.user, response.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Create a new account</h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex justify-center">
              <div className="relative">
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <UserCircle className="w-24 h-24 text-gray-300" />
                )}
                <label htmlFor="profile-photo" className="absolute bottom-0 right-0 bg-indigo-600 rounded-full p-1 cursor-pointer">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <input id="profile-photo" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </label>
              </div>
            </div>
            <input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="input appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="input appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            <input id="dateOfBirth" type="date" required value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} className="input appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="input appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="px-2 bg-white text-gray-500">Already have an account? <Link to="/login" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign in</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
