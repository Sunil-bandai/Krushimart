import http from 'http';
import https from 'https';
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
  '.ico': 'image/x-icon'
};

function proxyRequest(req, res) {
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: req.url,
    method: req.method,
    headers: req.headers
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  req.pipe(proxyReq, { end: true });
  proxyReq.on('error', (e) => {
    res.writeHead(502);
    res.end('Backend unavailable');
  });
}

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/api')) {
    proxyRequest(req, res);
    return;
  }

  let filePath = './dist' + (req.url === '/' ? '/index.html' : req.url);
  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.readFile('./dist/index.html', (err2, content2) => {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(content2);
        });
      } else {
        res.writeHead(500);
        res.end('Server Error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(3002, () => {
  console.log('Frontend running at http://localhost:3002');
  console.log('Backend at http://localhost:5000');
});