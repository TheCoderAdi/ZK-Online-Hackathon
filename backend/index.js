import express from "express";
import cors from "cors";
import { groth16 } from "snarkjs";
import fs from "fs";
import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI = JSON.parse(fs.readFileSync("./CreditScore.json")).abi;
const creditScoreContract = new ethers.Contract(
  contractAddress,
  contractABI,
  wallet
);

app.post("/verify-proof", async (req, res) => {
  try {
    const { proof, publicSignals, userAddress } = req.body;
    if (!userAddress) {
      return res.status(400).json({ error: "Wallet not connected" });
    }

    if (!publicSignals || !Array.isArray(publicSignals)) {
      return res.status(400).json({ error: "Invalid publicSignals format" });
    }
    const vKey = JSON.parse(fs.readFileSync("./verification_key.json"));
    const isValid = await groth16.verify(vKey, publicSignals, proof);

    if (isValid) {
      const creditScore = publicSignals[0];

      const tx = await creditScoreContract.updateCreditScore(
        userAddress,
        creditScore
      );
      await tx.wait();

      res.json({ valid: true, creditScore });
    } else {
      res.json({ valid: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Verification failed" });
  }
});

app.get("/credit-score/:userAddress", async (req, res) => {
  try {
    const { userAddress } = req.params;
    const score = await creditScoreContract.getCreditScore(userAddress);
    res.json({ creditScore: score.toString() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch credit score" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
