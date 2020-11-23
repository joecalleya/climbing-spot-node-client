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

const handlesSubmit = (climbingCrag) => {
  console.log("form inputs test",climbingCrag.name);
  const 
    fetchOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'},
      // data in body
      body: JSON.stringify({climbingCrag})
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

const handleDelete = (location) => {
    // make a delete request
    const 
    fetchOptions = {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'},
      // data in body
    body: JSON.stringify({"name": location.name})
  }
    fetch('http://localhost:8080/delete', fetchOptions)
    .then(() => {
              console.log("Sucessfull Delete " + location.name)
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

    {data.map(location => (
    <p>{location.climbingCrag.name}
     <button onClick={() => handleDelete(location)}>Delete</button></p>
    
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
