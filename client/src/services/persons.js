import axios from "axios";
const baseUrl = "https://mern-a5-hvhj.vercel.app/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(`${baseUrl}/add`, newObject);
  return request.then((response) => response.data);
};
const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const personService = { 
  getAll, 
  create,
  remove,
  update
};

export default personService
