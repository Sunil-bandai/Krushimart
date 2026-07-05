import http from 'http';
import fs from 'fs';
import path from 'path';

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript', 
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

const server = http.createServer((req, res) => {
  let filePath = req.url === '/' ? '/index.html' : req.url;
  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';
  
  fs.readFile('.' + filePath, (err, data) => {
    if (err) {
      fs.readFile('./index.html', (e, d) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(d);
      });
    } else {
      res.writeHead(200, {'Content-Type': contentType});
      res.end(data);
    }
  });
});

server.listen(3002, () => console.log('Frontend: http://localhost:3002'));