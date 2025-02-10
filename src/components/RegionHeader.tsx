import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Map } from "@mui/icons-material";
import Button from "@mui/material/Button";
import styles from "./RegionHeader.module.scss";
import defaultBanner from "../assets/banners/banner.png";
// import backArrow from "../assets/back.png";

interface RegionHeaderProps {
  regionName: string;
  regionId: string;
  bannerImage: string;
}

const RegionHeader: React.FC<RegionHeaderProps> = ({
  regionName,
  regionId,
  bannerImage,
}) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true); // If there's an error, use the default banner
  };

  const imageSrc = imageError ? defaultBanner : bannerImage;

  return (
    <div className={styles.headerContainer} id={regionId}>
      <img
        src={imageSrc}
        alt={regionName}
        onError={handleImageError}
        className={styles.bannerImage}
      />

      {/* Back button */}
      <Button
        component={Link}
        to="/"
        startIcon={<Map />}
        className={styles.backButton}
        variant="contained"
      >
        Back to Map
      </Button>

      <div className={styles.regionTitle}>
        <h1>{regionName}</h1>
      </div>
    </div>
  );
};

export default RegionHeader;
