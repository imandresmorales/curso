import { useState, useEffect } from "react";
import personService from "./services/persons"

import Formulario from "./components/Formulario";
import Persona from "./components/Persona";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll()
        .then((response) => {
          setPersons(response.data);
        });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    let i = 0;

    persons.map((persona) => {
      if (persona.name === newName) {
        const resultado = window.confirm(`${persona.name} is already added to phonebook, replace the old number with a new one?`)

        if(resultado){
          const person = persons.filter( p => p.id === persona.id)
          const personChange = {name: person[0].name, phone: newPhone}
          personService.update(persona.id, personChange)
            .then(response => {
              setPersons(persons.map(p => p.id !== persona.id ? p :  response.data))
            })
        }else{
//
        }
        i = 1;
      }
    });

    if (i === 0) {
      const obj = {
        name: newName,
        phone: newPhone,
      };
      personService.create(obj)
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
