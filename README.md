# 🛡️ MoveDID AI Guardian

## 🌐 Overview

MoveDID AI Guardian is a groundbreaking decentralized identity protection system built on the Movement Network, leveraging advanced AI technologies to provide comprehensive security monitoring and threat detection for blockchain identities.

### 🏆 Movement mAInia Hackathon Project
- **Track:** Social Intelligence & Smart Contract Security
- **Bounty Categories:** Fleek AI Agent, MoveDID Integration

## 🚀 Project Vision

In the rapidly evolving web3 landscape, identity security has become paramount. MoveDID AI Guardian addresses this critical need by offering:
- Intelligent threat detection
- Proactive security monitoring
- Decentralized identity protection

## ✨ Key Features

### 1. AI-Powered Identity Security
- Real-time threat monitoring
- Machine learning-based risk assessment
- Decentralized identity management using MoveDID

### 2. Intelligent Security Automation
- Suspicious transaction pattern detection
- Unauthorized access prevention
- Customizable security rules

### 3. Privacy-Preserving Mechanisms
- Granular access controls
- Move language's strong ownership model
- Transparent yet secure identity protection

## 🛠️ Technical Architecture

### Core Technologies
- **Blockchain:** Movement Network (Porto Testnet)
- **Smart Contract Language:** Move
- **AI Framework:** Fleek's Eliza Framework
- **Frontend:** React with Wallet Adapter

### System Components
1. **Identity Verification Module**
2. **AI Security Analysis Engine**
3. **Threat Detection Neural Network**
4. **Decentralized Alert System**

## 📋 Prerequisites

### Development Environment
- Movement CLI (version ≤ 3.5.0)
- Node.js (v18+)
- Rust (for Move development)
- Docker
- Web3 Wallet (Petra recommended)

### Required Tools
- Movement Network SDK
- Aptos TypeScript SDK
- Fleek AI Agent Framework

## 🔧 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/movedid-ai-guardian.git
cd movedid-ai-guardian
```

### 2. Setup Development Environment
```bash
# Install dependencies
npm install

# Setup Movement CLI
cargo install --git https://github.com/movementlabsxyz/aptos-core movement

# Configure Movement Network
movement init --network testnet
```

### 3. Configure Environment Variables
Create a `.env` file in the project root:
```
MOVEMENT_NETWORK_ENDPOINT=https://aptos.testnet.porto.movementlabs.xyz/v1
FAUCET_ENDPOINT=https://fund.testnet.porto.movementlabs.xyz/
AI_MODEL_API_KEY=your_api_key
```

## 🧪 Local Development

### Compile Move Contracts
```bash
movement move compile
```

### Run Tests
```bash
movement move test
```

### Start Development Server
```bash
npm run dev
```

## 🚢 Deployment

### Testnet Deployment
```bash
movement move publish --network testnet
```

### Fleek AI Agent Deployment
```bash
fleek ai deploy --framework eliza
```

## 📂 Project Structure
```
movedid-ai-guardian/
│
├── move-contracts/           # Move smart contracts
│   ├── sources/
│   └── Move.toml
│
├── src/                      # Frontend & AI components
│   ├── components/
│   ├── hooks/
│   ├── ai-models/
│   └── utils/
│
├── tests/                    # Unit and integration tests
│   ├── move-tests/
│   └── ai-model-tests/
│
├── scripts/                  # Deployment and utility scripts
│
├── docs/                     # Project documentation
│
├── .env                      # Environment configuration
├── package.json
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.

## 🏅 Hackathon Information
- **Event:** Movement mAInia
- **Track:** Social Intelligence & Smart Contract Security
- **Submission Period:** January 21st - February 16th, 2025

## 📞 Contact & Support
- Telegram: @lesnacrex  
- Email: philosophyfactss@gmail.com

---

**Disclaimer:** This project is submitted for the Movement mAInia Hackathon and is a work in progress.
