import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  
  const addName = (event) => {
    event.preventDefault()
    let i=0
    const nameObject = {
      name: newName
    }
    persons.map(obj =>{
      if(obj.name === newName){
        alert(`${newName} is already added to phonebook`)
        i=1
      }
    }
      )
    if(i === 0){
      setPersons(persons.concat(nameObject))
      setNewName('')
    }
    
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
 
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div >
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>   
      <div>
      {persons.map(obj => 
        <p key={obj.name}>{obj.name}</p>
        )}
      </div>
    </div>
  )
}

export default App