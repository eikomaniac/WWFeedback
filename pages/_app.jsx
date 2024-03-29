import { ChakraProvider, theme } from '@chakra-ui/react';
import { RoomServiceParameters, RoomServiceProvider } from "@roomservice/react";
import { useEffect, useState } from "react";
import { customAlphabet, nanoid } from "nanoid";
import '../styles/date-picker.css';
import '../styles/globals.css';

async function myAuthFunction(params) {
  const response = await fetch("/api/v1/roomservice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    //  Pass cookies to server
    credentials: "include",
    body: JSON.stringify({
      room: params.room,

      //  TODO: Determine userID on server based on cookies or values passed in here.
      user: params.ctx.userID,
    }),
  });

  if (response.status === 401) {
    throw new Error("Unauthorized!");
  }

  if (response.status !== 200) {
    throw await response.text();
  }

  const body = await response.json();
  return {
    user: body.user,
    resources: body.resources,
    token: body.token,
  };
}

function WWFeedback({ Component, pageProps }) {
  const userID = useUserID();
  return (
    <ChakraProvider theme={theme}>
    <RoomServiceProvider
      //  Don't connect until the userID is set
      online={userID !== null}
      clientParameters={{
        auth: myAuthFunction,
        //  Passed into myAuthFunction when RoomService connects. Include
        //  anything you need here to identify the user on the server.
        ctx: {
          userID,
        },
      }}
    >
    <Component {...pageProps} />
    </RoomServiceProvider>
    </ChakraProvider>
  );
}

//  Stores a random userID in localStorage. Remove this once you have integrated
//  your own authentication scheme.
function useUserID() {
  const [userID, setUserID] = useState(null);

  //  useEffect forces this to happen on the client, since `window` is not
  //  available on the server during server-side rendering
  useEffect(() => {
    let userID = window.localStorage.getItem("roomservice-user");
    if (userID == null) {
      const generateBase62ID = customAlphabet(
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
        22
      );
      userID = generateBase62ID();
      window.localStorage.setItem("roomservice-user", userID);
    }
    setUserID(userID);
  }, []);

  return userID;
}

export default WWFeedback;
