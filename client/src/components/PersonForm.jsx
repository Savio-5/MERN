const PersonForm = ({handleEvent, newName, handleChangeName, newNumber, handleChangeNumber}) => {
  return (
    <form className="m-2" onSubmit={handleEvent}>
      <div>Name: <input type='text' className="m-1" value={newName} onChange={handleChangeName}/></div>
      <div>Number: <input type='text' className="m-1" value={newNumber} onChange={handleChangeNumber}/></div>
      <div>
        <button className="btn btn-primary" type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm;