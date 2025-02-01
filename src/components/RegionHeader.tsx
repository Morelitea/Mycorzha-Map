import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./RegionHeader.module.scss";
import defaultBanner from "../assets/banners/banner.png";
import backArrow from "../assets/back.png";

interface RegionHeaderProps {
  regionName: string;
  bannerImage: string;
}

const RegionHeader: React.FC<RegionHeaderProps> = ({
  regionName,
  bannerImage,
}) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true); // If there's an error, use the default banner
  };

  const imageSrc = imageError ? defaultBanner : bannerImage;

  return (
    <div className={styles.headerContainer}>
      <img
        src={imageSrc}
        alt={regionName}
        onError={handleImageError}
        className={styles.bannerImage}
      />

      {/* Back button */}
      <Link to="/" className={styles.backButton}>
        <img src={backArrow} alt="Back" />
      </Link>

      <div className={styles.regionTitle}>
        <h1>{regionName}</h1>
      </div>
    </div>
  );
};

export default RegionHeader;
