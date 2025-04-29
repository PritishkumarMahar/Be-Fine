import React, { useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  // User data state
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    gender: "Male",
    birthday: "January 15, 1985",
    country: "United States",
    height: "5' 10\" (178 cm)",
    currentWeight: "185 lbs (84 kg)",
    goalWeight: "170 lbs (77 kg)",
    weeklyGoal: "Lose 1 lb per week",
    membership: "Premium Member",
  });

  // Edit mode state
  const [editMode, setEditMode] = useState(false);

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
  const handleSave = () => {
    // Here you would typically send the updated data to your backend
    console.log("Saved data:", userData);
    setEditMode(false);
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
            <h1 className="text-white text-3xl font-bold">  </h1>
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
                    src="/api/placeholder/120/120"
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
                  <p className="text-green-100">Member since June 2023</p>
                  <div className="flex items-center mt-2">
                    <span className="bg-yellow-400 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                      {userData.membership}
                    </span>
                  </div>
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
                        Gender
                      </label>
                      {editMode ? (
                        <select
                          name="gender"
                          value={userData.gender}
                          onChange={handleChange}
                          className="w-full p-2 border rounded"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                          <option value="Prefer not to say">
                            Prefer not to say
                          </option>
                        </select>
                      ) : (
                        <p className="text-gray-800">{userData.gender}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-600 text-sm font-medium mb-1">
                        Birthday
                      </label>
                      {editMode ? (
                        <input
                          type="text"
                          name="birthday"
                          value={userData.birthday}
                          onChange={handleChange}
                          className="w-full p-2 border rounded"
                        />
                      ) : (
                        <p className="text-gray-800">{userData.birthday}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-600 text-sm font-medium mb-1">
                        Country
                      </label>
                      {editMode ? (
                        <input
                          type="text"
                          name="country"
                          value={userData.country}
                          onChange={handleChange}
                          className="w-full p-2 border rounded"
                        />
                      ) : (
                        <p className="text-gray-800">{userData.country}</p>
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
                        Current Weight
                      </label>
                      {editMode ? (
                        <input
                          type="text"
                          name="currentWeight"
                          value={userData.currentWeight}
                          onChange={handleChange}
                          className="w-full p-2 border rounded"
                        />
                      ) : (
                        <p className="text-gray-800">
                          {userData.currentWeight}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-600 text-sm font-medium mb-1">
                        Goal Weight
                      </label>
                      {editMode ? (
                        <input
                          type="text"
                          name="goalWeight"
                          value={userData.goalWeight}
                          onChange={handleChange}
                          className="w-full p-2 border rounded"
                        />
                      ) : (
                        <p className="text-gray-800">{userData.goalWeight}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-600 text-sm font-medium mb-1">
                        Weekly Goal
                      </label>
                      {editMode ? (
                        <select
                          name="weeklyGoal"
                          value={userData.weeklyGoal}
                          onChange={handleChange}
                          className="w-full p-2 border rounded"
                        >
                          <option value="Lose 2 lbs per week">
                            Lose 2 lbs per week
                          </option>
                          <option value="Lose 1.5 lbs per week">
                            Lose 1.5 lbs per week
                          </option>
                          <option value="Lose 1 lb per week">
                            Lose 1 lb per week
                          </option>
                          <option value="Lose 0.5 lb per week">
                            Lose 0.5 lb per week
                          </option>
                          <option value="Maintain current weight">
                            Maintain current weight
                          </option>
                          <option value="Gain 0.5 lb per week">
                            Gain 0.5 lb per week
                          </option>
                        </select>
                      ) : (
                        <p className="text-gray-800">{userData.weeklyGoal}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Your Progress
          </h2>

          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Weight Progress */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Weight Loss
                </h3>
                <div className="flex items-end mb-2">
                  <span className="text-3xl font-bold text-green-600 mr-2">
                    15
                  </span>
                  <span className="text-gray-600">lbs lost</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-600"
                    style={{ width: "75%" }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  75% of your goal achieved
                </p>
              </div>

              {/* Streak */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Current Streak
                </h3>
                <div className="flex items-end mb-2">
                  <span className="text-3xl font-bold text-green-600 mr-2">
                    28
                  </span>
                  <span className="text-gray-600">days</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400"
                    style={{ width: "100%" }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Keep going! You're on fire!
                </p>
              </div>

              {/* Nutrition */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Nutrition
                </h3>
                <div className="flex items-end mb-2">
                  <span className="text-3xl font-bold text-green-600 mr-2">
                    92%
                  </span>
                  <span className="text-gray-600">of targets met</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: "92%" }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Excellent nutrition this week
                </p>
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
