const Filter = ({newFilter, handleFilter}) => {
  return (
    <div className="m-1">filter shown with<input type='text' className="m-1" value={newFilter} onChange={handleFilter}/></div>
  )
}

export default Filter;