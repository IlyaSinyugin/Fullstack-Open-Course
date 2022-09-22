import { useState, useEffect } from "react";
import personsService from "./services/persons";
import Notification from "./components/Notification";

const Person = ({ person, toggleRemoval }) => {
  return (
    <div>
      {person.name} {person.number}{" "}
      <button onClick={toggleRemoval}>delete</button>
    </div>
  );
};

const Filter = (props) => {
  return (
    <div>
      filter shown with <input onChange={props.handleFilter} />
    </div>
  );
};

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number:{" "}
        <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    console.log("effect");
    personsService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);
  console.log("render", persons.length, "persons");
  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    const onePerson = persons.filter((person) => person.name === newName);
    if (onePerson.length > 0) {
      console.log(onePerson[0].id);
      window.confirm(
        `${newName} is already added ot phonebook, replace the old number with a new one?`
      )
        ? personsService
            .update(onePerson[0].id, {
              name: newName,
              number: newNumber,
            })
            .then(() => {
              const changedPersons = persons.map((person) => {
                if (person.name === newName) {
                  return { ...person, number: newNumber };
                }
                return person;
              });
              console.log("Persons set to " + Object.values(changedPersons));

              setPersons(changedPersons);
            })
        : console.log("action stopped");
    } else {
      personsService.create(personObject).then((response) => {
        setPersons(persons.concat(response.data));
      });
      setMessage(`Added ${newName}`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const toggleRemovalOf = (id) => {
    console.log("this person " + id + " needs to be removed");
    personsService.remove(id).then(() => {
      setPersons((persons) =>
        persons.filter((person) => {
          return person.id !== id;
        })
      );
    });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const personsToShow =
    persons.length === 0
      ? persons
      : Object.values(persons).filter((person) =>
          person.name.toUpperCase().includes(filter.toUpperCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter handleFilter={handleFilter} />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {console.log(
        Object.values(persons).filter((person) =>
          person.name.toUpperCase().includes(filter.toUpperCase())
        )
      )}
      {personsToShow.map((person) => (
        <div key={person.name}>
          <Person
            key={person.name}
            person={person}
            toggleRemoval={() =>
              window.confirm(`Delete ${person.name}?`)
                ? toggleRemovalOf(person.id)
                : console.log("action stopped")
            }
          />
        </div>
      ))}
    </div>
  );
};

export default App;
