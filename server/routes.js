const path = require("path");
const sendDir = path.join(__dirname, "/../public");

function routes(server) {
    server.get("/", function(req, res) {
        res.sendFile(path.join(sendDir, "index.html"));
    });

    server.get("/notes", function(req, res) {
        res.sendFile(path.join(sendDir, "notes.html"));
    });
}

module.exports = routes;