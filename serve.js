// Zero-dependency static server for the web version.
//   npm run web      (or: node serve.js)
// Then open http://localhost:3000 (in Codespaces: the Ports tab, port 3000).

import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const PORT = Number(process.env.PORT) || 3000;
const ROOT = process.cwd();

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".md": "text/plain; charset=utf-8",
};

function notFound(res, urlPath, filePath) {
  const dir = path.dirname(filePath);
  let present = "(folder not found)";
  try {
    present = fs.readdirSync(dir).join(", ");
  } catch {
    /* folder missing */
  }
  console.log(`[404] ${urlPath} -> looked for ${filePath}`);
  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(
    `404 Not Found\n\nRequested: ${urlPath}\nLooked for: ${filePath}\nFiles in that folder: ${present}\n\n` +
      `If the file exists under a different name or folder, that's the mismatch to fix.\n`,
  );
}

const server = http.createServer((req, res) => {
  let urlPath;
  try {
    urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  } catch {
    res.writeHead(400).end("Bad request");
    return;
  }
  if (urlPath.endsWith("/")) urlPath += "index.html";

  // Never serve anything outside the project folder.
  const filePath = path.resolve(ROOT, `.${urlPath}`);
  if (filePath !== ROOT && !filePath.startsWith(ROOT + path.sep)) {
    res.writeHead(403).end("Forbidden");
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) return notFound(res, urlPath, filePath);
    res.writeHead(200, {
      "Content-Type": MIME[path.extname(filePath).toLowerCase()] ?? "application/octet-stream",
      // Always fetch fresh files, so an update shows up on the next refresh.
      "Cache-Control": "no-cache",
    });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`\nCareer Manager is running at http://localhost:${PORT}`);
  console.log(`Serving ${ROOT}`);
  console.log(`In Codespaces, open port ${PORT} from the Ports tab. Stop with Ctrl+C.\n`);
});