import { useEffect, useState, ReactNode } from "react";

import "./visuallyhidden.styles.css";

const VisuallyHidden = ({
  children,
  ...delegated
}: {
  children: ReactNode;
}) => {
  const [forceShow, setForceShow] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      const handleKeyDown = (ev: { key: string }) => {
        if (ev.key === "Alt") {
          setForceShow(true);
        }
      };

      const handleKeyUp = () => {
        setForceShow(false);
      };

      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keydown", handleKeyUp);
      };
    }
  }, []);

  if (forceShow) {
    return children;
  }

  return (
    <div className="hidden__wrapper" {...delegated}>
      {children}
    </div>
  );
};

export default VisuallyHidden;
