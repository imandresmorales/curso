import Busqueda from './Busqueda'

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
          <p key={person.name}>{person.name} {person.phone}</p>
        )}
      </>
    );
  }

export default Persona;