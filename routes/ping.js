var express = require('express');
var time = require("time");
var http = require("http");
var os = require("os");
var router = express.Router();

router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/v1/self', function(req, res) {
      res.send('{\n' +
	        '"msg": "pong!",\n' +
		'"os.hostname": "' + os.hostname() + '",\n' +
		'"http.hostname": "' + req.headers.host + '"\n' +
                '}\n');
      res.end();
});

router.get('/v1/others/:hostname/:port', function(req, res) {
    var str='';
    var options = {
	host: req.params.hostname,
	port: req.params.port,
	path: '/ping/v1/self',
	method: 'GET'
    }

    str += '{\n';
    str += '"children" : [' + '\n';
    var date=new Date();

    var child = http.request(options, function(request) {
        request.on('data', function (chunk) {
          	str += chunk;
        });
        request.on('error', function(e) {
                console.log('error: ' + e.message);
		return;
        });
        request.on('end', function () {
                str += '\n';
      		str += ']\n,';
    		str += '"start": "' + date.toISOString() + '",\n';
      		date=new Date();
    		str += '"end": "' + date.toISOString() + '"\n';
		str +=('}\n');
	        res.send(str);
        });
      });
      child.end();
});


module.exports = router;
