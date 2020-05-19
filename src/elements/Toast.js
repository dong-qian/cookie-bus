import React from "react";

export const Toast = ({ toast }) => {
  const [animationClass, setAnimationClass] = React.useState("");
  React.useEffect(() => {
    setAnimationClass("opacity-100");
  }, []);

  return (
    <h1
      className={`${toast.color} transition-all ease-in-out duration-1000 opacity-0 ${animationClass}`}
    >
      {toast.message}
    </h1>
  );
};
