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
                        // Group drawing libraries
                        if (id.includes("tldraw")) {
                            return "tldraw"
                        }
                        // Group editor libraries (Codemirror)
                        if (id.includes("codemirror") || id.includes("@uiw")) {
                            return "editor"
                        }
                        // Group everything else into a single 'vendor' chunk
                        // This prevents having hundreds of tiny JS files
                        return "vendor"
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
    },
})