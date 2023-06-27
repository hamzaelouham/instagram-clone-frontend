import React from "react";

export const useClassNames = () => {
  const classNames = (...classes: string[]) =>
    classes.filter(Boolean).join(" ");

  return {
    classNames,
  };
};

export const useDocumentClicked = () => {
  const [clicked, setClicked] = React.useState(false);

  React.useEffect(() => {
    const onclick = () => {
      setClicked(false);
    };

    document.addEventListener("mousedown", onclick);

    return () => {
      document.removeEventListener("mousedown", onclick);
    };
  }, []);

  return { clicked };
};

export const getAuthUser = async (data) => {
  const response = await fetch(url, options);
};
