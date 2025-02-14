## **(Full Setup Guide)**

# **ZK-Powered DeFi Credit Score System**

_A decentralized, privacy-preserving credit scoring system using zk-SNARKs, Arbitrum, and zkVerify._

---

## **📂 Project Structure**

```
📂 ZK-Online-Hackathon
│── 📂 circuits       # zk-SNARK Circuits (Groth16)
│── 📂 backend        # Express.js API with zkVerify integration
│── 📂 frontend       # Next.js UI with Tailwind + Framer Motion
│── 📂 smart-contract # Solidity contract for on-chain credit score storage
└── README.md         # Setup & instructions
```

---

## **✅ Prerequisites**

Before starting, ensure you have:

- **Node.js** (v18+)
- **Yarn** or **npm**
- **Circom** (for compiling circuits)
- **SnarkJS** (for proof generation)
- **Hardhat** (for smart contract deployment)
- **Metamask** (for wallet connection)

---

## **🚀 Quick Setup**

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/TheCoderAdi/ZK-Online-Hackathon.git
cd ZK-Online-Hackathon
```

---

## **2️⃣ Generating Circuits (zk-SNARK Setup)**

_Navigate to the **circuits/** directory:_

```sh
cd circuits
```

### **🔹Commands for Circuit Generation**

```sh
# 1. Compile the circuit
circom credit_score.circom --r1cs --wasm --sym --c

# 2. Download or generate Powers of Tau file
snarkjs powersoftau new bn128 14 pot14_0000.ptau -v

# 3. Contribute to phase 1 of trusted setup
snarkjs powersoftau contribute pot14_0000.ptau pot14_0001.ptau --name="First contribution" -v

# 4. Prepare for phase 2 of trusted setup
snarkjs powersoftau prepare phase2 pot14_0001.ptau pot14_final.ptau -v

# 5. Generate proving and verification keys
snarkjs groth16 setup credit_score.r1cs pot14_final.ptau circuit_final.zkey

# 6. Contribute to the zkey (phase 2 of trusted setup)
snarkjs zkey contribute circuit_final.zkey circuit_final2.zkey --name="Second contribution" -v

# 7. Export verification key
snarkjs zkey export verificationkey circuit_final2.zkey verification_key.json

# 8. Generate proof (Example input)
snarkjs groth16 prove circuit_final2.zkey witness.wtns proof.json public.json

# 9. Verify proof
snarkjs groth16 verify verification_key.json public.json proof.json

# 10. Generate Solidity Verifier contract
snarkjs zkey export solidityverifier circuit_final2.zkey verifier.sol
```

---

## **3️⃣ Smart Contract Deployment (Hardhat)**

_Navigate to the **smart-contract/** directory:_

```sh
cd smart-contract
npm install
```

### **Compile & Deploy on Local Hardhat**

```sh
npx hardhat compile
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

_For Arbitrum Testnet (Sepolia), replace `localhost` with `arbitrumSepolia`._

---

## **4️⃣ Backend Setup (Express.js)**

_Navigate to the **backend/** directory:_

```sh
cd backend
npm install
```

### **Start Backend Server**

```sh
node index.js
```

_Backend runs on **http://localhost:5000**_

---

## **5️⃣ Frontend Setup (Next.js)**

_Navigate to the **frontend/** directory:_

```sh
cd frontend
npm install
```

### **Start Frontend**

```sh
npm run dev
```

_Frontend available at **http://localhost:3000**_

---

## **6️⃣ Running the Full Application**

1. **Start Hardhat local node**
   ```sh
   npx hardhat node
   ```
2. **Deploy smart contract**
   ```sh
   npx hardhat run scripts/deploy.js --network localhost
   ```
3. **Start backend API**
   ```sh
   cd backend && node index.js
   ```
4. **Start frontend UI**
   ```sh
   cd frontend && npm run dev
   ```

---

## **📌 Features**

- **🔒 Privacy-Preserving Credit Scoring** (zk-SNARKs)
- **⏳ Instant Proof Verification** (zkVerify)
- **💰 DeFi Credit System** with Secure On-Chain Storage
- **💡 Beautiful UI** (Tailwind CSS + Framer Motion)

---

### **🌐 Useful Links**

- **GitHub Repo:** [ZK-Online-Hackathon](https://github.com/TheCoderAdi/ZK-Online-Hackathon)
- **zkVerify Docs:** [zkVerify](https://docs.zkverify.io)
- **Arbitrum:** [Arbitrum Portal](https://portal.arbitrum.io/)
