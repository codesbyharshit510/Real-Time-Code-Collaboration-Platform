import react from "@vitejs/plugin-react"
import { fileURLToPath, URL } from "url"
import { defineConfig } from "vite"

export default defineConfig({
    plugins: [react()],
    base: "/", // Keep this!
    build: {
        chunkSizeWarningLimit: 1600,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes("node_modules")) {
                        return id
                            .toString()
                            .split("node_modules/")[1]
                            .split("/")[0]
                            .toString()
                    }
                },
            },
        },
    },
    resolve: {
        alias: [
            {
                find: "@",
                replacement: fileURLToPath(new URL("./src", import.meta.url)),
            },
        ],
    },
    server: {
        open: true,
        port: 5173,
    }
})