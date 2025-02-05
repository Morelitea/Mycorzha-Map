import React, { useState } from "react";
import classNames from "classnames";
import { TCreature } from "../types/Creatures";
import styles from "./Creature.module.scss";

interface ICreatureProps {
  creature: TCreature;
}
export const Creature: React.FC<ICreatureProps> = ({ creature }) => {
  const [showMore, setShowMore] = useState<boolean>(false);

  const { id, name, image, quote, bio } = creature;
  const imagePath = `/images/creatures/${image}`;
  return (
    <div
      id={id}
      className={classNames(styles.creature, showMore && styles.showMore)}
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
        <div>
          <div>
            <h4>Bio:</h4>
            <p>{bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creature;
