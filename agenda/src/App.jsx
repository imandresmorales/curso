import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const addName = (event) => {
    event.preventDefault()
    let i=0

    persons.map(obj =>{
      if(obj.name === newName){
        alert(`${newName} is already added to phonebook`)
        i=1
      }
    })

    if(i === 0){
      const obj={
        name: newName, phone: newPhone
      }
      setPersons(persons.concat(obj))
      setNewName('')
      setNewPhone('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }
 
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div >
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>       
      <div>
        {persons.map(obj => 
              <p key={obj.name}>{obj.name} {obj.phone} </p>
        )}
      </div>   
    </div>
  )
}

export default App