import { defineConfig, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import steamAvatars from "./api/steam-avatars.ts";

function addSteamAvatarsRoute({ middlewares }: Pick<ViteDevServer, "middlewares">) {
  middlewares.use("/api/steam-avatars", (req, res, next) => {
    void steamAvatars(req, res).catch(next);
  });
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "steam-avatars",
      configureServer: addSteamAvatarsRoute,
      configurePreviewServer: addSteamAvatarsRoute,
    },
  ],
});
