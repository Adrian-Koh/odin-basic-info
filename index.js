const http = require("node:http");
const fs = require("node:fs");

const VALID_URLS = ["/", "/about", "/contact-me"];
const DEFAULT_PORT = 8080;

// Create a local server to receive data from
const server = http.createServer((req, res) => {
  if (VALID_URLS.includes(req.url)) {
    res.writeHead(200, { "Content-Type": "text/html" });
    let filePath;
    switch (req.url) {
      case "/":
        filePath = "index.html";
        break;
      case "/about":
        filePath = "about.html";
        break;
      case "/contact-me":
        filePath = "contact-me.html";
        break;
    }
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      res.end(data);
    });
  }
});

server.listen(DEFAULT_PORT, () => {
  console.log(`Server listening on port ${DEFAULT_PORT}.`);
});
