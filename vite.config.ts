import path from "node:path";

import react from "@vitejs/plugin-react";
import unocss from "unocss/vite";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: [
            { find: "~", replacement: path.resolve(__dirname, "src") },
        ],
    },
    plugins: [
        react(),
        unocss(),
    ],
});
