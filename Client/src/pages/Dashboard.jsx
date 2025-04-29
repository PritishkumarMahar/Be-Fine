import React, { useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("1.2");
  const [goal, setGoal] = useState("maintain");
  const [calories, setCalories] = useState(null);
  const [bmr, setBmr] = useState(null);

  const calculateCalories = (e) => {
    e.preventDefault();

    if (!age || !height || !weight) {
      alert("Please fill in all fields");
      return;
    }

    // Calculate BMR (Basal Metabolic Rate)
    let calculatedBmr;
    if (gender === "male") {
      calculatedBmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    } else {
      calculatedBmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
    }

    // Calculate TDEE (Total Daily Energy Expenditure)
    const tdee = calculatedBmr * parseFloat(activityLevel);

    // Adjust for goal
    let finalCalories;
    switch (goal) {
      case "lose":
        finalCalories = tdee - 500; // 500 calorie deficit for weight loss
        break;
      case "gain":
        finalCalories = tdee + 500; // 500 calorie surplus for weight gain
        break;
      default:
        finalCalories = tdee; // maintain weight
    }

    setBmr(Math.round(calculatedBmr));
    setCalories(Math.round(finalCalories));
  };

  return (
    <div>
      {/* Header with Logo and Navigation - Same as Home.jsx */}
      <header className="bg-green-600 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-2">
              <img src="/logo.png" alt="Logo" className="h-26" />
            </div>
            {/* <h1 className="text-white text-3xl font-bold"> Be~Fine </h1> */}
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/profile">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-full transition">
                PROFILE
              </button>
            </Link>
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

      {/* Main Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calorie Calculator Section */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Calorie Calculator
            </h2>

            <form onSubmit={calculateCalories}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 mb-2">
                    Age (years)
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    min="10"
                    max="120"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Gender</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    min="100"
                    max="250"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    min="30"
                    max="300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Activity Level
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={activityLevel}
                    onChange={(e) => setActivityLevel(e.target.value)}
                  >
                    <option value="1.2">
                      Sedentary (little or no exercise)
                    </option>
                    <option value="1.375">
                      Lightly active (light exercise 1-3 days/week)
                    </option>
                    <option value="1.55">
                      Moderately active (moderate exercise 3-5 days/week)
                    </option>
                    <option value="1.725">
                      Very active (hard exercise 6-7 days/week)
                    </option>
                    <option value="1.9">
                      Extra active (very hard exercise & physical job)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Goal</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                  >
                    <option value="lose">Lose weight</option>
                    <option value="maintain">Maintain weight</option>
                    <option value="gain">Gain weight</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition"
              >
                Calculate Calories
              </button>
            </form>

            {calories && (
              <div className="mt-8 p-6 bg-green-50 rounded-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Your Results
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-gray-600">Basal Metabolic Rate (BMR)</p>
                    <p className="text-3xl font-bold text-green-600">
                      {bmr} kcal
                    </p>
                    <p className="text-sm text-gray-500">
                      Calories your body needs at complete rest
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-gray-600">Daily Calorie Needs</p>
                    <p className="text-3xl font-bold text-green-600">
                      {calories} kcal
                    </p>
                    <p className="text-sm text-gray-500">
                      {goal === "lose"
                        ? "For weight loss (500 cal deficit)"
                        : goal === "gain"
                        ? "For weight gain (500 cal surplus)"
                        : "To maintain current weight"}
                    </p>
                  </div>
                </div>

                <div className="mt-6 bg-white p-4 rounded-lg shadow">
                  <h4 className="font-bold text-gray-800 mb-2">
                    Macronutrient Distribution
                  </h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-lg font-bold text-green-600">
                        Protein
                      </p>
                      <p className="text-gray-700">
                        {Math.round((calories * 0.3) / 4)}g
                      </p>
                      <p className="text-sm text-gray-500">30% of calories</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-green-600">Carbs</p>
                      <p className="text-gray-700">
                        {Math.round((calories * 0.4) / 4)}g
                      </p>
                      <p className="text-sm text-gray-500">40% of calories</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-green-600">Fats</p>
                      <p className="text-gray-700">
                        {Math.round((calories * 0.3) / 9)}g
                      </p>
                      <p className="text-sm text-gray-500">30% of calories</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Stats Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Today's Summary
            </h2>

            <div className="space-y-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-700">Calories</p>
                  <p className="font-bold">1,250 / {calories || "--"}</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-600 h-2.5 rounded-full"
                    style={{
                      width: calories
                        ? `${Math.min(100, (1250 / calories) * 100)}%`
                        : "0%",
                    }}
                  ></div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-700">Protein</p>
                  <p className="font-bold">85g</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{
                      width: calories
                        ? `${Math.min(
                            100,
                            (85 / ((calories * 0.3) / 4)) * 100
                          )}%`
                        : "0%",
                    }}
                  ></div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-700">Carbs</p>
                  <p className="font-bold">120g</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-yellow-500 h-2.5 rounded-full"
                    style={{
                      width: calories
                        ? `${Math.min(
                            100,
                            (120 / ((calories * 0.4) / 4)) * 100
                          )}%`
                        : "0%",
                    }}
                  ></div>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-700">Fats</p>
                  <p className="font-bold">45g</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-red-500 h-2.5 rounded-full"
                    style={{
                      width: calories
                        ? `${Math.min(
                            100,
                            (45 / ((calories * 0.3) / 9)) * 100
                          )}%`
                        : "0%",
                    }}
                  ></div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-700">Water</p>
                  <p className="font-bold">1.5L / 2.5L</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-purple-600 h-2.5 rounded-full"
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </div>

              <div className="bg-indigo-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-700">Exercise</p>
                  <p className="font-bold">350 kcal burned</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-indigo-600 h-2.5 rounded-full"
                    style={{ width: "70%" }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Link to="/food-log">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition">
                  Log Your Meals
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Recent Activity
          </h2>

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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium">Breakfast logged</p>
                <p className="text-sm text-gray-500">
                  Oatmeal with berries - 320 kcal
                </p>
              </div>
              <div className="ml-auto text-sm text-gray-500">8:30 AM</div>
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium">Morning walk</p>
                <p className="text-sm text-gray-500">
                  30 min - 150 kcal burned
                </p>
              </div>
              <div className="ml-auto text-sm text-gray-500">10:15 AM</div>
            </div>

            <div className="flex items-center p-3 border-b border-gray-100">
              <div className="bg-yellow-100 p-2 rounded-full mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-yellow-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium">Lunch logged</p>
                <p className="text-sm text-gray-500">
                  Grilled chicken salad - 450 kcal
                </p>
              </div>
              <div className="ml-auto text-sm text-gray-500">12:45 PM</div>
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
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium">Weight updated</p>
                <p className="text-sm text-gray-500">
                  75.2 kg (-0.8 kg from last week)
                </p>
              </div>
              <div className="ml-auto text-sm text-gray-500">Yesterday</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Same as Home.jsx */}
      <footer className="bg-gray-50 py-10 border-t border-gray-200">
        <div className="container mx-auto px-4">
          {/* Main footer content with logo and links */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-10">
            {/* Logo and App Store Links section */}
            <div className="mb-8 md:mb-0">
              <div className="mb-6">
                <img src="/logo.png" alt="Logo" className="h-26" />
                <h2 className="text-green-600 text-2xl font-bold">
                  CALORIES TRACKER
                </h2>
              </div>

              <div className="flex items-center mb-4">
                <div className="flex">
                  <span className="text-yellow-400">★</span>
                  <span className="text-yellow-400">★</span>
                  <span className="text-yellow-400">★</span>
                  <span className="text-yellow-400">★</span>
                  <span className="text-yellow-400">★</span>
                </div>
                <span className="ml-2 text-gray-700">
                  4.8 • 184,041 Ratings
                </span>
              </div>

              {/* Social Media Icons */}
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="block p-2 rounded-full border border-gray-300 text-gray-400 hover:text-gray-600 hover:border-gray-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <rect
                      width="20"
                      height="20"
                      x="2"
                      y="2"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  href="#"
                  className="block p-2 rounded-full border border-gray-300 text-gray-400 hover:text-gray-600 hover:border-gray-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="block p-2 rounded-full border border-gray-300 text-gray-400 hover:text-gray-600 hover:border-gray-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="block p-2 rounded-full border border-gray-300 text-gray-400 hover:text-gray-600 hover:border-gray-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                    <path d="m10 15 5-3-5-3z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="block p-2 rounded-full border border-gray-300 text-gray-400 hover:text-gray-600 hover:border-gray-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
              </div>
            </div>

            {/* Links Sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-16">
              {/* App Features Section */}
              <div>
                <h3 className="text-blue-700 font-bold mb-4 uppercase">
                  App Features
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <a href="#" className="text-gray-700 hover:text-blue-700">
                      IPHONE & IPAD APP
                    </a>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <a href="#" className="text-gray-700 hover:text-blue-700">
                      ANDROID APP
                    </a>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <a href="#" className="text-gray-700 hover:text-blue-700">
                      KETO DIET
                    </a>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <a href="#" className="text-gray-700 hover:text-blue-700">
                      LOW-CARB DIET
                    </a>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <a href="#" className="text-gray-700 hover:text-blue-700">
                      CALORIE COUNTING
                    </a>
                  </li>
                </ul>
              </div>

              {/* Weight Loss Science Section */}
              <div>
                <h3 className="text-blue-700 font-bold mb-4 uppercase">
                  Weight Loss Science
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <a href="#" className="text-gray-700 hover:text-blue-700">
                      WEIGHT LOSS BLOG
                    </a>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <a href="#" className="text-gray-700 hover:text-blue-700">
                      DIET LIBRARY
                    </a>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <a href="#" className="text-gray-700 hover:text-blue-700">
                      DIETITIAN TEAM
                    </a>
                  </li>
                </ul>
              </div>

              {/* Business Section */}
              <div>
                <h3 className="text-blue-700 font-bold mb-4 uppercase">
                  Business
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <a href="#" className="text-gray-700 hover:text-blue-700">
                      PROFESSIONAL CONNECT
                    </a>
                  </li>

                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <a href="#" className="text-gray-700 hover:text-blue-700">
                      FOR TRAINERS
                    </a>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <a href="#" className="text-gray-700 hover:text-blue-700">
                      FOR HEALTHCARE PROFESSIONALS
                    </a>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <a href="#" className="text-gray-700 hover:text-blue-700">
                      FOR FAMILIES
                    </a>
                  </li>
                </ul>
              </div>

              {/* Company Section */}
              <div>
                <h3 className="text-blue-700 font-bold mb-4 uppercase">
                  Company
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <a href="#" className="text-gray-700 hover:text-blue-700">
                      ABOUT MYNETDIARY
                    </a>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <a href="#" className="text-gray-700 hover:text-blue-700">
                      IN THE NEWS
                    </a>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <a href="#" className="text-gray-700 hover:text-blue-700">
                      PRESS RELEASES
                    </a>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <a href="#" className="text-gray-700 hover:text-blue-700">
                      PRESS KIT
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Copyright and Links */}
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm border-t border-gray-200 pt-6">
            <p>Copyright © 2025 Calories Tracker Inc. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-blue-700">
                Contact Us
              </a>
              <span className="text-gray-300">|</span>
              <a href="#" className="hover:text-blue-700">
                FAQ
              </a>
              <span className="text-gray-300">|</span>
              <a href="#" className="hover:text-blue-700">
                Privacy
              </a>
              <span className="text-gray-300">|</span>
              <a href="#" className="hover:text-blue-700">
                Terms of Use
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
