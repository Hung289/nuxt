/* eslint-disable import/prefer-default-export */

export const RequestAuthClient = async (url, typeMethod, param) => {
  const token=localStorage.getItem("token");
  const data = await fetch(url, {
    method: typeMethod, // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(param),
  })
    .then((response) => response.json())
    .then((json) => {
      console.log("RequestAuthClient");
      console.log(json);
      if (json.ErrorCode === 401) {
        window.location.href = '/500';
        
      }
      return json;
    });
  return data;
};

export const RequestSimple = async (url, typeMethod, param) => {
  const data = await fetch(url, {
    method: typeMethod, // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(param),
  })
    .then((response) => response.json())
    .then((json) => {
      return json;
    });
  return data;
};
