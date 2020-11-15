import logo from './logo.svg';
import styles from './App.css';
import {useState, useEffect} from 'react';
import { useForm} from "react-hook-form";

// import axios from 'axios';

function App() {

  const[data, setData] = useState([]);
  const[input, setInput] = useState([]);
  const { register, handleSubmit, formState } = useForm([]);


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

const handlesSubmit = (formInputData) => {
  console.log("form inputs test",formInputData.name);
  // e.preventDefault()
  const 
    fetchOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'},
      // data in body
      body: JSON.stringify({formInputData})

    // body: JSON.stringify({"name": formInputData.name})
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

const onSubmit = (formInputDataArray) => {
  handlesSubmit(formInputDataArray)
  console.log(formInputDataArray);
}

  return (
    <div className="App">

    <h1>Enter Climbing Crag Details</h1>

    {data.map(user => (
    <p>{user.name}
     <button onClick={() => handleDelete(user)}>Delete</button></p>
    
    ))}

<form onSubmit={handleSubmit(onSubmit)}>
        <input ref={register} name="name" placeholder="Crag Name"/>
        <input ref={register} name="description" placeholder="Description" style={styles.input} />
        <input ref={register} name="location" placeholder="location" style={styles.input} />
        <input ref={register} name="approach" placeholder="Approach" style={styles.input} />
        <input ref={register} name="image" placeholder="Image" style={styles.input} />
        <button type="submit" disabled={formState.isSubmitting}>SUBMIT</button>
      </form>
    </div>
  );
}

export default App;
