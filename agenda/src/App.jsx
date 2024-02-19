import { useState, useEffect } from "react";
import axios from "axios";

import Formulario from "./components/Formulario";
import Persona from "./components/Persona";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    let i = 0;

    persons.map((obj) => {
      if (obj.name === newName) {
        alert(`${newName} is already added to phonebook`);
        i = 1;
      }
    });

    if (i === 0) {
      const obj = {
        name: newName,
        phone: newPhone,
      };
      axios
        .post('http://localhost:3001/persons', obj)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewPhone('')
        })
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with :{" "}
        <input value={filter} onChange={handleFilterChange} />
      </div>
      <h2>add a new</h2>
      <Formulario
        newName={newName}
        newPhone={newPhone}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        addName={addName}
      />
      <h2>Numbers</h2>
      <Persona persons={persons} filter={filter} />
    </div>
  );
};

export default App;
