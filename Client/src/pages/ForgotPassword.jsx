import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );
      setMessage(response.data.message);
      setEmailSent(true);
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message ||
          "Failed to send reset email. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-green-500 flex flex-col">
      {/* Header */}
      <motion.header
        className="bg-green-600 py-4 shadow-md"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
          >
            <img src="/logo.png" alt="Logo" className="h-30" />
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-md w-full bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-white border-opacity-30"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
        >
          {/* Decorative Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-500 py-5 px-6">
            <motion.h2
              className="text-2xl font-bold text-white text-center"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Reset Your Password
            </motion.h2>
          </div>

          {/* Form Container */}
          <motion.div
            className="p-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {message && (
              <motion.div
                className={`mb-6 p-3 rounded-lg text-center border ${
                  emailSent
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-red-50 text-red-700 border-red-200"
                }`}
                variants={itemVariants}
              >
                {message}
              </motion.div>
            )}

            {!emailSent ? (
              <>
                <motion.p
                  className="text-gray-600 mb-6 text-center"
                  variants={itemVariants}
                >
                  Enter your email address and we'll send you a secure link to
                  reset your password.
                </motion.p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      required
                      placeholder="your@email.com"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full flex justify-center items-center py-3 px-4 rounded-lg shadow-sm text-lg font-medium text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 ${
                        isLoading ? "opacity-80 cursor-not-allowed" : ""
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending Reset Link...
                        </>
                      ) : (
                        "Send Reset Link"
                      )}
                    </button>
                  </motion.div>
                </form>
              </>
            ) : (
              <motion.div
                className="text-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  className="mx-auto h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-4"
                  variants={itemVariants}
                >
                  <svg
                    className="h-10 w-10 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </motion.div>
                <motion.h3
                  className="mt-2 text-lg font-medium text-gray-900"
                  variants={itemVariants}
                >
                  Check Your Inbox!
                </motion.h3>
                <motion.p
                  className="mt-2 text-sm text-gray-500"
                  variants={itemVariants}
                >
                  We've sent a password reset link to your email address.
                </motion.p>
                <motion.div className="mt-6" variants={itemVariants}>
                  <button
                    onClick={() => {
                      setEmailSent(false);
                      setEmail("");
                    }}
                    className="text-sm font-medium text-green-600 hover:text-green-500 transition-colors duration-200"
                  >
                    Didn't receive it? Resend email
                  </button>
                </motion.div>
              </motion.div>
            )}

            <motion.div className="mt-6 text-center" variants={itemVariants}>
              <Link
                to="/login"
                className="text-sm font-medium text-green-600 hover:text-green-500 transition-colors duration-200"
              >
                ← Back to Sign In
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer
        className="bg-green-600 py-4 text-white text-center text-sm relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        © {new Date().getFullYear()} Be~Fine. All rights reserved.
      </motion.footer>
    </div>
  );
};

export default ForgotPassword;
