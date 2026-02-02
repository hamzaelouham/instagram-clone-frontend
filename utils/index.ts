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

export const Login = async (url: string, data: Record<string, any>) => {
  const response = await fetch(url, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      query: `mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        email
        image
        name
        userId 
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
// let data = [];
// let post = {};
// nodes.forEach((ele) => {
//   post = {
//     imageUrl: ele.querySelector("img").src,
//     coption: ele.querySelector("img").get,
//   };
//   data.append(post);
// });

// nodes.forEach((ele) => {
//   const image = ele.querySelector("img");
//   console.log(image);
//   console.log(image.getAttribute("src"));
// });
