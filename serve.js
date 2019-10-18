
const fs = require("fs");
const path = require("path");
const express = require('express');

const r = path.resolve.bind(null, __dirname);

const PORT = process.env.PORT || 3000;

function main() {
    const app = express();
    
    app.get("/", serveIndex(r("demo/index.html")));
    app.use(express.static(r("dist")));
    app.use(express.static(r("demo")));
    
    app.listen(PORT, () => {
        console.log("Listening on port:", PORT);
        console.log("Press Ctrl+C to quit.");
    });
}

function serveIndex(file) {
    return (req, res, next) => {
        fs.readFile(file, "utf-8", (error, data) => {
            if (error) {
                next(error);
            }
            else {
                res.send(data);
            }
        });
    }
}

if (require.main === module) main();
