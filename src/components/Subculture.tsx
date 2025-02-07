import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { Subsection } from "../types/Regions";
import styles from "./Subculture.module.scss";
import handleScrollClick from "../utils/handleScrollClick";

interface ISubcultureProps {
  subsection: Subsection;
}

export const Subculture: React.FC<ISubcultureProps> = ({ subsection }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true); // If there's an error, use the default banner
  };

  const { name, id, image, content, link } = subsection;
  const imageSrc = imageError
    ? "/images/regions/map.png"
    : `/images/regions/${image}`;

  return (
    <div
      // elevation={1}
      key={id}
      id={id}
      className={styles.subculture}
    >
      {link ? (
        <Link to={link} onClick={handleScrollClick}>
          <img
            src={imageSrc}
            alt={name}
            className={styles.subcultureImage}
            onError={handleImageError}
          />
          <h3>{name}</h3>
        </Link>
      ) : (
        <div>
          <img
            src={imageSrc}
            alt={name}
            className={styles.subcultureImage}
            onError={handleImageError}
          />
          <h3>{name}</h3>
        </div>
      )}
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default Subculture;
