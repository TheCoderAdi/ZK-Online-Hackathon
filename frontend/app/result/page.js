"use client";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const score = searchParams.get("score");

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <motion.h1
        className="text-4xl font-bold text-blue-400"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        Your Credit Score
      </motion.h1>

      <motion.p
        className="text-6xl font-bold text-green-400 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {score ?? "Not Available"}
      </motion.p>

      <motion.a
        href="/"
        className="mt-6 px-6 py-3 bg-blue-600 rounded-lg text-white"
      >
        Go Home
      </motion.a>
    </div>
  );
}
