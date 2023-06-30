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

export const Auth = async (url: string, data: any) => {
  const response = await fetch(url, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      query: `mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        accessToken  
      }
     }`,
      variables: {
        email: data.email,
        password: data.password,
      },
    }),
  });

  return await response.json();
};

// `mutation Login($email: String!, $password: String!) {
//   login(email: $email, password: $password) {
//    accessToken
//   }
// }`;
