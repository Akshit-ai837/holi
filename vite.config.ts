import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cloudflare } from "@cloudflare/vite-plugin";
import { mochaPlugins } from "@getmocha/vite-plugins";

// Only use the Cloudflare plugin when targeting Cloudflare Workers.
// Vercel deployments don’t need the worker bundle and it intercepts
// every request, causing NOT_FOUND responses for static assets.
const isCloudflare = process.env.CF_PUBLISH === "1" || process.env.TARGET === "cloudflare";

export default defineConfig({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins: [
    ...mochaPlugins(process.env as any),
    react(),
    ...(isCloudflare
      ? [
          cloudflare({
            auxiliaryWorkers: [],
          }),
        ]
      : []),
  ],
  server: {
    allowedHosts: true,
  },
  build: {
    chunkSizeWarningLimit: 5000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
