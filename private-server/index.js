var express = require('express');
var md5 = require('md5');
const auth_secret = md5("esi-uclm");
const { exec } = require("child_process");

var app = express();

app.use((req,res,next) => {
    console.log("remote ip", req.socket.remoteAddress);
    next();
});


app.get('/', (req, res) => {
    res.end("internal-service");
});

app.get('/secret', (req,res) => {
    res.end(auth_secret);
});

app.get('/ping', (req, res) => {
    var auth = req.query.auth;
    var server = req.query.server;
    console.log(req.query);
    if(!auth || auth.length == 0)
    {
        res.end("auth parameter not found");
    }else if(auth != auth_secret){
        res.end("Wrong secret!");
    } else if(!server || server.length == 0){
        res.end("server parameter not found");
    }else {
        exec("ping -c 1 " + req.query.server, (error, stdout, stderr) => {
            var data = "";
            if (error) {
                data += (`error: ${error.message}`) + "\n";
                return;
            }
            if (stderr) {
                data += (`stderr: ${stderr}`) + "\n";
                return;
            }
            data += (`stdout: ${stdout}`) + "\n";
            res.end(data);
        });
    }
});

app.listen(8090);