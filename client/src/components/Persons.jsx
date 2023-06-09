const Persons = ({ newPerson, deletePerson }) => {
  return (
    <div>
      {newPerson.map((person, index) => {
        return (<div className="m-2" key={index}>
          <p className="m-1">{person.name} {person.number}<button className="m-3 btn btn-primary" key={index} onClick={() => deletePerson(person.id,person.name)}>delete</button></p>
        </div>)
      })}
    </div>
  )
}

export default Persons;