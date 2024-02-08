export default async function handler(req, res) {
  res.setHeader("Set-Cookie", [
    `discordUser=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`,
    `discordToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`,
    `discordGuilds=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`,
  ]);

  res.writeHead(302, { Location: "/" });
  res.end();
}
