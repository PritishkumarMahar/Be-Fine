import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState("month"); // week, month, year
  const [selectedMetric, setSelectedMetric] = useState("weight"); // weight, calories, exercise

  // Load data from localStorage and format for progress tracking
  useEffect(() => {
    const loadData = () => {
      setLoading(true);

      // Get food and exercise logs from localStorage
      const foodLog = JSON.parse(localStorage.getItem("foodLog")) || [];
      const exerciseLog = JSON.parse(localStorage.getItem("exerciseLog")) || [];
      const selectedPlan = JSON.parse(localStorage.getItem("selectedPlan"));

      // Group data by date
      const dailyData = {};

      // Process food logs
      foodLog.forEach((food) => {
        const date = new Date(food.id).toLocaleDateString();
        if (!dailyData[date]) {
          dailyData[date] = {
            date: food.id,
            weight: null, // Weight needs to be tracked separately
            calories: 0,
            exerciseMinutes: 0,
            caloriesBurned: 0,
          };
        }
        dailyData[date].calories += food.calories;
      });

      // Process exercise logs
      exerciseLog.forEach((exercise) => {
        const date = new Date(exercise.id).toLocaleDateString();
        if (!dailyData[date]) {
          dailyData[date] = {
            date: exercise.id,
            weight: null,
            calories: 0,
            exerciseMinutes: 0,
            caloriesBurned: 0,
          };
        }
        dailyData[date].exerciseMinutes += exercise.duration;
        dailyData[date].caloriesBurned += exercise.caloriesBurned;
      });

      // Get weight data (you might want to add weight tracking to your food/exercise logs)
      // For now, we'll just use the last weight from localStorage if available
      const userData = JSON.parse(localStorage.getItem("userData"));
      const weight = userData?.weight || null;

      // Add weight to all entries (this is a simplification)
      Object.keys(dailyData).forEach((date) => {
        dailyData[date].weight = weight;
      });

      // Convert to array and sort by date
      const formattedData = Object.values(dailyData)
        .map((item) => ({
          ...item,
          date: new Date(item.date).toISOString().split("T")[0], // Format as YYYY-MM-DD
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      setProgressData(formattedData);
      setLoading(false);
    };

    loadData();
  }, [timeRange]); // Re-run when time range changes

  // Filter data based on selected time range
  const getFilteredData = () => {
    const now = new Date();
    let cutoffDate = new Date();

    switch (timeRange) {
      case "week":
        cutoffDate.setDate(now.getDate() - 7);
        break;
      case "month":
        cutoffDate.setMonth(now.getMonth() - 1);
        break;
      case "year":
        cutoffDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        cutoffDate = new Date(0); // All time
    }

    return progressData.filter((item) => new Date(item.date) >= cutoffDate);
  };

  const filteredData = getFilteredData();

  // Process data for chart
  const chartData = filteredData.map((item) => ({
    date: new Date(item.date).toLocaleDateString(),
    weight: item.weight,
    calories: item.calories,
    exercise: item.exerciseMinutes,
    caloriesBurned: item.caloriesBurned,
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
              <button
                onClick={() => setSelectedMetric("caloriesBurned")}
                className={`px-4 py-2 rounded-full ${
                  selectedMetric === "caloriesBurned"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Calories Burned
              </button>
            </div>

            {loading ? (
              <div className="text-center py-8">Loading your data...</div>
            ) : filteredData.length === 0 ? (
              <div className="text-center py-8">
                No progress data available. Start logging your meals and
                exercises to see your progress.
              </div>
            ) : (
              <>
                {/* Progress Chart */}
                <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    {selectedMetric === "weight"
                      ? "Weight Progress (kg)"
                      : selectedMetric === "calories"
                      ? "Calorie Intake"
                      : selectedMetric === "exercise"
                      ? "Exercise Minutes"
                      : "Calories Burned"}
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
                      {timeRange === "week"
                        ? "Weekly"
                        : timeRange === "month"
                        ? "Monthly"
                        : "Yearly"}{" "}
                      Calories
                    </h3>
                    <p className="text-3xl font-bold text-green-600">
                      {filteredData.reduce(
                        (sum, item) => sum + item.calories,
                        0
                      )}{" "}
                      kcal
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Average:{" "}
                      {Math.round(
                        filteredData.reduce(
                          (sum, item) => sum + item.calories,
                          0
                        ) / (filteredData.length || 1)
                      )}{" "}
                      kcal/day
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      {timeRange === "week"
                        ? "Weekly"
                        : timeRange === "month"
                        ? "Monthly"
                        : "Yearly"}{" "}
                      Exercise
                    </h3>
                    <p className="text-3xl font-bold text-green-600">
                      {filteredData.reduce(
                        (sum, item) => sum + item.exerciseMinutes,
                        0
                      )}{" "}
                      min
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Calories burned:{" "}
                      {filteredData.reduce(
                        (sum, item) => sum + item.caloriesBurned,
                        0
                      )}{" "}
                      kcal
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Net Calories
                    </h3>
                    <p className="text-3xl font-bold text-green-600">
                      {filteredData.reduce(
                        (sum, item) => sum + item.calories,
                        0
                      ) -
                        filteredData.reduce(
                          (sum, item) => sum + item.caloriesBurned,
                          0
                        )}{" "}
                      kcal
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      {filteredData.length} days tracked
                    </p>
                  </div>
                </div>

                {/* Recent Progress Entries */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Daily Summary
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Calories
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Exercise (min)
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Calories Burned
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Net Calories
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredData
                          .slice()
                          .reverse()
                          .map((entry, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(entry.date).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {entry.calories} kcal
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {entry.exerciseMinutes} min
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {entry.caloriesBurned} kcal
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {entry.calories - entry.caloriesBurned} kcal
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-gray-50 py-10 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm border-t border-gray-200 pt-6">
            <p>Copyright © 2023 Be~Fine. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/contact" className="hover:text-green-600">
                Contact Us
              </Link>
              <span className="text-gray-300">|</span>
              <Link to="/privacy" className="hover:text-green-600">
                Privacy
              </Link>
              <span className="text-gray-300">|</span>
              <Link to="/terms" className="hover:text-green-600">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Progress;
