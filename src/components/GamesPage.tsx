import * as React from "react";
import { Header } from "./Header";
import { PageWrapper } from "./PageWrapper";

interface GamesPageProps {
  games: {
    name: string;
    platform: string;
    rating: number;
    added?: Date | null;
  }[];
}

export const GamesPage = ({ games }: GamesPageProps) => {
  const sortedGames = [...games].sort((g1, g2) => {
    return g2.rating - g1.rating;
  });
  return (
    <PageWrapper>
      <Header />
      <p>
        All of the games I've ever (thoroughly) played in order from 1-
        {games.length}
      </p>
      <ol className="gamesList">
        {sortedGames.map((game, i) => {
          return (
            <li>
              <GamesListItem {...game} num={i + 1} />
            </li>
          );
        })}
      </ol>
    </PageWrapper>
  );
};

const PlatformImageMap = {
  n64: "n64.png",
  pc: "pc.png",
  switch: "switch.png",
  "xbox 360": "xbox360.png",
  gb: "gameboy.png",
  wii: "wii.png",
  gamecube: "gamecube.png",
  gba: "gba.png",
  ds: "ds.png",
  nes: "nes.png",
  flash: "flash.png",
  famicom: "famicom.png",
};

interface GamesListItemProps {
  name: string;
  platform: string;
  num: number;
  added?: Date | null;
}
const GamesListItem = ({ name, platform, num, added }: GamesListItemProps) => {
  const img = PlatformImageMap[platform.toLowerCase()];
  return (
    <div className="gamesListItem">
      <span className="gamesListItemPosition">{num}</span>
      {img && <img src={`public/${img}`} />}
      <div>
        <div className="gamesListItemName">{name}</div>
        {added && (
          <div className="gamesListItemDetails">
            Added{" "}
            {added.toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        )}
      </div>
    </div>
  );
};
