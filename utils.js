module.exports.fetchJSON = function fetchJSON(url) {
    try {
        if(fetch) {
            console.log("Client-side Fetch not implemented yet.");
            return new Promise.reject();
        } else {
            console.log("Client-side Fetch exists, but is false-y ???");
            return new Promise.reject();
        }
    } catch(e) {
        const http = require('http');
        return new Promise((resolve, reject) => {
            http.get(url, response => {
                let json = '';
                response.on('data', chunk => {
                    json += chunk;
                });
                response.on('end', () => {
                    if (response.statusCode !== 200) return reject(`Response code not 200: ${response.statusCode}`);
                    try {
                        resolve(JSON.parse(json));
                    } catch(e) {
                        reject('Error parsing JSON!');
                    }
                });
            }).on('error', (err) => {
                reject(err);
            });
        });
    }
}

module.exports.createElement = function createElement(elementName, parent, id, className, text) {
    const div = document.createElement(elementName);
    if(id) {
        div.id = id;
    }
    if(className) {
        div.className = className;
    }
    if(text) {
        div.textContent = text;
    }
    if(parent) {
        parent.appendChild(div);
    }
    return div;
}
