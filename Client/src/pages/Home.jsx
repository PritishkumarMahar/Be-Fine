import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// import Footer from './Footer';

const Home = () => {
  return (
    <div>
      {/* Header with Logo and Navigation */}
      <header className="bg-green-600 py-2 shadow-md">
        <motion.div
          className="container mx-auto px-4 flex justify-between items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center">
            <div className="mr-2">
              <img src="/logo.png" alt="Logo" className="h-40" />
            </div>
            <h1 className="text-white text-3xl font-bold"> </h1>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/register">
              <motion.button
                className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-full transition"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                SIGN UP
              </motion.button>
            </Link>
            <Link to="/login">
              <motion.button
                className="border-2 border-white text-white font-bold py-2 px-6 rounded-full hover:bg-white hover:text-green-600 transition"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                SIGN IN
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </header>

      {/* Hero Section with App Screenshots */}
      <section className="bg-green-600 pt-12 pb-24 relative overflow-hidden ">
        <motion.div
          className="container mx-auto px-4 relative z-10 "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              className="text-white max-w-lg"
              initial={{ x: -50, y: 20, opacity: 0 }}
              animate={{ x: 0, y: -20, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-6xl font-bold mb-4">
                Be Healthy
                <br />
                for Life!
              </h2>
              <p className="text-2xl mb-8">
                Your weight loss, diet, and nutrition assistant.
              </p>

              <div className="text-xl">
                <p className="font-bold">
                Eating healthy improves your physical and mental well-being, giving you more energy and reducing the risk of diseases.{" "}
                  <span className="font-normal">
                    .
                  </span>
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex justify-center relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* Phone mockup */}
              <div className="relative z-20 -ml-5">
                <img
                  src="/iphonex@2x.png"
                  alt="iPhone App"
                  className="h-40 h-130"
                />
              </div>

              {/* Watch mockup */}
              <div className="relative z-20 transform -translate-x-2 translate-y-70">
                <img
                  src="/iwatch@2x.png"
                  alt="Apple Watch App"
                  className="w-60 h-auto"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Your Journey to a Healthier You
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <span className="text-green-600 text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Build Better Habits
              </h3>
              <p className="text-gray-600">
                Start small—drink more water, move more, sleep better. Be-Fine
                helps you build consistent habits that lead to long-term change.
              </p>
            </div>

            <div className="p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <span className="text-green-600 text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Stay Mindful
              </h3>
              <p className="text-gray-600">
                Tune into your body and mind. Track how you feel, not just what
                you eat. Wellness is more than numbers—it's about balance.
              </p>
            </div>

            <div className="p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <span className="text-green-600 text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Learn and Grow
              </h3>
              <p className="text-gray-600">
                Access daily tips, nutrition facts, and personalized insights.
                The more you know, the better choices you make.
              </p>
            </div>

            <div className="p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <span className="text-green-600 text-xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Live Your Best Life
              </h3>
              <p className="text-gray-600">
                Feel confident, energized, and in control. Be-Fine is your
                partner in creating a lifestyle that lasts—not a quick fix.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------ */}
      <section className="py-12 bg-white section-insights">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-semibold text-center mb-10">
            What it takes to succeed
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-4 rounded-lg text-center shadow">
              <img
                src="https://assets.mynetdiary.com/images/cover-insights-Illustration-1@2x.png"
                alt="Find your Diet"
                className="mx-auto mb-4 w-[371px]"
              />
              <h5 className="text-xl font-semibold mb-2">Find your Diet</h5>
              <p>
                Find a diet that fits your lifestyle: Calorie Counting,
                Low-Carb, Keto, Vegan, Vegetarian and more.
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg text-center shadow">
              <img
                src="https://assets.mynetdiary.com/images/cover-insights-Illustration-2@2x.png"
                alt="Set Your Targets"
                className="mx-auto mb-4 w-[418px]"
              />
              <h5 className="text-xl font-semibold mb-2">Set Your Targets</h5>
              <p>
                Choose your desired weekly weight loss rate, target date, and
                source of calories like fat, carbs, and proteins.
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg text-center shadow">
              <img
                src="https://assets.mynetdiary.com/images/cover-insights-Illustration-3@2x.png"
                alt="Log Your Meals & Exercise"
                className="mx-auto mb-4 w-[375px]"
              />
              <h5 className="text-xl font-semibold mb-2">
                Log Your Meals & Exercise
              </h5>
              <p>
                Use the App to track your food, physical activities, and
                nutrients. Use the barcode scanner. Log ahead of time for better
                planning and scheduling.
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg text-center shadow">
              <img
                src="https://assets.mynetdiary.com/images/cover-insights-Illustration-4@2x.png"
                alt="Reach Your Goals"
                className="mx-auto mb-4 w-[405px]"
              />
              <h5 className="text-xl font-semibold mb-2">Reach Your Goals</h5>
              <p>
                Monitor your daily progress, check your weight loss forecast,
                and receive ongoing advice and feedback. Learn more about
                nutrients in your diet and make better choices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Top Rated Calorie Counter App
          </h2>

          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md mb-8">
            <p className="text-gray-700 italic mb-4 text-lg">
              "This is my favorite food diary app. I used six of the "top" apps
              in this category for several days so that I could compare them and
              select what worked best for me. Calories Tracker was the winner.
              Intuitive, simple layout, decent database, appealing graphic
              design, and no ads."
            </p>
            <div className="flex justify-end">
              <a href="#" className="text-green-600 hover:underline">
                See More Testimonials
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Highlights */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="/cover1.jpg"
                alt="Premium Recipes"
                className="mx-auto mb-4 w-50 h-50 object-cover rounded-full"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Premium Recipes
              </h3>
              <p className="text-gray-600">
                Hundreds of easy recipes, with great variety, carefully crafted
                for great taste by a team of Registered Dietitians.
              </p>
            </div>

            <div className="text-center">
              <img
                src="/cover2.png"
                alt="Easy Tracking"
                className="mx-auto mb-4 w-50 h-50 object-cover rounded-full"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Easy Tracking
              </h3>
              <p className="text-gray-600">
                Massive food catalog, fastest barcode scanner, quickest food
                lookup making food tracking a breeze.
              </p>
            </div>

            <div className="text-center">
              <img
                src="/cover3.png"
                alt="Insights and Guidance"
                className="mx-auto mb-4 w-50 h-50 object-cover rounded-full"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Insights and Guidance
              </h3>
              <p className="text-gray-600">
                Encouraging and supportive feedback, guiding you to your goal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Start Your Free Food Diary Today
          </h2>
          <Link to="/register">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 px-8 rounded-full text-lg transition">
              SIGN UP
            </button>
          </Link>

          <div className="flex items-center justify-center mt-6">
            <div className="text-xl">
              <span className="font-bold">4.8</span>
              <span className="ml-2">• 184,041 Ratings </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-10 border-t border-gray-200">
        <div className="container mx-auto px-4">
          {/* Main footer content with logo and links */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-10">
            {/* Logo and App Store Links section */}
            <div className="mb-8 md:mb-0">
              <div className="mb-6">
                <img src="/logo.png" alt="Logo" className="h-35" />
                <h2 className="text-green-600 text-2xl font-bold"></h2>
              </div>

              <div className="flex items-center mb-4">
                <div className="flex">
                  <span className="text-yellow-400">★</span>
                  <span className="text-yellow-400">★</span>
                  <span className="text-yellow-400">★</span>
                  <span className="text-yellow-400">★</span>
                  <span className="text-yellow-400">★</span>
                </div>
                <span className="ml-2 text-gray-700">4.8 </span>
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

export default Home;
