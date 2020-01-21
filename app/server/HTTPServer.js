const webpackConfig = require('../../webpack.config.js');

const http = require('http');
const fs = require('fs').promises;

const webpack = require('webpack');

module.exports.launchHTTPServer = async function launchHTTPServer() {
    const [indexHTML, _] = await Promise.all([
        fs.readFile('./app/static/index.html'),
        webpackUsingConfig(webpackConfig)
    ]);
    const clientJs = await fs.readFile('./dist/bundle.js');
    createServer(indexHTML, clientJs);
}

function createServer(indexHTML, clientJs) {
    http.createServer((req, res) => {
        if(req.url === "/" || req.url === "/index.html") {
            res.end(indexHTML);
        } else if (req.url === "/client.js") {
            res.end(clientJs);
        } else {
            res.statusCode = 404;
            res.end();
        }
    }).listen(8080);
}

async function webpackUsingConfig(config) {
    console.log("Webpacking JavaScript...")
	return new Promise((res, rej) => {
		webpack(webpackConfig, function(err, stats) {
            if(err) return rej(err);
            console.log("JavaScript Packed.")
			res();
		});
	})
}
