import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Profile = () => {
  // User data state
  const [userData, setUserData] = useState({ role: "User" });
  // Edit mode state
  const [editMode, setEditMode] = useState(false);
  // Auth context
  const { user, token } = useAuth();
  // Check if user is logged in
  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  // Fetch user data from API
  const fetchMyProfile = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("User data:", response.data);
      setUserData(response.data.user);
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };
  // Fetch user data on component mount
  useEffect(() => {
    if (token && user) {
      fetchMyProfile();
      console.log("User data fetched:", userData);
    }
  }, [token, user]);

  useEffect(() => {
    console.log("User data fetched:", userData);
  }, [userData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // Save changes
  const handleSave = async () => {
    // Here you would typically send the updated data to your backend
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/me",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Profile updated:", userData);
      setEditMode(false); // Exit edit mode after saving
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      {/* Header with Logo and Navigation */}
      <header className="bg-green-600 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-2">
              <img src="/logo.png" alt="Logo" className="h-26" />
            </div>
            <h1 className="text-white text-3xl font-bold"> </h1>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={editMode ? handleSave : toggleEditMode}
              className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-full transition"
            >
              {editMode ? "SAVE" : "EDIT PROFILE"}
            </button>
            <Link to="/logout">
              <button className="border-2 border-white text-white font-bold py-2 px-6 rounded-full hover:bg-white hover:text-green-600 transition">
                LOG OUT
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Navigation */}
      <nav className="bg-green-600 pb-2">
        <div className="container mx-auto">
          <ul className="flex justify-center items-center text-white text-lg font-medium space-x-8">
            <li>
              <Link to="/dashboard" className="hover:underline font-bold">
                Dashboard
              </Link>
            </li>
            <li>
              <span className="text-white opacity-50">•</span>
            </li>
            <li>
              <Link to="/food-log" className="hover:underline">
                Food Log
              </Link>
            </li>
            <li>
              <span className="text-white opacity-50">•</span>
            </li>
            <li>
              <Link to="/exercise" className="hover:underline">
                Exercise
              </Link>
            </li>
            <li>
              <span className="text-white opacity-50">•</span>
            </li>
            <li>
              <Link to="/progress" className="hover:underline">
                Progress
              </Link>
            </li>
            <li>
              <span className="text-white opacity-50">•</span>
            </li>
            <li>
              <Link to="/reports" className="hover:underline">
                Reports
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Profile Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            {/* Profile Header */}
            <div className="bg-green-600 p-6 text-white">
              <div className="flex items-center">
                <div className="mr-6">
                  <img
                    src="/blank-profile-picture.webp"
                    alt="Profile"
                    className="h-24 w-24 rounded-full border-4 border-white"
                  />
                </div>
                <div>
                  {editMode ? (
                    <input
                      type="text"
                      name="name"
                      value={userData.name}
                      onChange={handleChange}
                      className="text-3xl font-bold bg-green-700 text-white p-1 rounded"
                    />
                  ) : (
                    <h2 className="text-3xl font-bold">{userData.name}</h2>
                  )}
                  <p className="text-green-100">
                    {userData.createdAt?.toString().slice(0, 10) ||
                      "Loading..."}
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Personal Info */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                    Personal Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-600 text-sm font-medium mb-1">
                        Email
                      </label>
                      {editMode ? (
                        <input
                          type="email"
                          name="email"
                          value={userData.email}
                          onChange={handleChange}
                          className="w-full p-2 border rounded"
                        />
                      ) : (
                        <p className="text-gray-800">{userData.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-600 text-sm font-medium mb-1">
                        Age
                      </label>
                      {editMode ? (
                        <input
                          type="text"
                          name="age"
                          value={userData.age}
                          onChange={handleChange}
                          className="w-full p-2 border rounded"
                        />
                      ) : (
                        <p className="text-gray-800">{userData.age}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Health Stats */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                    Health Stats
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-600 text-sm font-medium mb-1">
                        Height
                      </label>
                      {editMode ? (
                        <input
                          type="text"
                          name="height"
                          value={userData.height}
                          onChange={handleChange}
                          className="w-full p-2 border rounded"
                        />
                      ) : (
                        <p className="text-gray-800">{userData.height}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-600 text-sm font-medium mb-1">
                        Weight
                      </label>
                      {editMode ? (
                        <input
                          type="text"
                          name="weight"
                          value={userData.weight}
                          onChange={handleChange}
                          className="w-full p-2 border rounded"
                        />
                      ) : (
                        <p className="text-gray-800">{userData.weight}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-600 text-sm font-medium mb-1">
                        Goal
                      </label>
                      {editMode ? (
                        <select
                          name="goal"
                          value={userData.goal}
                          onChange={handleChange}
                          className="w-full p-2 border rounded"
                        >
                          <option value="Lose">Lose weight</option>
                          <option value="Maintain">Maintain weight</option>
                          <option value="Gain">Gain weight</option>
                        </select>
                      ) : (
                        <p className="text-gray-800">{userData.goal}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-10 border-t border-gray-200">
        <div className="container mx-auto px-4">
          {/* Footer content same as before */}
          {/* ... */}
        </div>
      </footer>
    </div>
  );
};

export default Profile;
