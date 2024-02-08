// # Discord Login System: Authenticates users through Discord and automatically adds them to their designated Discord group.

// # This code implements a login system that utilizes Discord authentication to verify user credentials.
// # Upon successful authentication, the user is automatically granted access to their respective Discord group.
// # The integration with Discord API allows seamless user management within the specified community.

// Learn more https://discord.com/developers/docs/intro

import { serialize } from "cookie";

const guildId = ""; // You Guild ID

export default async function handler(req, res) {
  try {
    const { code } = req.query;

    const response = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: "1035175376877522954",
        client_secret: "7jt-IYSGWO9snrDET2OX1ryEUZsEvAnW",
        code,
        grant_type: "authorization_code",
        redirect_uri: "http://localhost:3000/api/auth/callback",
      }),
    });

    const data = await response.json();
    const accessToken = data.access_token;

    // Make a request for user details
    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userData = await userResponse.json();

    // WebHook Optional!

    try {
      const payload = {
        content: "<@&1057345242912800822>",
        embeds: [
          {
            title: "New Login",
            description: `User: ${
              userData.discriminator && userData.discriminator > 0
                ? userData.username + `#${userData.discriminator}`
                : userData.username
            }\n${
              userData.global_name ? `Name:` + userData.global_name : null
            }\nID: ${userData.id}\n\nMarking: <@${userData.id}>`,

            color: 0x3498db,
            thumbnail: {
              url: `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`,
            },
            timestamp: new Date(),
          },
        ],
      };

      await fetch("https://discord.com/api/webhooks/....", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error("Erro no servidor:", error);
    }

    // Request the user's list of servers (guilds)
    const guildsResponse = await fetch(
      "https://discord.com/api/users/@me/guilds",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const userGuilds = await guildsResponse.json();

    // Check if the user is on the desired server (You GuildID)
    const isMemberOfGuild = userGuilds.some((guild) => {
      return guild.id === guildId;
    });

    if (!isMemberOfGuild) {
      console.log("The user is not a member of the desired guild.");

      // Add user to server
      const addMemberResponse = await fetch(
        `https://discord.com/api/guilds/${guildId}/members/${userData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bot <You Token BOT>`,
          },
          body: JSON.stringify({
            access_token: accessToken,
          }),
        }
      );

      if (addMemberResponse.ok) {
        console.log("User successfully added to the server.");
      } else {
        console.error(
          "Error adding user to server:",
          addMemberResponse.statusText
        );
      }
    } else {
      console.log("The user is a member of the desired guild.");
    }

    // Request the user's list of connections
    const connectionsResponse = await fetch(
      "https://discord.com/api/users/@me/connections",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const userConnections = await connectionsResponse.json();

    res.setHeader("Set-Cookie", [
      serialize("discordToken", accessToken, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600,
        sameSite: "strict",
      }),
      serialize("discordUser", JSON.stringify(userData), {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600,
        sameSite: "strict",
      }),
      serialize("discordCone", JSON.stringify(userConnections), {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600,
        sameSite: "strict",
      }),
    ]);

    res.redirect("/redi");
  } catch (error) {
    console.error("Erro na rota de callback:", error);
    res.redirect("/ops");
  }
}
