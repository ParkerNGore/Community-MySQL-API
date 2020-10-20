const express = require("express");
const fetch = require("node-fetch");
const btoa = require("btoa");
const { catchAsync } = require("../util/AsyncUtil");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
// const REDIRECT_URI = encodeURIComponent(
//   `http://localhost:${
//     process.env.PORT ? process.env.PORT : 3005
//   }/api/oauth2/callback`
// );
const REDIRECT_URI = `http://localhost:${
  process.env.PORT ? process.env.PORT : 3005
}/api/oauth2/callback`;

exports.handleLogin = (_, res) => {
  return res.redirect(
    `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=identify%20guilds%20email&prompt=none`
  );
};

exports.handleLogout = () => {};

exports.handleCallback = catchAsync(async (req, res) => {
  if (!req.query.code) {
    console.error("Unable to find code!");
    return;
  }

  console.log("CALLING CALLBACK BBY!");

  console.log(`code: ${req.query.code}`);

  const code = req.query.code;

  // const dataObj = {
  //   client_id: CLIENT_ID,
  //   client_secret: CLIENT_SECRET,
  //   grant_type: "authorization_code",
  //   code: code,
  //   redirect_uri: REDIRECT_URI,
  //   scope: "identify email guilds",
  // };

  // const data = formurlencoded(dataObj);

  // for (const prop of data) {
  //   console.log(`prop: ${prop}`);
  // }

  // const data = new FormData();

  // data.append("client_id", CLIENT_ID);
  // data.append("client_secret", CLIENT_SECRET);
  // data.append("grant_type", "authorization_code");
  // data.append("redirect_uri", REDIRECT_URI);
  // data.append("scope", "identify email guilds");
  // data.append("code", code);

  // const response = await axios.post(
  //   "https://discord.com/api/oauth2/token",
  //   data,
  //   {
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //   }
  // );

  // request.post("https://discord.com/api/oauth2/token").form(
  //   {
  //     data,
  //   },
  //   async (error, response, body) => {
  //     const json = await response.json();
  //     res.redirect(`/?token=${json.access_token}`);
  //   }
  // );

  // const response = await fetch("https://discordapp.com/api/oauth2/token", {
  //   method: "POST",
  //   form: data,
  // });

  const { URLSearchParams } = require("url");

  const params = new URLSearchParams();
  params.append("client_id", CLIENT_ID);
  params.append("client_secret", CLIENT_SECRET);
  params.append("grant_type", "authorization_code");
  params.append("redirect_uri", REDIRECT_URI);
  params.append("scope", "identity email guilds");
  params.append("code", code);
  // data.append("client_id", CLIENT_ID);
  // data.append("client_secret", CLIENT_SECRET);
  // data.append("grant_type", "authorization_code");
  // data.append("redirect_uri", REDIRECT_URI);
  // data.append("scope", "identify email guilds");
  // data.append("code", code);

  fetch(`https://discord.com/api/oauth2/token`, {
    method: "POST",
    body: params,
  })
    .then((res) => res.json())
    .then((json) => {
      res.redirect(
        `http://localhost:3005/api/oauth2//?token=${json.access_token}`
      );
    });
});
