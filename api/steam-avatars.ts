import type { IncomingMessage, ServerResponse } from "node:http";
import { players } from "../src/data/players.ts";

const steamOrigin = "https://steamcommunity.com";
const steamAvatarUrl = /^https:\/\/(?:avatars(?:\.(?:akamai|fastly|cloudflare))?\.steamstatic\.com|steamcdn-a\.akamaihd\.net)\//i;

async function getSteamAvatar(profile: string): Promise<string | undefined> {
  try {
    const url = new URL(profile);
    if (url.origin !== steamOrigin || !/^\/(?:id\/[\w-]+|profiles\/\d{17})\/?$/.test(url.pathname)) return;
    url.pathname = url.pathname.replace(/\/?$/, "/");
    url.search = "?xml=1";
    url.hash = "";

    const response = await fetch(url, { redirect: "error", signal: AbortSignal.timeout(3500) });
    if (!response.ok) return;

    const xml = await response.text();
    const avatar = xml.match(/<avatarFull>\s*(?:<!\[CDATA\[\s*)?([^\s<>\]]+)\s*(?:\]\]>\s*)?<\/avatarFull>/)?.[1];
    if (avatar && steamAvatarUrl.test(avatar)) return avatar;
  } catch {
    // A missing profile or unavailable Steam response falls back to the local portrait.
  }
}

export default async function steamAvatars(req: IncomingMessage, res: ServerResponse) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  if (req.method !== "GET") {
    res.statusCode = 405;
    res.setHeader("Allow", "GET");
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  const entries = await Promise.all(players.flatMap(({ id, steam }) => (
    steam ? [getSteamAvatar(steam).then((avatar) => [id, avatar] as const)] : []
  )));
  const avatars = Object.fromEntries(entries.filter(([, avatar]) => avatar !== undefined));
  res.setHeader("Cache-Control", Object.keys(avatars).length
    ? "public, max-age=60, s-maxage=900, stale-while-revalidate=300"
    : "public, max-age=30, s-maxage=60");
  res.end(JSON.stringify(avatars));
}
