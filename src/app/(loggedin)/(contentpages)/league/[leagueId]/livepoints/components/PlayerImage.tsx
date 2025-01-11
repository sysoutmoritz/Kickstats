import Image from "next/image";
import { useState, useEffect } from "react";

export default function PlayerImage({ playerId }: { playerId: string }) {
  const [imageUrl, setImageUrl] = useState("");
  const playerImageUrl = `https://kickbase.b-cdn.net/pool/playersbig/${playerId}.png`;
  const fallbackImageUrl = "/nopicture.webp";

  useEffect(() => {
    const checkImage = async () => {
      try {
        const response = await fetch(playerImageUrl);
        if (response.ok) {
          setImageUrl(playerImageUrl); // If image exists, use it
        } else {
          setImageUrl(fallbackImageUrl); // Otherwise, use fallback image
        }
      } catch (error) {
        setImageUrl(fallbackImageUrl); // Set fallback image on error
      }
    };

    checkImage();
  }, [playerImageUrl]);

  return (
    <Image
      className={imageUrl == playerImageUrl ? "self-end" : "mx-3"}
      src={imageUrl}
      width={imageUrl == playerImageUrl ? 72 : 48}
      height={imageUrl == playerImageUrl ? 72 : 48}
      alt=""
    />
  );
}
