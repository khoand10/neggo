const express = require('express')
const {node, python, java} = require('compile-run');

const app = express()
const bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
const port = 3000

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.post('/', jsonParser, async (req, res) => {
    const {lang, code} = req.body;
    let result;
    switch (lang) {
        case 'java':
            result = await java.runSource(code);
            res.send(result);
            break;
        case 'javascript':
            result = await node.runSource(code);
            res.send(result);
            break;
        case 'python':
            result = await python.runSource(code);
            res.send(result);
            break;
        default:
            res.send({message: "Not support"});            
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))