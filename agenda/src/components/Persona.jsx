import Busqueda from './Busqueda'
import personService from "../services/persons"

const Persona = ({ persons, filter, setPersons }) => {
    let filteredPersons;
    if (filter === "") {
      filteredPersons = persons;
    } else {
      filteredPersons = Busqueda(persons, filter);
    }
    
    const borrar = (person) => {
      const resultado = window.confirm(`Delete ${person.name}`)
      if(resultado){
        personService.eliminar(person.id)
          .then(
            setPersons(persons.filter(p => p.id !== person.id))
          )
      }
    }

    return (
      <>
        {filteredPersons.map(person => 
          (
            <div key={person.name}>
              <span>{person.name} {person.phone} </span>
              <button onClick={ () => borrar(person) }>delete</button>
            </div>
          )
        )}
      </>
    );
  }

export default Persona;