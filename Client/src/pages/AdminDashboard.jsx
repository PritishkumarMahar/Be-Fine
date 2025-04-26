import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const AdminDashboard = () => {
  // State for user management
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "user",
    status: "active",
  });

  const { token } = useAuth(); // Access user and token from context

  // State for content management
  const [posts, setPosts] = useState([]);
  const [newFoodItem, setNewFoodItem] = useState({
    name: "",
    calories: "",
    carbs: "",
    protein: "",
    fat: "",
    category: "",
  });
  const [foodItems, setFoodItems] = useState([]);
  // function to delete food item
  const deleteFoodItem = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this food item?"
      );
      if (!confirmDelete) return;

      await axios.delete(`http://localhost:5000/api/admin/food-items/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Food item deleted successfully!");
    } catch (error) {
      console.error("Error deleting food item:", error);
      alert("Failed to delete food item.");
    }
  };
  // fetch food items from the server
  const fetchFoodItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/food-items",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFoodItems(response.data); // Adjust according to your backend response
    } catch (error) {
      console.error("Error fetching food items:", error);
    }
  };
  useEffect(() => {
    fetchFoodItems();
  }, [token, deleteFoodItem]); // Fetch food items when the component mounts or when a food item is deleted
  // funaction to add food item
  const handleAddFoodItem = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/food-items",
        {
          name: newFoodItem.name.trim(),
          calories: Number(newFoodItem.calories),
          carbs: Number(newFoodItem.carbs),
          protein: Number(newFoodItem.protein),
          fat: Number(newFoodItem.fat),
          category: newFoodItem.category,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // Add Authorization header if needed
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message || "Food item added successfully!");

      // Reset the form
      setNewFoodItem({
        name: "",
        calories: "",
        carbs: "",
        protein: "",
        fat: "",
        category: "",
      });
    } catch (error) {
      console.error("Error:", error);
      alert(
        error.response?.data?.message ||
          "Something went wrong while adding food item!"
      );
    }
  };

  // State for analytics
  const [timeRange, setTimeRange] = useState("week");
  const [activeTab, setActiveTab] = useState("dashboard");

  // Mock data initialization
  useEffect(() => {
    // Mock users data
    const mockUsers = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "admin",
        status: "active",
        joinDate: "2023-01-15",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        role: "user",
        status: "active",
        joinDate: "2023-02-20",
      },
      {
        id: 3,
        name: "Bob Johnson",
        email: "bob@example.com",
        role: "nutritionist",
        status: "inactive",
        joinDate: "2023-03-10",
      },
      {
        id: 4,
        name: "Alice Brown",
        email: "alice@example.com",
        role: "user",
        status: "active",
        joinDate: "2023-04-05",
      },
      {
        id: 5,
        name: "Charlie Wilson",
        email: "charlie@example.com",
        role: "user",
        status: "suspended",
        joinDate: "2023-05-12",
      },
    ];
    setUsers(mockUsers);

    // Mock posts data
    const mockPosts = [
      {
        id: 1,
        title: "10 Tips for Healthy Eating",
        category: "nutrition",
        views: 1245,
        status: "published",
        date: "2023-06-01",
      },
      {
        id: 2,
        title: "Keto Diet Explained",
        category: "diet",
        views: 876,
        status: "published",
        date: "2023-06-05",
      },
      {
        id: 3,
        title: "Morning Workout Routine",
        category: "exercise",
        views: 532,
        status: "draft",
        date: "2023-06-10",
      },
      {
        id: 4,
        title: "Mindfulness Meditation",
        category: "wellness",
        views: 987,
        status: "published",
        date: "2023-06-15",
      },
      {
        id: 5,
        title: "Hydration Benefits",
        category: "nutrition",
        views: 654,
        status: "archived",
        date: "2023-06-20",
      },
    ];
    setPosts(mockPosts);
  }, []);

  // Mock analytics data
  const userGrowthData = [
    { name: "Jan", users: 100 },
    { name: "Feb", users: 200 },
    { name: "Mar", users: 350 },
    { name: "Apr", users: 500 },
    { name: "May", users: 700 },
    { name: "Jun", users: 900 },
  ];
  const postCategoryData = [];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  // Form validation
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleAddUser = (e) => {
    e.preventDefault();

    if (!newUser.name || !newUser.email) {
      alert("Please fill in all required fields");
      return;
    }

    if (!validateEmail(newUser.email)) {
      alert("Please enter a valid email address");
      return;
    }

    const newUserWithId = {
      ...newUser,
      id: users.length + 1,
      joinDate: new Date().toISOString().split("T")[0],
    };

    setUsers([...users, newUserWithId]);
    setNewUser({ name: "", email: "", role: "user", status: "active" });
  };

  const toggleUserStatus = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === "active" ? "inactive" : "active",
            }
          : user
      )
    );
  };

  const deleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter((u) => u.status === "active").length,
    totalPosts: posts.length,
    publishedPosts: posts.filter((p) => p.status === "published").length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-600 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-2">
              <img src="/logo.png" alt="Logo" className="h-35" />
            </div>
            {/* <h1 className="text-white text-3xl font-bold">Admin</h1> */}
          </div>

          <div className="flex items-center space-x-4">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-full transition">
              Admin Panel
            </button>
            <Link to="/logout">
              <button className="border-2 border-white text-white font-bold py-2 px-6 rounded-full hover:bg-white hover:text-green-600 transition">
                LOGOUT
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
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`hover:underline ${
                  activeTab === "dashboard" ? "font-bold underline" : ""
                }`}
              >
                Dashboard
              </button>
            </li>
            <li>
              <span className="text-white opacity-50">•</span>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("users")}
                className={`hover:underline ${
                  activeTab === "users" ? "font-bold underline" : ""
                }`}
              >
                Users
              </button>
            </li>
            <li>
              <span className="text-white opacity-50">•</span>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("food")}
                className={`hover:underline ${
                  activeTab === "food" ? "font-bold underline" : ""
                }`}
              >
                Food
              </button>
            </li>
            <li>
              <span className="text-white opacity-50">•</span>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`hover:underline ${
                  activeTab === "analytics" ? "font-bold underline" : ""
                }`}
              >
                Analytics
              </button>
            </li>
            <li>
              <span className="text-white opacity-50">•</span>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("settings")}
                className={`hover:underline ${
                  activeTab === "settings" ? "font-bold underline" : ""
                }`}
              >
                Settings
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Admin Dashboard Overview
            </h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h3 className="text-gray-500 font-medium">Total Users</h3>
                <p className="text-3xl font-bold text-gray-800">
                  {stats.totalUsers}
                </p>
                <p className="text-green-600 text-sm mt-2">
                  ↑ 12% from last month
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                <h3 className="text-gray-500 font-medium">Active Users</h3>
                <p className="text-3xl font-bold text-gray-800">
                  {stats.activeUsers}
                </p>
                <p className="text-blue-600 text-sm mt-2">
                  ↑ 8% from last month
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                <h3 className="text-gray-500 font-medium">Total Posts</h3>
                <p className="text-3xl font-bold text-gray-800">
                  {stats.totalPosts}
                </p>
                <p className="text-yellow-600 text-sm mt-2">
                  ↑ 5 new this week
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                <h3 className="text-gray-500 font-medium">Published Posts</h3>
                <p className="text-3xl font-bold text-gray-800">
                  {stats.publishedPosts}
                </p>
                <p className="text-purple-600 text-sm mt-2">3 in draft</p>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  User Growth
                </h3>
                <BarChart width={500} height={300} data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="users" fill="#10B981" />
                </BarChart>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Post Categories
                </h3>
                <PieChart width={500} height={300}>
                  <Pie
                    data={postCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {postCategoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                <div className="flex items-center p-3 border-b border-gray-100">
                  <div className="bg-green-100 p-2 rounded-full mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">New user registered</p>
                    <p className="text-sm text-gray-500">
                      Alice Johnson (alice@example.com)
                    </p>
                  </div>
                  <div className="ml-auto text-sm text-gray-500">
                    2 hours ago
                  </div>
                </div>

                <div className="flex items-center p-3 border-b border-gray-100">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Post published</p>
                    <p className="text-sm text-gray-500">
                      "10 Tips for Healthy Eating"
                    </p>
                  </div>
                  <div className="ml-auto text-sm text-gray-500">
                    5 hours ago
                  </div>
                </div>

                <div className="flex items-center p-3">
                  <div className="bg-purple-100 p-2 rounded-full mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-purple-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">System updated</p>
                    <p className="text-sm text-gray-500">
                      Version 2.3.1 deployed successfully
                    </p>
                  </div>
                  <div className="ml-auto text-sm text-gray-500">Yesterday</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Management Tab */}
        {activeTab === "users" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                User Management
              </h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 absolute left-3 top-2.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Add User Form */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Add New User
              </h3>
              <form
                onSubmit={handleAddUser}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                <div>
                  <label className="block text-gray-700 mb-2">Name*</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={newUser.name}
                    onChange={(e) =>
                      setNewUser({ ...newUser, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Email*</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Role</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={newUser.role}
                    onChange={(e) =>
                      setNewUser({ ...newUser, role: e.target.value })
                    }
                  >
                    <option value="user">User</option>
                    <option value="nutritionist">Nutritionist</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition"
                  >
                    Add User
                  </button>
                </div>
              </form>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Joined
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-600">
                                {user.name.charAt(0)}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${
                              user.role === "admin"
                                ? "bg-purple-100 text-purple-800"
                                : user.role === "nutritionist"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${
                              user.status === "active"
                                ? "bg-green-100 text-green-800"
                                : user.status === "suspended"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.joinDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => toggleUserStatus(user.id)}
                            className={`mr-2 ${
                              user.status === "active"
                                ? "text-yellow-600 hover:text-yellow-900"
                                : "text-green-600 hover:text-green-900"
                            }`}
                          >
                            {user.status === "active"
                              ? "Deactivate"
                              : "Activate"}
                          </button>
                          <button
                            onClick={() => deleteUser(user.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Content Management Tab */}
        {activeTab === "food" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Food Management
              </h2>
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition">
                + New Food
              </button>
            </div>

            {/* Add Post Form */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Add New Food
              </h3>
              <form onSubmit={handleAddFoodItem} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-gray-700 mb-2">Food Name*</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={newFoodItem.name}
                    onChange={(e) =>
                      setNewFoodItem({ ...newFoodItem, name: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Calories, Carbs, Protein, Fat */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Calories*
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={newFoodItem.calories}
                      onChange={(e) =>
                        setNewFoodItem({
                          ...newFoodItem,
                          calories: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">
                      Carbs (g)*
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={newFoodItem.carbs}
                      onChange={(e) =>
                        setNewFoodItem({
                          ...newFoodItem,
                          carbs: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">
                      Protein (g)*
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={newFoodItem.protein}
                      onChange={(e) =>
                        setNewFoodItem({
                          ...newFoodItem,
                          protein: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Fat (g)*</label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={newFoodItem.fat}
                      onChange={(e) =>
                        setNewFoodItem({ ...newFoodItem, fat: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-gray-700 mb-2">Category*</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={newFoodItem.category}
                    onChange={(e) =>
                      setNewFoodItem({
                        ...newFoodItem,
                        category: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="">Select category</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snacks">Snacks</option>
                  </select>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md transition"
                  >
                    Save Food Item
                  </button>
                </div>
              </form>
            </div>

            {/* Foods Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Calories
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Carbs (g)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Protein (g)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fat (g)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {foodItems.map((item) => (
                      <tr key={item._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.calories}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.carbs}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.protein}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.fat}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                          {item.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {/* <button
                            onClick={() => editFoodItem(item._id)}
                            className="text-blue-600 hover:text-blue-900 mr-2"
                          >
                            Edit
                          </button> */}
                          <button
                            onClick={() => deleteFoodItem(item._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Analytics Dashboard
              </h2>
              <div>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                >
                  <option value="day">Last 24 Hours</option>
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                  <option value="year">Last Year</option>
                </select>
              </div>
            </div>

            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-gray-500 font-medium mb-2">Total Visits</h3>
                <p className="text-3xl font-bold text-gray-800">24,589</p>
                <div className="mt-4">
                  <div className="flex items-center">
                    <span className="text-green-500 mr-1">↑ 12%</span>
                    <span className="text-sm text-gray-500">
                      vs last period
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-gray-500 font-medium mb-2">Active Users</h3>
                <p className="text-3xl font-bold text-gray-800">1,842</p>
                <div className="mt-4">
                  <div className="flex items-center">
                    <span className="text-green-500 mr-1">↑ 8%</span>
                    <span className="text-sm text-gray-500">
                      vs last period
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-gray-500 font-medium mb-2">
                  Avg. Session Duration
                </h3>
                <p className="text-3xl font-bold text-gray-800">4m 32s</p>
                <div className="mt-4">
                  <div className="flex items-center">
                    <span className="text-green-500 mr-1">↑ 3%</span>
                    <span className="text-sm text-gray-500">
                      vs last period
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Chart */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                User Engagement
              </h3>
              <div className="h-80">
                <BarChart width={800} height={300} data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="users" fill="#8884d8" />
                  <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
              </div>
            </div>

            {/* Secondary Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Top Pages
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        Homepage
                      </span>
                      <span className="text-sm font-medium text-gray-700">
                        8,542 views
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: "70%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        Nutrition Guide
                      </span>
                      <span className="text-sm font-medium text-gray-700">
                        5,231 views
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: "50%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        Keto Diet
                      </span>
                      <span className="text-sm font-medium text-gray-700">
                        3,987 views
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{ width: "40%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        Exercise Plans
                      </span>
                      <span className="text-sm font-medium text-gray-700">
                        2,543 views
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: "30%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  User Acquisition
                </h3>
                <PieChart width={400} height={300}>
                  <Pie
                    data={[
                      { name: "Organic Search", value: 45 },
                      { name: "Direct", value: 25 },
                      { name: "Social", value: 15 },
                      { name: "Email", value: 10 },
                      { name: "Referral", value: 5 },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    <Cell fill="#0088FE" />
                    <Cell fill="#00C49F" />
                    <Cell fill="#FFBB28" />
                    <Cell fill="#FF8042" />
                    <Cell fill="#8884D8" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              System Settings
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* General Settings */}
              <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  General Settings
                </h3>
                <form className="space-y-6">
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Application Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      defaultValue="Be~Fine"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">
                      Admin Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      defaultValue="admin@befine.com"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Timezone</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option>(UTC) Coordinated Universal Time</option>
                      <option>(UTC-05:00) Eastern Time</option>
                      <option>(UTC-06:00) Central Time</option>
                      <option>(UTC-07:00) Mountain Time</option>
                      <option>(UTC-08:00) Pacific Time</option>
                    </select>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="maintenance"
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="maintenance"
                      className="ml-2 block text-gray-700"
                    >
                      Maintenance Mode
                    </label>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md transition"
                    >
                      Save Settings
                    </button>
                  </div>
                </form>
              </div>

              {/* System Info */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  System Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Application Version</p>
                    <p className="font-medium">2.3.1</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Last Updated</p>
                    <p className="font-medium">June 15, 2023</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Database</p>
                    <p className="font-medium">MySQL 8.0</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Server</p>
                    <p className="font-medium">Ubuntu 20.04 LTS</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">PHP Version</p>
                    <p className="font-medium">8.1.5</p>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <button className="text-green-600 hover:text-green-800 font-medium">
                      Check for Updates
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Advanced Settings
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">
                    API Access Key
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      defaultValue="sk_test_51N...Wj3"
                      readOnly
                    />
                    <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 border border-l-0 border-gray-300 rounded-r-md">
                      Copy
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Backup Database
                  </label>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition">
                    Download Backup
                  </button>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Clear Cache
                  </label>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md transition">
                    Clear All Cache
                  </button>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <label className="block text-gray-700 mb-2">
                    Reset System
                  </label>
                  <p className="text-sm text-gray-500 mb-4">
                    Warning: This will erase all temporary data and cache.
                  </p>
                  <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition">
                    Reset System
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 py-10 border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start mb-10">
            <div className="mb-8 md:mb-0">
              <div className="mb-6">
                <img
                  src="/api/placeholder/100/60"
                  alt="Logo"
                  className="h-16"
                />
                <h2 className="text-green-600 text-2xl font-bold">
                  Be~Fine Admin
                </h2>
              </div>
              <p className="text-gray-600 max-w-md">
                The complete health and wellness platform administration panel.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
              <div>
                <h3 className="text-green-700 font-bold mb-4 uppercase">
                  Resources
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-gray-700 hover:text-green-700">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 hover:text-green-700">
                      API Reference
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 hover:text-green-700">
                      Support Center
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-green-700 font-bold mb-4 uppercase">
                  Legal
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-gray-700 hover:text-green-700">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 hover:text-green-700">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 hover:text-green-700">
                      Cookie Policy
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-green-700 font-bold mb-4 uppercase">
                  Contact
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-gray-700 hover:text-green-700">
                      Contact Support
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 hover:text-green-700">
                      Feature Requests
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 hover:text-green-700">
                      Report a Bug
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm border-t border-gray-200 pt-6">
            <p>Copyright © 2025 Be~Fine Inc. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-green-700">
                Privacy
              </a>
              <span className="text-gray-300">|</span>
              <a href="#" className="hover:text-green-700">
                Terms
              </a>
              <span className="text-gray-300">|</span>
              <a href="#" className="hover:text-green-700">
                Security
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
