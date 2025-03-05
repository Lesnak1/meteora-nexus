// scripts/deploy.ts
import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk'
import { readFileSync } from 'fs'
import path from 'path'

async function deployContracts() {
  const config = new AptosConfig({ 
    network: Network.CUSTOM, 
    fullnode: process.env.MOVEMENT_NETWORK_ENDPOINT 
  })
  const aptos = new Aptos(config)

  const contractPath = path.resolve(__dirname, '../move-contracts/sources')
  const contractFiles = ['identity_guardian.move', 'ai_security_module.move']

  for (const file of contractFiles) {
    const moduleSource = readFileSync(
      path.join(contractPath, file), 
      'utf-8'
    )

    try {
      const transaction = await aptos.transaction.build.simple({
        sender: process.env.DEPLOYER_ADDRESS,
        data: {
          function: '0x1::code::publish_package_txn',
          functionArguments: [moduleSource]
        }
      })

      console.log(`Deploying ${file}...`)
      const result = await aptos.transaction.submit.simple({ transaction })
      console.log(`Deployment successful: ${result.hash}`)
    } catch (error) {
      console.error(`Deployment failed for ${file}:`, error)
    }
  }
}

deployContracts()

// scripts/ai-model-train.ts
import { FleekAI } from '@fleek-platform/ai-sdk'

async function trainAIModel() {
  const fleekAI = new FleekAI(process.env.FLEEK_API_KEY)

  const trainingData = await loadTrainingData()
  
  const model = await fleekAI.trainModel({
    type: 'risk-detection',
    data: trainingData,
    hyperparameters: {
      learningRate: 0.01,
      epochs: 50
    }
  })

  console.log('AI Model Training Complete')
  return model
}

async function loadTrainingData() {
  // Placeholder for actual training data loading
  return [
    { input: 'suspicious_transaction', label: 'high_risk' },
    { input: 'normal_transaction', label: 'low_risk' }
  ]
}

trainAIModel()
