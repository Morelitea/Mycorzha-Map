import React, { useEffect, useState } from "react";
import classNames from "classnames";
import ReactMarkdown from "react-markdown";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { convertFileSrc } from "@tauri-apps/api/core";
import { appDataDir, join } from "@tauri-apps/api/path";
import { TCreature } from "../types/Creatures";
import styles from "./Creature.module.scss";

interface ICreatureProps {
  creature: TCreature;
}
export const Creature: React.FC<ICreatureProps> = ({ creature }) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string>(
    `/images/creatures/${creature.image}`
  );
  const [spotifySrc, setSpotifySrc] = useState<string | null>(
    creature.spotifyPlaylist
      ? `/images/spotify/${creature.spotifyPlaylist}`
      : null
  );

  const {
    id,
    name,
    image,
    quote,
    bio,
    emotionalTies,
    pronouns,
    size,
    comfortSnack,
    biggestFear,
    favoriteStory,
    spotifyPlaylist,
  } = creature;
  useEffect(() => {
    const isTauri =
      typeof window !== "undefined" && Boolean((window as any).__TAURI__);

    if (!isTauri) {
      setImageSrc(`/images/creatures/${image}`);
      setSpotifySrc(
        spotifyPlaylist ? `/images/spotify/${spotifyPlaylist}` : null
      );
      return;
    }

    let isMounted = true;

    const resolveAssets = async () => {
      try {
        const baseDir = await appDataDir();
        const creaturePath = await join(baseDir, "images", "creatures", image);
        const resolvedCreature = convertFileSrc(creaturePath);

        const resolvedSpotify = spotifyPlaylist
          ? convertFileSrc(
              await join(baseDir, "images", "spotify", spotifyPlaylist)
            )
          : null;

        if (isMounted) {
          setImageSrc(resolvedCreature);
          setSpotifySrc(resolvedSpotify);
        }
      } catch (err) {
        console.error("Failed to resolve local asset path:", err);
        if (isMounted) {
          setImageSrc(`/images/creatures/${image}`);
          setSpotifySrc(
            spotifyPlaylist ? `/images/spotify/${spotifyPlaylist}` : null
          );
        }
      }
    };

    resolveAssets();

    return () => {
      isMounted = false;
    };
  }, [image, spotifyPlaylist]);

  return (
    <Paper
      id={id}
      className={classNames(styles.creature, showMore && styles.showMore)}
      elevation={showMore ? 6 : 3}
    >
      <div
        className={styles.creatureMain}
        onClick={() => setShowMore(!showMore)}
      >
        <h3 className={styles.creatureName}>{name}</h3>
        <img src={imageSrc} alt={name} className={styles.creatureImage} />
        {showMore ? (
          <span>Tap to hide info.</span>
        ) : (
          <span>Tap to show more info.</span>
        )}
      </div>
      <div
        className={classNames(
          styles.creatureDetails,
          showMore && styles.showMore
        )}
      >
        <blockquote>&ldquo;{quote}&rdquo;</blockquote>

        <h4>Bio:</h4>
        <ReactMarkdown>{bio}</ReactMarkdown>

        {emotionalTies.length && (
          <>
            <h4>Emotional Ties:</h4>
            <ul className={styles.emotionalTies}>
              {emotionalTies.map((et) => (
                <li key={et.name}>
                  <strong>{et.name}:</strong> {et.relationship}
                </li>
              ))}
            </ul>
          </>
        )}

        <TableContainer component={Paper}>
          <Table sx={{ marginBottom: "20px" }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Pronouns</strong>
                </TableCell>
                <TableCell>
                  <strong>Size</strong>
                </TableCell>
                <TableCell>
                  <strong>Comfort Snack</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{pronouns}</TableCell>
                <TableCell>{size}</TableCell>
                <TableCell>{comfortSnack}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Biggest Fear</strong>
                </TableCell>
                <TableCell>
                  <strong>Favorite Story</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{biggestFear}</TableCell>
                <TableCell>{favoriteStory}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {spotifyPlaylist && spotifySrc && (
          <>
            <h4>Spotify Playlist</h4>
            <img
              src={spotifySrc}
              alt={`${id} spotify playlist code`}
              className={styles.spotifyCode}
            />
          </>
        )}
      </div>
    </Paper>
  );
};

export default Creature;
