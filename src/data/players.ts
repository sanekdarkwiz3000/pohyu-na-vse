export interface Player {
  id: number;
  nickname: string;
  role: string;
  rank: string;
  mmr?: string;
  status: "ACTIVE" | "LEGACY" | "LEGEND";
  dotabuff?: string;
  steam?: string;
  avatar?: string;
}

export const players: Player[] = [
  {
    id: 1,
    nickname: "sanekdarkwiz",
    role: "Carry • Position 5",
    rank: "Divine V",
    status: "ACTIVE",
    steam: "https://steamcommunity.com/id/execxxxxx/",
    dotabuff: "https://www.dotabuff.com/players/1241116790",
    avatar: "/players/rejector.webp",
  },
  {
    id: 2,
    nickname: "mindset",
    role: "Mid",
    rank: "Immortal",
    mmr: "6700 MMR",
    status: "ACTIVE",
    steam: "https://steamcommunity.com/profiles/76561199065697001",
    dotabuff: "https://www.dotabuff.com/players/1105431273",
    avatar: "/players/mindset.webp",
  },
  {
    id: 3,
    nickname: "everythingisd3ad",
    role: "Offlane",
    rank: "Divine V",
    status: "ACTIVE",
    steam: "https://steamcommunity.com/id/everything_is_dead",
    dotabuff: "https://www.dotabuff.com/players/297196275",
    avatar: "/players/everythingisd3ad.webp",
  },
  {
    id: 5,
    nickname: "coddexx",
    role: "Carry • Position 5",
    rank: "Immortal",
    mmr: "6000 MMR",
    status: "ACTIVE",
    steam: "https://steamcommunity.com/profiles/76561199663004874",
    dotabuff: "https://www.dotabuff.com/players/1702739146",
    avatar: "/players/coddexx.webp",
  },
  {
    id: 8,
    nickname: "диман",
    role: "Mid • Position 4",
    rank: "Immortal",
    mmr: "6500 MMR",
    status: "ACTIVE",
    steam: "https://steamcommunity.com/profiles/76561199178845320/",
    dotabuff: "https://www.dotabuff.com/players/1218579592",
    avatar: "/players/diman.webp",
  },
  {
    id: 4,
    nickname: "Delluxe",
    role: "Offlane",
    rank: "Immortal",
    mmr: "6000 MMR",
    status: "LEGACY",
    steam: "https://steamcommunity.com/profiles/76561198083745025",
    dotabuff: "https://www.dotabuff.com/players/123479297",
    avatar: "/players/delluxe.webp",
  },
  {
    id: 6,
    nickname: "GOLD COBRA",
    role: "Legend",
    rank: "",
    status: "LEGEND",
    avatar: "/players/goldcobra.webp",
  },
  {
    id: 7,
    nickname: "jackson_18",
    role: "Legendary Coach • Работает из тени",
    rank: "",
    status: "LEGEND",
    avatar: "/players/jackson.webp",
  },
  {
    id: 11,
    nickname: "VladosМикрочел",
    role: "Legend",
    rank: "Herald III",
    status: "LEGEND",
    avatar: "/players/vlados.webp",
  },
];