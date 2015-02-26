var http = require("http");
var time = require("time");

var server = http.createServer(function (req, res) {
    var date=new Date();
    var options = {
	host: '127.0.0.1',
	port: 7000,
	path: '/v1/ping',
	method: 'GET'
    }

    if(req.url == "/v1/ping") {
      console.log("hit");
      res.writeHead(200, {"Content-Type": "application/json"});
      res.write('{ "msg": "pong!"\n');
      res.write('{ "start": "' + date.toISOString() + '",\n');
      res.write('"children" : [' + '\n');

      var child = http.request(options, function(request) {
          var str='';
          request.on('data', function (chunk) {
            	str += chunk;
          });
          request.on('error', function(e) {
                    console.log('error: ' + e.message);
          });
          request.on('end', function () {
                  res.write(str + '\n');

      		  res.write('],\n');
      		  date=new Date();
      		  res.write('"end": "' + date.toISOString() +'"\n');
		  res.write('}\n');
	          res.end();
          });
      });
      child.end();
    }	
    return;
});

server.listen(8000);
console.log("Servidor corriendo");
