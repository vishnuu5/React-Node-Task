import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { UserCircle, Edit, Trash, MoreHorizontal, Upload } from "lucide-react";

const Dashboard = () => {
  const { user, updateUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };


  // ✅ Load profile photo from localStorage on page load
  useEffect(() => {
    const savedProfilePhoto = localStorage.getItem("profilePhoto");
    if (savedProfilePhoto) {
      updateUser({ ...user, profilePhoto: savedProfilePhoto });
    }
  }, []);


  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    setUploading(true);
  
    const reader = new FileReader();
    reader.onloadend = () => {
      const newProfilePic = reader.result;
      updateUser({ ...user, profilePhoto: newProfilePic });
  
      // Save to localStorage
      localStorage.setItem("profilePhoto", newProfilePic);
  
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };
  

  const handleEdit = (id) => {
    setActiveModal({ type: "edit", id });
  };

  const handleDelete = (id) => {
    setActiveModal({ type: "delete", id });
  };

  const handleView = (id) => {
    setActiveModal({ type: "view", id });
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const confirmAction = () => {
    if (activeModal?.type === "delete") {
      alert(`User ${activeModal.id} deleted successfully!`);
    }
    closeModal();
  };

  const tableData = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
      profilePhoto: "/img_1.jpeg?height=200&width=200",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      status: "Active",
      profilePhoto: "/img_2.jpeg?height=200&width=200",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "User",
      status: "Inactive",
      profilePhoto: "/img_3.jpeg?height=200&width=200",
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice@example.com",
      role: "Manager",
      status: "Active",
      profilePhoto: "/img_4.jpeg?height=200&width=200",
    },
    {
      id: 5,
      name: "Charlie Wilson",
      email: "charlie@example.com",
      role: "User",
      status: "Active",
      profilePhoto: "/img_5.jpeg?height=200&width=200",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center">
              <div className="ml-3 relative">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                    <label htmlFor="profile-pic" className="cursor-pointer relative">
                    {user?.profilePhoto ? (
                          <img
                            src={user.profilePhoto}
                            alt="Profile"
                            className="h-10 w-10 rounded-full object-cover"
                          />
                      ) : (
                        <UserCircle className="h-10 w-10 text-indigo-600" />
                      )}
                      <span className="absolute bottom-0 right-0 bg-white p-1 rounded-full borde">
                      <Upload className="h-4 w-4 text-indigo-600" />
                      </span>
                      </label>
                  <input
                    id="profile-pic"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfilePicChange}
                    disabled={uploading}
                  />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">User Management</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {tableData.map((person) => (
                        <tr key={person.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full object-cover"
                                  src={person.profilePhoto || "/placeholder.svg"}
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{person.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.role}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                person.status === "Active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {person.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
                            <button onClick={() => handleView(person.id)} className="text-indigo-600 hover:text-indigo-900">
                              <MoreHorizontal className="h-5 w-5" />
                            </button>
                            <button onClick={() => handleEdit(person.id)} className="text-blue-600 hover:text-blue-900">
                              <Edit className="h-5 w-5" />
                            </button>
                            <button onClick={() => handleDelete(person.id)} className="text-red-600 hover:text-red-900">
                              <Trash className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
