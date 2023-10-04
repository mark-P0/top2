import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // Needed for a mock environment
    globals: true,
    setupFiles: "./tests/setup.js", // Cleanup after every test
  },
});
