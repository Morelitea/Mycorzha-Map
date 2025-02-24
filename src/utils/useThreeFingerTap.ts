import { useEffect, useState } from "react";

export const useThreeFingerTap = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    let touchStartTime: number;
    let touchCount: number;

    const handleTouchStart = (event: TouchEvent) => {
      touchCount = event.touches.length;
      if (touchCount === 3) {
        touchStartTime = Date.now();
      }
    };

    const handleTouchEnd = (_event: TouchEvent) => {
      if (touchCount === 3) {
        const touchEndTime = Date.now();
        const touchDuration = touchEndTime - touchStartTime;

        // Check if the touch duration is less than 500ms (considered a tap)
        if (touchDuration < 500) {
          toggleFullscreen();
        }
      }
      touchCount = 0;
    };

    const toggleFullscreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement
          .requestFullscreen()
          .then(() => {
            setIsFullscreen(true);
          })
          .catch((err) => {
            console.error("Error attempting to enable fullscreen:", err);
          });
      } else {
        document
          .exitFullscreen()
          .then(() => {
            setIsFullscreen(false);
          })
          .catch((err) => {
            console.error("Error attempting to exit fullscreen:", err);
          });
      }
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return isFullscreen;
};

export default useThreeFingerTap;
