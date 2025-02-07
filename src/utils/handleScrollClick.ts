export const handleScrollClick = (
  ev: React.MouseEvent<HTMLAnchorElement>
): void => {
  console.log("debug: ", { ev });
  const target = ev.currentTarget as HTMLAnchorElement;
  if (target?.hash) {
    ev.preventDefault();
    const id = target.hash.substring(1);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 20,
        behavior: "smooth",
      });
    }
  }
};

export default handleScrollClick;
