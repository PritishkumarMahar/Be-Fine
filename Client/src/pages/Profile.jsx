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
  // State for profile photo upload
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");

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
      if (response.data.user.photo) {
        setPhotoPreview(`http://localhost:5000/uploads/${response.data.user.photo}`);
      } else {
        setPhotoPreview("/blank-profile-picture.webp");
      }
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

  // Handle photo change
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // Save changes
  const handleSave = async () => {
    try {
      // First upload photo if selected
      if (photoFile) {
        const formData = new FormData();
        formData.append('photo', photoFile);
        
        const photoResponse = await axios.post(
          "http://localhost:5000/api/users/upload-photo",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        
        // Update user data with new photo filename
        setUserData(prev => ({
          ...prev,
          photo: photoResponse.data.filename
        }));
      }

      // Then update the rest of the profile data
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
                <div className="mr-6 relative">
                  <img
                    src={photoPreview || "/blank-profile-picture.webp"}
                    alt="Profile"
                    className="h-24 w-24 rounded-full border-4 border-white"
                  />
                  {editMode && (
                    <div className="absolute bottom-0 right-0">
                      <label className="bg-yellow-400 text-white rounded-full p-2 cursor-pointer hover:bg-yellow-500">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className="hidden"
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </label>
                    </div>
                  )}
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