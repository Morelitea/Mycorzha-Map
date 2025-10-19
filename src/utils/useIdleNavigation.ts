import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * This hook will listen for user activity and reset the idle timer.
 * If no activity is detected within the specified time, it will navigate to the home page.
 * @param idleTimeMs Time to wait before redirecting to home page in milliseconds
 * @returns void
 */
export const useIdleNavigation = (idleTimeMs = 180000) => {
  const navigate = useNavigate();
  let idleTimerRef: ReturnType<typeof setTimeout> | undefined = undefined;

  const resetIdleTimer = () => {
    clearTimeout(idleTimerRef);
    idleTimerRef = setTimeout(() => {
      navigate("/");
    }, idleTimeMs); // Redirect to home after 3 minutes of inactivity
  };

  useEffect(() => {
    const handleUserActivity = () => {
      resetIdleTimer();
    };
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);
    window.addEventListener("touchstart", handleUserActivity);
    window.addEventListener("scroll", handleUserActivity);

    return () => {
      // Cleanup event listeners on component unmount
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      window.removeEventListener("touchstart", handleUserActivity);
      window.removeEventListener("scroll", handleUserActivity);
      if (idleTimerRef) {
        clearTimeout(idleTimerRef);
      }
    };
  }, [navigate, idleTimeMs]);
};

export default useIdleNavigation;
