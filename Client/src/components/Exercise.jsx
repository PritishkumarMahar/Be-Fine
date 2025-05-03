import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Exercise = ({ onCaloriesBurnedUpdate, userPlan }) => {
  // State declarations
  const [sortBy, setSortBy] = useState("default");
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [totalCaloriesBurned, setTotalCaloriesBurned] = useState(0);
  const [duration, setDuration] = useState(30);
  const [exercisesByType, setExercisesByType] = useState({});
  const [consumedCalories, setConsumedCalories] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Complete exercise database
  const exerciseItems = [
    { name: "Running", calories: 200, intensity: "high", type: "cardio" },
    { name: "Walking", calories: 20, intensity: "low", type: "cardio" },
    {
      name: "Knee Pushups",
      calories: 30,
      intensity: "medium",
      type: "strength",
    },
    { name: "Crunches", calories: 40, intensity: "medium", type: "core" },
    { name: "Jump Squat", calories: 70, intensity: "high", type: "legs" },
    { name: "Cycling", calories: 150, intensity: "medium", type: "cardio" },
    { name: "Swimming", calories: 180, intensity: "high", type: "cardio" },
    { name: "Yoga", calories: 50, intensity: "low", type: "flexibility" },
    { name: "Jump Rope", calories: 120, intensity: "high", type: "cardio" },
    { name: "Burpees", calories: 100, intensity: "high", type: "full-body" },
    { name: "Plank", calories: 25, intensity: "medium", type: "core" },
    { name: "Lunges", calories: 60, intensity: "medium", type: "legs" },
    { name: "Pull-ups", calories: 80, intensity: "high", type: "strength" },
    { name: "Sit-ups", calories: 45, intensity: "medium", type: "core" },
    { name: "Stair Climbing", calories: 90, intensity: "high", type: "cardio" },
    { name: "Dancing", calories: 110, intensity: "medium", type: "cardio" },
    { name: "Hiking", calories: 140, intensity: "medium", type: "cardio" },
    { name: "Rowing", calories: 160, intensity: "high", type: "cardio" },
    { name: "Pilates", calories: 55, intensity: "low", type: "flexibility" },
    { name: "Boxing", calories: 130, intensity: "high", type: "cardio" },
  ];

  // Load all data from localStorage
  useEffect(() => {
    const loadData = () => {
      try {
        // Load exercise data
        const savedExercises =
          JSON.parse(localStorage.getItem("exerciseLog")) || [];
        setSelectedExercises(savedExercises);

        const exerciseTotal = savedExercises.reduce(
          (sum, ex) => sum + ex.caloriesBurned,
          0
        );
        setTotalCaloriesBurned(exerciseTotal);
        if (onCaloriesBurnedUpdate) onCaloriesBurnedUpdate(exerciseTotal);

        // Load food data
        const savedFoods = JSON.parse(localStorage.getItem("foodLog")) || [];
        const foodTotal = savedFoods.reduce(
          (sum, food) => sum + food.calories,
          0
        );
        setConsumedCalories(foodTotal);

        // Organize exercises by type
        const organizedByType = {};
        savedExercises.forEach((exercise) => {
          const typeKey = exercise.type || "general";
          if (!organizedByType[typeKey]) organizedByType[typeKey] = [];
          organizedByType[typeKey].push(exercise);
        });
        setExercisesByType(organizedByType);

        setIsLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        localStorage.removeItem("exerciseLog");
        localStorage.removeItem("foodLog");
        setIsLoading(false);
      }
    };

    loadData();

    // Listen for storage changes
    const handleStorageChange = (e) => {
      if (["foodLog", "exerciseLog"].includes(e.key)) {
        loadData();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [onCaloriesBurnedUpdate]);

  // Add exercise to log
  const addExercise = (exercise) => {
    const caloriesBurned = Math.round(exercise.calories * (duration / 30));
    const newExercise = {
      ...exercise,
      id: Date.now(),
      duration,
      caloriesBurned,
      timestamp: new Date().toISOString(),
    };
    const newExercises = [...selectedExercises, newExercise];

    // Update state and localStorage
    setSelectedExercises(newExercises);
    localStorage.setItem("exerciseLog", JSON.stringify(newExercises));

    // Update totals
    const newTotal = totalCaloriesBurned + caloriesBurned;
    setTotalCaloriesBurned(newTotal);
    if (onCaloriesBurnedUpdate) onCaloriesBurnedUpdate(newTotal);

    // Update organized exercises
    const typeKey = newExercise.type;
    setExercisesByType((prev) => ({
      ...prev,
      [typeKey]: [...(prev[typeKey] || []), newExercise],
    }));
  };

  // Remove exercise from log
  const removeExercise = (id) => {
    const exerciseToRemove = selectedExercises.find((ex) => ex.id === id);
    if (!exerciseToRemove) return;

    const newExercises = selectedExercises.filter((ex) => ex.id !== id);

    // Update state and localStorage
    setSelectedExercises(newExercises);
    localStorage.setItem("exerciseLog", JSON.stringify(newExercises));

    // Update totals
    const newTotal = totalCaloriesBurned - exerciseToRemove.caloriesBurned;
    setTotalCaloriesBurned(newTotal);
    if (onCaloriesBurnedUpdate) onCaloriesBurnedUpdate(newTotal);

    // Update organized exercises
    const typeKey = exerciseToRemove.type;
    setExercisesByType((prev) => ({
      ...prev,
      [typeKey]: (prev[typeKey] || []).filter((ex) => ex.id !== id),
    }));
  };

  // Calculate derived values
  const netCalories = consumedCalories - totalCaloriesBurned;
  const remainingCalories = userPlan ? userPlan.calories - consumedCalories : 0;

  // Sort exercises based on current sort method
  const sortedExerciseItems = [...exerciseItems].sort((a, b) => {
    if (sortBy === "calories") return b.calories - a.calories;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "intensity") {
      const intensityOrder = { high: 3, medium: 2, low: 1 };
      return intensityOrder[b.intensity] - intensityOrder[a.intensity];
    }
    return 0;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-600 py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-2">
              <img src="/logo.png" alt="Be~Fine Logo" className="h-26" />
            </div>
            <h1 className="text-white text-3xl font-bold"></h1>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/profile"
              className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-full transition"
            >
              PROFILE
            </Link>
            <Link
              to="/logout"
              className="border-2 border-white text-white font-bold py-2 px-6 rounded-full hover:bg-white hover:text-green-600 transition"
            >
              LOG OUT
            </Link>
          </div>
        </div>
      </header>

      {/* Navigation */}
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Summary Card */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
                Exercise Tracker
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <div className="flex-1">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Sort by
                  </label>
                  <select
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="default">Default</option>
                    <option value="name">Name</option>
                    <option value="calories">Calories</option>
                    <option value="intensity">Intensity</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="240"
                    value={duration}
                    onChange={(e) =>
                      setDuration(
                        Math.max(
                          1,
                          Math.min(240, parseInt(e.target.value) || 1)
                        )
                      )
                    }
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>

            {/* Calorie Summary */}
            <div className="bg-green-50 rounded-lg p-4 mb-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Calorie Summary
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                      <p className="text-sm text-gray-600">Consumed</p>
                      <p className="text-2xl font-bold text-green-600">
                        {consumedCalories} kcal
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                      <p className="text-sm text-gray-600">Burned</p>
                      <p className="text-2xl font-bold text-red-600">
                        {totalCaloriesBurned} kcal
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                      <p className="text-sm text-gray-600">Net</p>
                      <p
                        className={`text-2xl font-bold ${
                          netCalories > 0 ? "text-green-600" : "text-blue-600"
                        }`}
                      >
                        {netCalories} kcal
                      </p>
                    </div>
                  </div>
                  {userPlan && (
                    <div className="mt-3 bg-white p-3 rounded-lg text-center shadow-sm">
                      <p className="text-sm text-gray-600">
                        Plan: {userPlan.name}
                      </p>
                      <p
                        className={`text-xl font-bold ${
                          remainingCalories >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {remainingCalories >= 0
                          ? `${remainingCalories} kcal remaining`
                          : `${Math.abs(remainingCalories)} kcal over`}
                      </p>
                    </div>
                  )}
                </div>

                <Link
                  to="/Reports"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition w-full md:w-auto text-center shadow-md"
                >
                  Updates
                </Link>
              </div>
            </div>
          </div>

          {/* Exercise Selection and Log */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Available Exercises */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Available Exercises
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {sortedExerciseItems.map((exercise, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-200"
                    >
                      <h4 className="font-bold text-gray-800 truncate">
                        {exercise.name}
                      </h4>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-green-600 font-medium">
                          {Math.round(exercise.calories * (duration / 30))} kcal
                        </p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            exercise.intensity === "high"
                              ? "bg-red-100 text-red-800"
                              : exercise.intensity === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {exercise.intensity}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 capitalize">
                        {exercise.type.replace("-", " ")}
                      </p>
                      <button
                        onClick={() => addExercise(exercise)}
                        className="mt-3 bg-green-100 hover:bg-green-200 text-green-800 font-medium py-2 px-4 rounded-full text-sm transition w-full shadow-sm"
                      >
                        Add Exercise
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected Exercises */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Your Exercise Log ({selectedExercises.length})
                </h3>
                {selectedExercises.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 italic">
                      No exercises logged yet.
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      Add exercises from the list
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {Object.entries(exercisesByType).map(
                      ([type, exercises]) => (
                        <div key={type} className="mb-4">
                          <h4 className="font-semibold text-gray-700 mb-2 capitalize">
                            {type === "general"
                              ? "All Exercises"
                              : type.replace("-", " ")}
                          </h4>
                          <div className="space-y-3">
                            {exercises.map((exercise) => (
                              <div
                                key={exercise.id}
                                className="flex justify-between items-center border-b border-gray-100 pb-3"
                              >
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium truncate">
                                    {exercise.name}
                                  </p>
                                  <div className="flex items-center text-sm">
                                    <span className="text-red-600 mr-2 font-medium">
                                      {exercise.caloriesBurned} kcal
                                    </span>
                                    <span className="text-gray-500 text-xs">
                                      ({exercise.duration} min)
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-400">
                                    {new Date(
                                      exercise.timestamp
                                    ).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </span>
                                  <button
                                    onClick={() => removeExercise(exercise.id)}
                                    className="text-red-500 hover:text-red-700 p-1"
                                    aria-label="Remove exercise"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-5 w-5"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
            <p className="mb-4 md:mb-0">© 2023 Be~Fine. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="hover:text-green-600">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-green-600">
                Terms
              </Link>
              <Link to="/contact" className="hover:text-green-600">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Exercise;
