import React, { useState } from "react";
import classNames from "classnames";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TCreature } from "../types/Creatures";
import styles from "./Creature.module.scss";

interface ICreatureProps {
  creature: TCreature;
}
export const Creature: React.FC<ICreatureProps> = ({ creature }) => {
  const [showMore, setShowMore] = useState<boolean>(false);

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
  const imagePath = `/images/creatures/${image}`;
  const spotifyPath = `/images/spotify/${spotifyPlaylist}`;

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
        <img src={imagePath} alt={name} className={styles.creatureImage} />
        {showMore ? <p>Tap to hide info.</p> : <p>Tap to show more info.</p>}
      </div>
      <div
        className={classNames(
          styles.creatureDetails,
          showMore && styles.showMore
        )}
      >
        <blockquote>&ldquo;{quote}&rdquo;</blockquote>

        <h4>Bio:</h4>
        <p>{bio}</p>

        {emotionalTies.length && (
          <>
            <h4>Emotional Ties:</h4>
            <ul className={styles.emotionalTies}>
              {emotionalTies.map((et) => (
                <li>
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
                {spotifyPlaylist && (
                  <TableCell>
                    <strong>Spotify Playlist</strong>
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{biggestFear}</TableCell>
                <TableCell>{favoriteStory}</TableCell>
                {spotifyPlaylist && (
                  <TableCell>
                    <img
                      src={spotifyPath}
                      alt={`${id} spotify playlist code`}
                      className={styles.spotifyCode}
                    />
                  </TableCell>
                )}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Paper>
  );
};

export default Creature;
