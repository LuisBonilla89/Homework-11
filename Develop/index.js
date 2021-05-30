const express = require("express");
const { fstat } = require("fs");
const path = require("path");

const app = express();

app.get("/api/members", (req, resp) => {});

app.use(
  express.static(path.join(__dirname, "public"), { extension: ["html"] })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//Function for middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/notes", (req, resp) => {
  fs.readFile(path.join(__dirname, "./db/sb.json"), (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
    resp.json(notes);
  });
});
