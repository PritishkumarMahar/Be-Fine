// import React from "react";
// const Reports = () => {
//   return (
//     <>
//       <h1>REports</h1>
//     </>
//   );
// };

// export default Reports;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Report = () => {
  // State for food data
  const [foodLog, setFoodLog] = useState([]);
  const [totalCaloriesConsumed, setTotalCaloriesConsumed] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // State for exercise data
  const [exerciseLog, setExerciseLog] = useState([]);
  const [totalCaloriesBurned, setTotalCaloriesBurned] = useState(0);

  // Calculate net calories
  const netCalories = totalCaloriesConsumed - totalCaloriesBurned;
  const remainingCalories = selectedPlan
    ? selectedPlan.calories - totalCaloriesConsumed
    : 0;

  // Sample plans data
  const plans = [
    { name: "Weight Loss", calories: 1500 },
    { name: "Maintenance", calories: 2000 },
    { name: "Muscle Gain", calories: 2500 },
  ];

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedFoodLog = JSON.parse(localStorage.getItem("foodLog")) || [];
    const savedExerciseLog =
      JSON.parse(localStorage.getItem("exerciseLog")) || [];
    const savedPlan = JSON.parse(localStorage.getItem("selectedPlan"));

    setFoodLog(savedFoodLog);
    setExerciseLog(savedExerciseLog);
    if (savedPlan) setSelectedPlan(savedPlan);

    // Calculate totals
    const consumed = savedFoodLog.reduce((sum, food) => sum + food.calories, 0);
    const burned = savedExerciseLog.reduce(
      (sum, ex) => sum + ex.caloriesBurned,
      0
    );

    setTotalCaloriesConsumed(consumed);
    setTotalCaloriesBurned(burned);
  }, []);

  // Select a diet plan
  const selectPlan = (plan) => {
    setSelectedPlan(plan);
    localStorage.setItem("selectedPlan", JSON.stringify(plan));
  };

  return (
    <div>
      {/* Header with Logo and Navigation */}
      <header className="bg-green-600 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-2">
              <img src="/api/placeholder/60/60" alt="Logo" className="h-12" />
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

      {/* Report Content */}
      <section className="py-8 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Summary Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Daily Summary
              </h2>

              {/* Calorie Summary */}
              <div className="bg-green-50 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Consumed</p>
                    <p className="text-2xl font-bold text-green-600">
                      {totalCaloriesConsumed} kcal
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Burned</p>
                    <p className="text-2xl font-bold text-red-600">
                      {totalCaloriesBurned} kcal
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Net Calories</p>
                    <p
                      className={`text-2xl font-bold ${
                        netCalories > 0 ? "text-green-600" : "text-blue-600"
                      }`}
                    >
                      {netCalories} kcal
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Plan</p>
                    {selectedPlan ? (
                      <>
                        <p className="text-lg font-bold">{selectedPlan.name}</p>
                        <p
                          className={`text-xl ${
                            remainingCalories >= 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {remainingCalories} kcal remaining
                        </p>
                      </>
                    ) : (
                      <button
                        onClick={() => selectPlan(plans[0])}
                        className="text-yellow-600 hover:text-yellow-700 font-medium"
                      >
                        Select a Plan
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Plan Selection */}
              {!selectedPlan && (
                <div className="bg-yellow-50 rounded-lg p-4 mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Select Your Plan
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {plans.map((plan) => (
                      <div
                        key={plan.name}
                        className="border border-yellow-200 rounded-lg p-3 hover:bg-yellow-100 cursor-pointer"
                        onClick={() => selectPlan(plan)}
                      >
                        <h4 className="font-bold">{plan.name}</h4>
                        <p className="text-sm">{plan.calories} kcal/day</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/food-log"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full text-center flex-1"
                >
                  Add Food
                </Link>
                <Link
                  to="/exercise"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-center flex-1"
                >
                  Add Exercise
                </Link>
                {selectedPlan && (
                  <button
                    onClick={() => setSelectedPlan(null)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full flex-1"
                  >
                    Change Plan
                  </button>
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Foods */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Recent Foods ({foodLog.length})
                </h3>
                {foodLog.length === 0 ? (
                  <p className="text-gray-500 italic">No foods logged yet.</p>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {foodLog.slice(0, 10).map((food, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center border-b pb-2"
                      >
                        <div>
                          <p className="font-medium">{food.name}</p>
                          <p className="text-sm text-green-600">
                            {food.calories} kcal
                          </p>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(food.id).toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {foodLog.length > 10 && (
                  <p className="text-sm text-gray-500 mt-2">
                    Showing 10 of {foodLog.length} items
                  </p>
                )}
              </div>

              {/* Recent Exercises */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Recent Exercises ({exerciseLog.length})
                </h3>
                {exerciseLog.length === 0 ? (
                  <p className="text-gray-500 italic">
                    No exercises logged yet.
                  </p>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {exerciseLog.slice(0, 10).map((exercise, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center border-b pb-2"
                      >
                        <div>
                          <p className="font-medium">{exercise.name}</p>
                          <div className="flex items-center text-sm">
                            <span className="text-red-600 mr-2">
                              {exercise.caloriesBurned} kcal
                            </span>
                            <span className="text-gray-500">
                              ({exercise.duration} min)
                            </span>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(exercise.id).toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {exerciseLog.length > 10 && (
                  <p className="text-sm text-gray-500 mt-2">
                    Showing 10 of {exerciseLog.length} items
                  </p>
                )}
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

export default Report;
