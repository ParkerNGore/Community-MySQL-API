const express = require("express");
const fetch = require("node-fetch");
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

  const { URLSearchParams } = require("url");

  const params = new URLSearchParams();
  params.append("client_id", CLIENT_ID);
  params.append("client_secret", CLIENT_SECRET);
  params.append("grant_type", "authorization_code");
  params.append("redirect_uri", REDIRECT_URI);
  params.append("scope", "identity email guilds");
  params.append("code", code);

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
