"use client";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6">
      <motion.h1
        className="text-4xl font-bold text-blue-500 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        ZK-Powered DeFi Credit Score
      </motion.h1>

      <motion.section
        className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-semibold text-blue-400 mb-4">
          How It Works
        </h2>
        <ul className="space-y-4">
          {[
            "Connect Wallet - Authenticate using MetaMask.",
            "Upload Proof - Provide your ZK proof file.",
            "Verify & Update - Proof is checked and credit score is updated.",
            "View Score - See your updated credit score instantly.",
          ].map((step, index) => (
            <motion.li
              key={index}
              className="bg-gray-700 p-3 rounded-md"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.2 }}
            >
              {step}
            </motion.li>
          ))}
        </ul>
      </motion.section>

      <motion.a
        href="/upload"
        className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Get Started
      </motion.a>
    </div>
  );
}
