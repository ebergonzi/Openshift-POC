var http = require("http");
var time = require("time");

var server = http.createServer(function (request, response) {
    if(request.url == "/v1/ping") {
      console.log("hit!");
      response.writeHead(200, {"Content-Type": "application/json"});
      response.write('{ "msg": "pong!"\n');
      response.end('}\n');
    }	
    return;
});

server.listen(7000);
console.log("Servidor corriendo");
