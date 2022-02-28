const http = require('http');
const fs=require('fs');
const path=require('path');


const hostname = 'localhost';
const port =3000;

const server=http.createServer((req,res)=>{
    console.log("Request for "+ req.url +" by  method");
    if(req.method == 'GET'){
        let fileUrl;
        if(req.url == '/') fileUrl = '/index.html';
        else fileUrl = req.url;
        let filePath = path.resolve(__dirname + fileUrl);
        const fileExt=path.extname(fileUrl);
        if (fileExt == '.html') {
            fs.existsSync(filePath, (exists) => {
              if (!exists) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/html');
                res.end('<html><body><h1>Error 404: ' + fileUrl + 
                            ' not found</h1></body></html>');
                return;
              }
              res.statusCode = 200;
              res.setHeader('Content-Type', 'text/html');
              fs.createReadStream(filePath).pipe(res);
            });
          }
        else {
            res.statusCode =400;
            res.setHeader('Content-Type','text/html');
            res.end("<html><body><h1>Error 404: 'File not an html file'</h1></body></html>");

            return;
        }

    }
    else{
        res.statusCode =400;
        res.setHeader('Content-Type','text/html');
        res.end(`<html><body><h1>Error 404: ${req.method} Method not supported</h1></body></html>`);
    }
});

server.listen(port,hostname,()=>{
    console.log(`Server running at https://${hostname}:${port}`);
});
