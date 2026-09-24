# Miko

Miko is a multipurpose Discord bot built with Discord.js v14. It includes moderation, tickets, music, economy, leveling, games, giveaways, custom commands, suggestions, server statistics, and utility commands.

Miko now ships with a cohesive **cozy kawaii** presentation: pastel pink/lilac accents, soft success and error colors, a consistent `Miko ✿` embed signature, friendlier fallback messages, and rotating cute presence text. Server-specific embed colors still take priority when configured.

> This repository is a modified and updated version of the original open-source project. Keep the existing MIT license and original attribution when redistributing it.

## Requirements

- Node.js 20 or newer for local development
- A Discord application and bot token
- MongoDB connection string
- Giphy token for image commands
- Optional Spotify and Lavalink credentials for music features

## Local setup

```bash
cp .env.example .env
npm ci
npm start
```

Fill in `DISCORD_TOKEN`, `MONGO_TOKEN`, and `GIPHY_TOKEN` in `.env`. The bot also starts an HTTP health server on `PORT` (default `3000`) and binds to `HOST` (default `0.0.0.0`).

Health endpoints:

- `/health` — returns HTTP 200 while the Miko process is alive; use this for UptimeRobot.
- `/ready` — returns HTTP 200 after at least one Discord shard has spawned, otherwise HTTP 503.

Try `/miko` in Discord for a polished profile card with Miko’s features, live server count, API latency, and invite/support buttons.

## Deploy on Render

This project includes a `render.yaml` Blueprint and a Dockerfile. In Render, create a new Blueprint from this repository or create a Docker web service pointing at the repository root. Render will use the Dockerfile and expose port `3000`.

Add these environment variables in Render:

```text
DISCORD_TOKEN=your_discord_bot_token
MONGO_TOKEN=your_mongodb_connection_string
GIPHY_TOKEN=your_giphy_token
DISCORD_ID=your_discord_user_id
PORT=3000
HOST=0.0.0.0
```

The other variables in `.env.example` are optional. Never commit `.env` or any bot token.

After the first successful deploy, copy the public Render URL. Verify that `https://YOUR-RENDER-URL/health` returns JSON with `"status":"ok"`.

## Keep Miko awake with UptimeRobot

Create an **HTTP(s) monitor** in UptimeRobot with:

- **URL:** `https://YOUR-RENDER-URL/health`
- **Monitoring interval:** 5 minutes (or the shortest interval available on your plan)
- **Expected status:** HTTP 200

UptimeRobot can prevent a free Render web service from going idle, but it cannot repair a crashed process. Render must be configured with the correct environment variables, and Discord must have the required intents enabled.

## Useful commands

```bash
npm start                 # production start
npm run dev               # local development with nodemon
npm run add-dev USER_ID   # grant developer access
```

## License

MIT. See [LICENSE](LICENSE). 
