const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.beu5aww.mongodb.net/noteApp?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });

const Note = mongoose.model("Note", {
  content: String,
  date: Date,
  important: Boolean,
});

const note = new Note({
  content: "Promise auttaa asynkronisissa operaatiossa",
  date: new Date(),
  important: false,
});

if (false) {
  note.save().then((response) => {
    console.log("note saved!");
    mongoose.connection.close();
  });
}

Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
