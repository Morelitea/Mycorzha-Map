import { replace } from "react-router-dom";

export const handleScrollClick = (
  ev: React.MouseEvent<HTMLAnchorElement>
): void => {
  const target = ev.currentTarget as HTMLAnchorElement;
  if (target?.hash) {
    const id = target.hash.substring(1);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 20,
        behavior: "smooth",
      });
    }
  } else {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }
};

export default handleScrollClick;
