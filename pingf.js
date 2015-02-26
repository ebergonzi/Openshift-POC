var http = require("http");
var time = require("time");

var server = http.createServer(function (request, response) {
    var date=new Date();
    var options = {
	host: '127.0.0.1',
	port: 7000,
	path: '/v1/ping',
	method: 'GET'
    }

    if(request.url == "/v1/ping") {
      console.log("hit");
      response.writeHead(200, {"Content-Type": "application/json"});
      response.write('{ "msg": "pong!"\n');
      response.write('{ "start": "' + date.toISOString() + '",\n');
      response.write('"children" : [' + '\n');

      http.request(options, function(cres) {
	    var str = '';
            cres.on('data', function (chunk) {
		str += chunk;
                response.write(str + '\n');
            });
            cres.on('error', function(e) {
	        console.log('error: ' + e.message);
            });
            cres.on('end', function () {
                response.write('{' + '\n');
                response.write(str + '\n');
                console.log(str + '\n');
                response.write('}\n');
            });
      }).end();

      response.write('],\n');
      date=new Date();
      response.write('"end": "' + date.toISOString() +'"\n');
      response.end('}\n');
    }	
    //return;
});

server.listen(8000);
console.log("Servidor corriendo");
