import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Progress = () => {
  const { user, token } = useAuth();
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("month"); // week, month, year
  const [selectedMetric, setSelectedMetric] = useState("weight"); // weight, calories, exercise

  // Fetch progress data from API
  const fetchProgressData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/progress", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          range: timeRange,
        },
      });
      setProgressData(response.data);
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && user) {
      fetchProgressData();
    }
  }, [token, user, timeRange]);

  if (!user) {
    return <div>Please log in to view your progress.</div>;
  }

  if (loading) {
    return <div>Loading your progress data...</div>;
  }

  // Process data for chart
  const chartData = progressData.map((item) => ({
    date: new Date(item.date).toLocaleDateString(),
    weight: item.weight,
    calories: item.calories,
    exercise: item.exerciseMinutes,
  }));

  return (
    <div>
      {/* Header with Logo and Navigation - same as Profile */}
      <header className="bg-green-600 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-2">
              <img src="/logo.png" alt="Logo" className="h-26" />
            </div>
            <h1 className="text-white text-3xl font-bold"> </h1>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/profile">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-full transition">
                VIEW PROFILE
              </button>
            </Link>
            <Link to="/logout">
              <button className="border-2 border-white text-white font-bold py-2 px-6 rounded-full hover:bg-white hover:text-green-600 transition">
                LOG OUT
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Navigation - same as Profile */}
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
              <Link to="/reports" className="hover:underline">
                Reports
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
          </ul>
        </div>
      </nav>

      {/* Progress Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
              Your Progress
            </h1>

            {/* Time Range Selector */}
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setTimeRange("week")}
                className={`px-4 py-2 rounded-full ${
                  timeRange === "week"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setTimeRange("month")}
                className={`px-4 py-2 rounded-full ${
                  timeRange === "month"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setTimeRange("year")}
                className={`px-4 py-2 rounded-full ${
                  timeRange === "year"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Yearly
              </button>
            </div>

            {/* Metric Selector */}
            <div className="flex space-x-4 mb-8">
              <button
                onClick={() => setSelectedMetric("weight")}
                className={`px-4 py-2 rounded-full ${
                  selectedMetric === "weight"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Weight
              </button>
              <button
                onClick={() => setSelectedMetric("calories")}
                className={`px-4 py-2 rounded-full ${
                  selectedMetric === "calories"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Calories
              </button>
              <button
                onClick={() => setSelectedMetric("exercise")}
                className={`px-4 py-2 rounded-full ${
                  selectedMetric === "exercise"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Exercise
              </button>
            </div>

            {/* Progress Chart */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {selectedMetric === "weight"
                  ? "Weight Progress (kg)"
                  : selectedMetric === "calories"
                  ? "Calorie Intake"
                  : "Exercise Minutes"}
              </h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey={selectedMetric}
                      stroke="#10B981"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Progress Summary Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Current Weight
                </h3>
                <p className="text-3xl font-bold text-green-600">
                  {progressData.length > 0
                    ? `${progressData[progressData.length - 1].weight} kg`
                    : "N/A"}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {progressData.length > 1
                    ? `Change: ${(
                        progressData[progressData.length - 1].weight -
                        progressData[0].weight
                      ).toFixed(1)} kg`
                    : "Not enough data"}
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Average Calories
                </h3>
                <p className="text-3xl font-bold text-green-600">
                  {progressData.length > 0
                    ? `${(
                        progressData.reduce(
                          (sum, item) => sum + item.calories,
                          0
                        ) / progressData.length
                      ).toFixed(0)} kcal`
                    : "N/A"}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {progressData.length > 1
                    ? "Daily average"
                    : "Not enough data"}
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Exercise Minutes
                </h3>
                <p className="text-3xl font-bold text-green-600">
                  {progressData.length > 0
                    ? `${progressData.reduce(
                        (sum, item) => sum + item.exerciseMinutes,
                        0
                      )} min`
                    : "N/A"}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {progressData.length > 1
                    ? "Total for period"
                    : "Not enough data"}
                </p>
              </div>
            </div>

            {/* Recent Progress Entries */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Recent Entries
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Weight (kg)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Calories
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Exercise (min)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {progressData
                      .slice()
                      .reverse()
                      .map((entry, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(entry.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {entry.weight}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {entry.calories}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {entry.exerciseMinutes}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-50 py-10 border-t border-gray-200">
        <div className="container mx-auto px-4">
          {/* Footer content same as before */}
        </div>
      </footer>
    </div>
  );
};

export default Progress;
