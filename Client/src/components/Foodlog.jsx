import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const FoodLog = ({ burnedCalories = 0, onCaloriesUpdate, userPlan }) => {
  // State declarations
  const [timeFilter, setTimeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [foodsByTime, setFoodsByTime] = useState({});
  const [foodItems, setFoodItems] = useState([]);
  const { token, user } = useAuth();
  // Food database (same as before)
  const fetchFoodItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/foods/food", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("Fetched food items:", response.data);
      setFoodItems(response.data); // Adjust according to your backend response
    } catch (error) {
      console.error("Error fetching food items:", error);
    }
  };
  useEffect(() => {
    // Fetch food items from the server
    fetchFoodItems();
  }, []); // Fetch food items on component mount
  // Save food data
  const saveFoodData = (foods) => {
    localStorage.setItem("foodLog", JSON.stringify(foods));
    const total = foods.reduce((sum, food) => sum + food.calories, 0);
    setTotalCalories(total);
    if (onCaloriesUpdate) onCaloriesUpdate(total);
  };

  // Load initial data
  useEffect(() => {
    const savedFoods = JSON.parse(localStorage.getItem("foodLog")) || [];
    setSelectedFoods(savedFoods);

    const initialTotal = savedFoods.reduce(
      (sum, food) => sum + food.calories,
      0
    );
    setTotalCalories(initialTotal);
    if (onCaloriesUpdate) onCaloriesUpdate(initialTotal);

    const organizedByTime = {};
    savedFoods.forEach((food) => {
      const timeKey = food.time || "general";
      if (!organizedByTime[timeKey]) organizedByTime[timeKey] = [];
      organizedByTime[timeKey].push(food);
    });
    setFoodsByTime(organizedByTime);
  }, [onCaloriesUpdate]);

  // Add food
  const addFood = (food) => {
    const newFood = {
      ...food,
      id: Date.now(),
      time: timeFilter === "all" ? "general" : timeFilter,
      timestamp: new Date().toISOString(),
    };
    const newFoods = [...selectedFoods, newFood];
    setSelectedFoods(newFoods);
    saveFoodData(newFoods);

    const timeKey = newFood.time;
    setFoodsByTime((prev) => ({
      ...prev,
      [timeKey]: [...(prev[timeKey] || []), newFood],
    }));
  };

  // Remove food
  const removeFood = (id) => {
    const foodToRemove = selectedFoods.find((food) => food.id === id);
    if (!foodToRemove) return;

    const newFoods = selectedFoods.filter((food) => food.id !== id);
    setSelectedFoods(newFoods);
    saveFoodData(newFoods);

    const timeKey = foodToRemove.time;
    setFoodsByTime((prev) => ({
      ...prev,
      [timeKey]: (prev[timeKey] || []).filter((food) => food.id !== id),
    }));
  };

  // Calculate values
  const netCalories = totalCalories - burnedCalories;
  const remainingCalories = userPlan ? userPlan.calories - totalCalories : 0;

  // Sort and filter foods
  const sortedFoodItems = [...foodItems].sort((a, b) => {
    if (sortBy === "calories") return a.calories - b.calories;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  const filteredFoodItems =
    timeFilter === "all"
      ? sortedFoodItems
      : sortedFoodItems.filter((food) => food.time === timeFilter);

  return (
    <div>
      {/* Header with Logo and Navigation */}
      <header className="bg-green-600 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-2">
              <img src="/logo.png" alt="Logo" className="h-26" />
            </div>
            <h1 className="text-white text-3xl font-bold"> Be~Fine </h1>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/profile">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-full transition">
                PROFILE
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

      {/* Updated Summary Section */}
      <div className="bg-green-50 rounded-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Calorie Summary
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white p-2 rounded text-center">
                <p className="text-sm text-gray-600">Consumed</p>
                <p className="text-xl font-bold text-green-600">
                  {totalCalories} kcal
                </p>
              </div>
              <div className="bg-white p-2 rounded text-center">
                <p className="text-sm text-gray-600">Burned</p>
                <p className="text-xl font-bold text-red-600">
                  {burnedCalories} kcal
                </p>
              </div>
              <div className="bg-white p-2 rounded text-center">
                <p className="text-sm text-gray-600">Net</p>
                <p
                  className={`text-xl font-bold ${
                    netCalories > 0 ? "text-green-600" : "text-blue-600"
                  }`}
                >
                  {netCalories} kcal
                </p>
              </div>
            </div>
            {userPlan && (
              <div className="mt-2 bg-white p-2 rounded text-center">
                <p className="text-sm text-gray-600">Plan: {userPlan.name}</p>
                <p
                  className={`text-lg font-bold ${
                    remainingCalories >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {remainingCalories} kcal remaining
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 w-full md:w-auto">
            <Link
              to="/exercise"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition text-center"
            >
              Add Exercise
            </Link>
            {userPlan && (
              <button
                onClick={() => setShowPlanModal(true)}
                className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-full transition"
              >
                View Plan Details
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Food Selection and Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Available Foods */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Available Foods (
              {timeFilter === "all"
                ? "All"
                : timeFilter.charAt(0).toUpperCase() + timeFilter.slice(1)}
              )
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredFoodItems.map((food, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 hover:shadow-md transition"
                >
                  <h4 className="font-bold text-gray-800">{food.name}</h4>
                  <p className="text-green-600">{food.calories} kcal</p>
                  <p className="text-xs text-gray-500 mt-1">{food.time}</p>
                  <button
                    onClick={() => addFood(food)}
                    className="mt-2 bg-green-100 hover:bg-green-200 text-green-800 font-medium py-1 px-3 rounded-full text-sm transition w-full"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Foods */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Your Food Log ({selectedFoods.length})
            </h3>
            {selectedFoods.length === 0 ? (
              <p className="text-gray-500 italic">
                No foods added yet. Select foods from the list.
              </p>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {Object.entries(foodsByTime).map(([time, foods]) => (
                  <div key={time}>
                    <h4 className="font-semibold text-gray-700 mb-2">
                      {time === "general"
                        ? "All Day"
                        : time.charAt(0).toUpperCase() + time.slice(1)}
                    </h4>
                    <div className="space-y-3">
                      {foods.map((food) => (
                        <div
                          key={food.id}
                          className="flex justify-between items-center border-b pb-2"
                        >
                          <div>
                            <p className="font-medium">{food.name}</p>
                            <p className="text-sm text-green-600">
                              {food.calories} kcal
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">
                              {new Date(
                                food.timestamp || food.id
                              ).toLocaleTimeString()}
                            </span>
                            <button
                              onClick={() => removeFood(food.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Plan Modal */}
      {showPlanModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Select a Plan
            </h3>
            <div className="space-y-3">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`border rounded-lg p-4 cursor-pointer ${
                    selectedPlan?.name === plan.name
                      ? "bg-green-50 border-green-300"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => selectPlan(plan)}
                >
                  <h4 className="font-bold text-gray-800">{plan.name}</h4>
                  <p className="text-gray-600">{plan.calories} kcal/day</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowPlanModal(false)}
                className="border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Footer */}
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

export default FoodLog;
