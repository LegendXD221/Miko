const http = require("node:http");

function createHealthServer({ manager, name, version }) {
    const startedAt = new Date();

    const server = http.createServer((request, response) => {
        const path = new URL(request.url || "/", "http://localhost").pathname;
        const shardCount = manager?.shards?.size || 0;
        const payload = {
            service: name,
            version,
            status: "ok",
            uptimeSeconds: Math.floor(process.uptime()),
            startedAt: startedAt.toISOString(),
            shards: shardCount,
        };

        response.setHeader("Content-Type", "application/json; charset=utf-8");
        response.setHeader("Cache-Control", "no-store");

        if (path === "/" || path === "/health") {
            response.writeHead(200);
            return response.end(JSON.stringify(payload));
        }

        if (path === "/ready") {
            const ready = shardCount > 0;
            response.writeHead(ready ? 200 : 503);
            return response.end(JSON.stringify({ ...payload, status: ready ? "ready" : "starting" }));
        }

        response.writeHead(404);
        return response.end(JSON.stringify({ service: name, status: "not_found" }));
    });

    const port = Number.parseInt(process.env.PORT || "3000", 10);
    const host = process.env.HOST || "0.0.0.0";

    server.listen(port, host, () => {
        console.log(`[${name}] Health server listening on http://${host}:${port}`);
        console.log(`[${name}] UptimeRobot URL: /health`);
    });

    server.on("error", (error) => {
        console.error(`[${name}] Health server error:`, error);
    });

    return server;
}

module.exports = { createHealthServer };
