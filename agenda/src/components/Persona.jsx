import Busqueda from './Busqueda'
import personService from "../services/persons"

const Persona = ({ persons, filter }) => {
    let filteredPersons;
    if (filter === "") {
      filteredPersons = persons;
    } else {
      filteredPersons = Busqueda(persons, filter);
    }
    return (
      <>
        {filteredPersons.map(person => 
          (
            <div key={person.name}>
              <span>{person.name} {person.phone} </span>
              <button onClick={
                () => {
                  const resultado = window.confirm(`Delete ${person.name}`)
                  {resultado ? personService.eliminar(person.id) : alert("No eliminado")}
                }
              }>delete</button>
            </div>
          )
        )}
      </>
    );
  }

export default Persona;