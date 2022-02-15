var fs = require('fs');
var express = require('express');
var morgan = require('morgan');
const request = require('request');

var app = express();
app.use(morgan('combined'));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.end("front-service");
});

app.get('/api/download',(req,res) => {
    if(!req.query.path){
        res.end("Parameter path is missing");
    }else {
        res.end(fs.readFileSync(__dirname + "/downloads/"+req.query.path)); //
    }
});

app.get('/api/', (req, res) => {
    res.end('v1.0');
});

app.get('/api/user', (req, res) => {
    res.setHeader('content-type', 'text/html');
    res.end(req.query.id ? req.query.id : "Parameter id is missing");
});

app.get('/api/resource', (req, res) => {
    var url = req.query.url;

    console.log('Loading source from', url);

    if(!url){
        res.end("Paramter url is missing");
    }else{
        request(req.query.url, { json: true }, (err, response, body) => {
            if (err) { res.status(500).end(JSON.stringify(err)); }
            else {
                res.status(response.statusCode).end(body);
            }
            //console.log(body);
        });
    }
});

app.listen(80);