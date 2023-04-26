import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'


const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newPerson, setNewPerson] = useState([])
  const [message, setMessage] = useState(null)

  useEffect(() => {
    axios.get('/api/phonebook').then(allPerson => {
      setPersons(allPerson)
      setNewPerson(allPerson)
    })
  }, [])

  useEffect(() => {
    setTimeout(
      () => setMessage(null),
      5000
    )
  }, [message])

  function handleEvent(event) {
    event.preventDefault()
    const person = persons.find(person => person.name === newName)
    if(person) {
      alert(`${newName} is already added to phonebook`)
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPerson = {...person, number: newNumber}
        axios.put(`/api/phonebook/${person.id}`,changedPerson)
        .then(updatePerson => {
          setMessage({
            error: 'alert',
            name: `Updated ${updatePerson.name}`,
          })
          setPersons(persons.map(person => person.id !== updatePerson.id ? person : updatePerson))
          setNewPerson(persons.map(person => person.id !== updatePerson.id ? person : updatePerson))
        })
      }
    } else {
      const personObject = {
        id: persons.length + 1,
        name: newName,
        number: newNumber
      }

      axios.post('/api/phonebook/insert-record',personObject).then(createPerson => {
        setMessage({
          error: 'success',
          name: `Added ${createPerson.name}`,
        })
        setPersons(persons.concat(createPerson))
        setNewPerson(persons.concat(createPerson))
      })
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id,name) => {
    if(window.confirm(`Delete ${name} ?`)) {
      personService.remove(id).then(response => {
        setMessage({
          error: 'error',
          name: `Deleted ${name}`,
        })
        setPersons(persons.filter(person => person.id !== id))
        setNewPerson(persons.filter(person => person.id !== id))
      }).catch(error => {
        setMessage({
          error: 'error',
          name: `Information of ${name} has already been removed from server`,
        })
        setPersons(persons.filter(person => person.id !== id))
        setNewPerson(persons.filter(person => person.id !== id))
      })
    }
  }

  function handleFilter(event) {
    setNewFilter(event.target.value)
    setNewPerson(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  function handleChangeName(event) {
    setNewName(event.target.value)
  }

  function handleChangeNumber(event) {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} />

      <Filter newFilter={newFilter} handleFilter={handleFilter} />

      <h3>Add a new</h3>

      <PersonForm 
        handleEvent={handleEvent}
        newName={newName}
        handleChangeName={handleChangeName}
        newNumber={newNumber}
        handleChangeNumber={handleChangeNumber}
      />

      <h3>Numbers</h3>

      <Persons newPerson={newPerson} deletePerson={deletePerson}/>
    </div>
  )
}


// function App() {
  

//   return (
//     <>
//       {/* <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p> */}
//     </>
//   )
// }

export default App
