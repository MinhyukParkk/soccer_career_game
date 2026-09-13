// Minimal static file server — no dependencies, no install step.
// Run with: node serve.js
// Then open the forwarded port and it lands straight on the game.

import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const PORT = 3000;
const ROOT = process.cwd();

const MIME = {
  ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png",
};

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split("?")[0]);
  if (urlPath === "/") urlPath = "/index.html";

  const filePath = path.join(ROOT, urlPath);
  console.log(`[request] ${req.method} ${urlPath}  ->  ${filePath}`);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Show exactly what we looked for and where, plus what IS actually in
      // that folder, so a 404 is diagnosable in one glance instead of a
      // guessing game.
      const dir = path.dirname(filePath);
      let siblingList = "(couldn't read that folder)";
      try {
        siblingList = fs.readdirSync(dir).join(", ");
      } catch {}
      console.log(`[404] Looked for: ${filePath}`);
      console.log(`[404] Files actually in ${dir}: ${siblingList}`);

      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end(
        `404 Not Found\n\n` +
        `Requested URL: ${urlPath}\n` +
        `Looked for file at: ${filePath}\n` +
        `Files actually present in that folder: ${siblingList}\n\n` +
        `If your file has a different name or is in a different folder, that's the mismatch to fix.`
      );
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`\nClub Carrera is running:`);
  console.log(`  http://localhost:${PORT}\n`);
  console.log(`Serving files from: ${ROOT}\n`);
  console.log(`In Codespaces: check the "Ports" tab and open port ${PORT} in the browser.\n`);
});