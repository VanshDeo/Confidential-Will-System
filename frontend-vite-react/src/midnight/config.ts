export interface Deployment {
  contractAddress: string;
  network: string;
  deployedAt: string;
}

// We can load this dynamically if we copy deployment.json to public/
// For now, let's hardcode the one we just deployed or implementing a fetch
export const currentDeployment: Deployment = {
  contractAddress: '2a7275cd74ca516b6227011b0907b77677c31351d102ee62ace4383ab1a60365', // Updated from deployment.json
  network: 'undeployed',
  deployedAt: '2026-02-15T12:41:30.854Z'
};

export const CONTRACT_ADDRESS = currentDeployment.contractAddress;
