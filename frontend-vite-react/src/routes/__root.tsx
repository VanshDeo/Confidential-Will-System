import { createRootRoute, Outlet } from '@tanstack/react-router';
import * as pino from "pino";
import { ThemeProvider } from "@/components/theme-provider";
import { MainLayout } from "@/layouts/layout";


export const logger = pino.pino({
  level: "trace",
});

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <MainLayout>
        <Outlet />
      </MainLayout>
    </ThemeProvider>
  );
}
