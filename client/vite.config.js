import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@assets": path.resolve(__dirname, "./src/assets"),
			"@hooks": path.resolve(__dirname, "./src/hooks"),
			"@pages": path.resolve(__dirname, "./src/pages"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@helpers": path.resolve(__dirname, "./src/helpers"),
			"@lib": path.resolve(__dirname, "./src/lib"),
			"@context": path.resolve(__dirname, "./src/context"),
			"@routes": path.resolve(__dirname, "./src/routes"),
		},
	},
	plugins: [react()],
	server: {
		port: 3000,
	},
});
