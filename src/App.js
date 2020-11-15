import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
// import axios from 'axios';

function App() {

  const[data, setData] = useState([]);
  const[input, setInput] = useState([]);

  useEffect(() => {
    // 1. On component load/mount let's make a call to
    //    our API and show some data on the page....
    handleFetch()
  }, []);


const handleFetch = () => {
  fetch('http://localhost:8080').then((res) => {
    return res.json()
  }).then(res => {
    setData(res)
    console.log("HERE IS THE DATA....");
    console.log(res);
  })
};

const handleSubmit = (e) => {

e.preventDefault()
const 
  fetchOptions = {
  method: 'POST',
  headers: {
    'Content-type': 'application/json'},
    // data in body
  body: JSON.stringify({"name": input})
}
fetch('http://localhost:8080/create', fetchOptions)
  .then(res => res.json())
  .then(res => {
    console.log("input data ",input);
    console.log(res);
    handleFetch()

  }
  )
};

const handleDelete = (user) => {
  // make a delete request
  const 
  fetchOptions = {
  method: 'DELETE',
  headers: {
    'Content-type': 'application/json'},
    // data in body
  body: JSON.stringify({"name": user.name})
}
  fetch('http://localhost:8080/delete', fetchOptions)
  .then(() => {
            console.log("Sucessfull Delete " + user.name)
            handleFetch()
            })

};


  return (
    <div className="App">

    <h1>Enter Climbing Crag Details</h1>

    {data.map(user => (
    <p>{user.name}
     <button onClick={() => handleDelete(user)}>Delete</button></p>
    
    ))}

    <form>
      <label>Crag Name</label>
      <input type="text" onChange={(e) => setInput(e.target.value)}/>
      <label>Crag Description</label>
      <input type="text" onChange={(e) => setInput(e.target.value)}/>
      <label>Crag location</label>
      <input type="text" onChange={(e) => setInput(e.target.value)}/>
      <label>Crag Approach</label>
      <input type="text" onChange={(e) => setInput(e.target.value)}/>
      <label>Crag Image</label>
      <input type="text" onChange={(e) => setInput(e.target.value)}/>



      <button onClick={handleSubmit}>Create Crag</button>
    </form>
    </div>
  );
}

export default App;
