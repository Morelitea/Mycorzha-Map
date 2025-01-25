import React from "react";
import { useParams, Link } from "react-router-dom";
import { regionDefinitions } from "../types/RegionMapping";
import { Region } from "../types/RegionMapping";

const RegionPage: React.FC = () => {
  const { regionId } = useParams<{ regionId: string }>();

  // Find the region using the `regionId` from the URL
  const region = regionDefinitions.find(
    (definition) => definition.region.route === `/${regionId}`
  )?.region;

  // If no region is found, display an error message
  if (!region) {
    return (
      <div>
        <h1>Region Not Found</h1>
        <p>The region you are looking for does not exist or is unavailable.</p>
        <Link to="/">Go back to the map</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{region.name}</h1>
      <p>{region.description}</p>

      {/* Add additional details or interactive elements */}
      <section>
        <h2>Explore {region.name}</h2>
        <ul>
          <li>Unique flora and fauna</li>
          <li>Interesting landmarks</li>
          <li>Mythical tales of the region</li>
        </ul>
      </section>

      {/* Navigation options */}
      <div>
        <Link to="/">Back to Map</Link>
      </div>
    </div>
  );
};

export default RegionPage;
