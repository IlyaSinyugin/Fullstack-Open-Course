const mongoose = require("mongoose");

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.beu5aww.mongodb.net/personApp?retryWrites=true&w=majority`;

mongoose.connect(url);

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", phonebookSchema);

if (process.argv.length < 5) {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(person.name + " " + person.number);
    });
    mongoose.connection.close();
    process.exit(1);
  });
}

const name = process.argv[3];
const number = process.argv[4];

const person = new Person({
  name: name,
  number: number,
});

if (process.argv.length == 5) {
  person.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
