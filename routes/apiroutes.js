const noteData = require("../db/db");
const fs = require("fs");
const path = require("path");

module.exports = function (app) {

    app.get("/api/notes", (req, res) => {
        fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
            if (err) throw err;
            return res.json(JSON.parse(data));
        });
    });

    app.delete("/api/notes/:id", (req, res) => {

        fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
            if (err) throw err;
            //check if file exisits.
            const fileJSON = JSON.parse(data);
            const id = parseInt(req.params.id);
            for (let i = 0; i < fileJSON.length; i++) {
                if (id === fileJSON[i].id) {
                    fileJSON.splice(i, 1);
                    fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(fileJSON), (err, data) => {
                        if (err) throw err;
                    });
                    return res.send("Note Deleted");
                }
            }

        });
    });



    app.post("/api/notes", (req, res) => {

        fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
            if (err) throw err;

            let reqJson = req.body;

            //check if file exisits.
            const fileJSON = JSON.parse(data);
            reqJson.id = Date.now();
            fileJSON.push(reqJson);

            fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(fileJSON), (err, data) => {
                if (err) throw err;
                return res.json(reqJson);
            });
        });

    });


};