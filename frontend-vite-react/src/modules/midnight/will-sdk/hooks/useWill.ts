
import { useContext } from 'react';
import { BrowserWillContext, BrowserWillContextType } from '../contexts/BrowserWillProvider';

export const useWill = (): BrowserWillContextType => {
  const context = useContext(BrowserWillContext);
  if (!context) {
    throw new Error('useWill must be used within a BrowserWillProvider');
  }
  return context;
};
