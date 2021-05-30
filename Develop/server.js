const express = require("express");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const app = express();
const PORT = process.env.PORT || 5000;

//Creating the route for the server to handle

app.use(
  express.static(path.join(__dirname, "public"), {
    extensions: ["html"],
  })
);

//Function for middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "./db/db.json"), (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

//Method to create a new note

app.post("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "./db/db.json"), (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    const newNote = req.body;
    newNote.id = uuid.v4();
    notes.push(newNote);

    const makeNote = JSON.stringify(notes);
    fs.writeFile(path.join(__dirname, "./db/db.json"), makeNote, (err) => {
      if (err) throw err;
    });
    res.json(newNote);
  });
});

//Delete Notes

app.delete("/api/notes/:id", (req, res) => {
  console.log("delete: ", req.params);
  const noteID = req.params.id;
  fs.readFile(path.join(__dirname, "./db/db.json"), (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    const notesArray = notes.filter((item) => {
      return item.id !== noteID;
    });

    fs.writeFile("./db/db.json", JSON.stringify(notesArray), (err, data) => {
      console.log("The note has been deleted");
      if (err) throw err;
      res.json(notesArray);
    });
  });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
