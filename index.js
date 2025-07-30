const http = require("node:http");
const fs = require("node:fs");

const VALID_URLS = ["/", "/about", "/contact-me"];
const DEFAULT_PORT = 8080;

// Create a local server to receive data from
const server = http.createServer((req, res) => {
  let filePath;
  if (VALID_URLS.includes(req.url)) {
    res.writeHead(200, { "Content-Type": "text/html" });
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
  } else if (req.url === "/styles.css") {
    const fileStream = fs.createReadStream("styles.css", "UTF-8");
    res.writeHead(200, { "Content-Type": "text/css" });
    fileStream.pipe(res);
    return;
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    filePath = "404.html";
  }
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.write(data);
  });
});

server.listen(DEFAULT_PORT, () => {
  console.log(`Server listening on port ${DEFAULT_PORT}.`);
});
