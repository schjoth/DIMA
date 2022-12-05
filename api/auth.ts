// send a http request with axios to the Spotify api to get the access token
// should get the client_id and client_secret from the .env file
// react native app should be able to access the .env file

import axios from "axios";
const Buffer = require("buffer").Buffer;

export const authorize = () => {

    const auth = new Buffer.from(`${"d760e0ff5af14deab0c1384a48669a74"}:${"fc3afdaaae5d43e1ad37028019958240"}`, "utf-8").toString("base64");
  
    let token: string = "";

    axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${auth}`,
      },
      data: 'grant_type=client_credentials',
    })
      .then((response: any) => {
        console.log(response.data.access_token);
        token = response.data.access_token;
      })
      .catch((error: any) => {
        console.log(error);
      });

    return {token};
};

