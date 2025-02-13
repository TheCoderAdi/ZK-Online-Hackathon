"use client";
import { useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function UploadPage() {
  const [proofFile, setProofFile] = useState(null);
  const [account, setAccount] = useState(null);
  const [publicSignals, setPublicSignals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [jsonPreview, setJsonPreview] = useState(null);
  const router = useRouter();

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask not detected");
      return;
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    setAccount(address);
    await loadPublicSignals();
  };

  const handleFileChange = async (event) => {
    if (event.target.files?.length) {
      const file = event.target.files[0];
      setProofFile(file);
      const text = await file.text();
      setJsonPreview(JSON.parse(text));
    }
  };

  const loadPublicSignals = async () => {
    const response = await fetch("/public.json");
    setPublicSignals(await response.json());
  };

  const handleSubmit = async () => {
    if (!account) {
      alert("Please connect your wallet first!");
      return;
    }
    if (!proofFile) {
      alert("Please upload a proof.json file");
      return;
    }

    await loadPublicSignals();
    const proofText = await proofFile.text();

    if (publicSignals.length === 0) {
      alert("Public signals not loaded");
      return;
    }

    setLoading(true);
    const response = await axios.post("http://localhost:5000/verify-proof", {
      proof: JSON.parse(proofText),
      userAddress: account,
      publicSignals,
    });

    if (response.data.valid) {
      router.push(`/result?score=${response.data.creditScore}`);
    } else {
      alert("Verification Failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6">
      <motion.h2
        className="text-3xl font-bold text-blue-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Upload Your Proof
      </motion.h2>

      <motion.button
        className="mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white text-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={connectWallet}
      >
        {account ? `Connected: ${account.slice(0, 10)}...` : "Connect Wallet"}
      </motion.button>

      <input
        type="file"
        accept=".json"
        className="mt-4 text-white"
        onChange={handleFileChange}
      />

      {jsonPreview && (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg max-w-[100%] text-left overflow-auto max-h-72">
          <pre className="text-green-400 text-sm">
            {JSON.stringify(jsonPreview, null, 2)}
          </pre>
        </div>
      )}

      <motion.button
        className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSubmit}
      >
        {loading ? "Verifying..." : "Verify Proof"}
      </motion.button>
    </div>
  );
}
