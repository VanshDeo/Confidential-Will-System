
import { useContext } from 'react';
import { BrowserWillContext, BrowserWillContextType } from '../contexts/BrowserWillProvider';
import { DemoWillContext, DemoWillContextType } from '../contexts/DemoWillProvider';

export const useWill = (): BrowserWillContextType => {
  // Try the real context first, then fall back to the demo context
  const real = useContext(BrowserWillContext);
  const demo = useContext(DemoWillContext);
  const context = real ?? demo;
  if (!context) {
    throw new Error('useWill must be used within a BrowserWillProvider or DemoWillProvider');
  }
  return context;
};

/** Returns demo beneficiaries if running in demo mode, empty array otherwise */
export const useDemoBeneficiaries = () => {
  const demo = useContext(DemoWillContext);
  return demo?.demoBeneficiaries ?? [];
};

/** Returns true if running in demo mode */
export const useIsDemo = () => {
  const demo = useContext(DemoWillContext);
  return demo !== undefined;
};
