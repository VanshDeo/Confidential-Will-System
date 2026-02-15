import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

import { BrowserWillProvider } from "@/modules/midnight/will-sdk/contexts/BrowserWillProvider";
import { DemoWillProvider } from "@/modules/midnight/will-sdk/contexts/DemoWillProvider";

// Force demo mode to be active for testing
const isDemoMode = true;
// const isDemoMode = import.meta.env.VITE_DEMO_MODE === "true";

console.log('App Mode:', isDemoMode ? 'DEMO' : 'REAL');

function App() {
  const Provider = isDemoMode ? DemoWillProvider : BrowserWillProvider;

  return (
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
