import { createRootRoute, Outlet } from '@tanstack/react-router';
import * as pino from "pino";
import { ThemeProvider } from "@/components/theme-provider";
import { MainLayout } from "@/layouts/layout";
import { BrowserWillProvider } from "@/modules/midnight/will-sdk/contexts/BrowserWillProvider";

export const logger = pino.pino({
  level: "trace",
});

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserWillProvider>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </BrowserWillProvider>
    </ThemeProvider>
  );
}
