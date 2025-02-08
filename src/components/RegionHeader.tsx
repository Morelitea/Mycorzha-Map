import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
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
  const navigate = useNavigate();

  const handleImageError = () => {
    setImageError(true); // If there's an error, use the default banner
  };

  const imageSrc = imageError ? defaultBanner : bannerImage;

  const handleBackClick = () => {
    if (window.history?.length && window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/", { replace: true });
    }
  };

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
        onClick={handleBackClick}
        startIcon={<ArrowBack />}
        className={styles.backButton}
        variant="contained"
      >
        Back
      </Button>

      <div className={styles.regionTitle}>
        <h1>{regionName}</h1>
      </div>
    </div>
  );
};

export default RegionHeader;
