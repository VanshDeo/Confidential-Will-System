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

function App() {
  return (
    <BrowserWillProvider>
      <RouterProvider router={router} />
    </BrowserWillProvider>
  );
}

export default App;
