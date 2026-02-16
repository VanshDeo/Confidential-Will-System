export interface Deployment {
  contractAddress: string;
  network: string;
  deployedAt: string;
}

// We can load this dynamically if we copy deployment.json to public/
// For now, let's hardcode the one we just deployed or implementing a fetch
export const currentDeployment: Deployment = {
  contractAddress: '947c7e89e70eb40b42fe312d6a877d5537d7c9bf087364304d6d564e3ea6f6b4', // Updated from deployment.json
  network: 'undeployed',
  deployedAt: '2026-02-16T13:19:00.000Z'
};

export const CONTRACT_ADDRESS = currentDeployment.contractAddress;
