import * as webpackConfig from '../../webpack.config.js'
import * as http from 'http';
import * as fs from 'fs';
import * as webpack from "webpack";

export async function launchHTTPServer():Promise<void> {
    const a = (await fs.promises.readFile('./app/static/index.html')).toString();
    const doot:[Promise<Buffer>, Promise<void>] = [
        fs.promises.readFile('./app/static/index.html') as Promise<Buffer>,
        webpackUsingConfig(webpackConfig)
    ]
    const [indexHTML, _]= await Promise.all(doot);
    const clientJs = (await fs.promises.readFile('./dist/bundle.js')).toString();
    createServer(indexHTML.toString(), clientJs);
}

function createServer(indexHTML:string, clientJs:string):void {
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

async function webpackUsingConfig(config:string):Promise<void> {
    console.log("Webpacking JavaScript...")
	return new Promise((res, rej) => {
		webpack(config, function(err, stats) {
            if(err) return rej(err);
            console.log("JavaScript Packed.")
			res();
		});
	})
}
