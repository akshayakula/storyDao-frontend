import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Stack from 'react-bootstrap/Stack';
import piper from './storyDao.png';
import axios from 'axios';
// import raw from './nyse.txt';
// import TextField from '@mui/material/TextField';
const API_URL = "http://96d9-71-167-234-173.ngrok.io/openai";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {
  let [ticker, setTicker] = useState("");
  let [spinner, setSpinner] = useState(false);
  
  let [validation, setValidation] = useState(true);
  let [report, setReport] = useState("");
  let [notify, setNotify] = useState(false);
  let [number, setNumber] = useState("");

  let [noun, setNoun] = useState("");
  let [adj, setAdj] = useState("");
  let [verb, setVerb] = useState("");
  let [place, setPlace] = useState("");
  let [thingy, setThingy] = useState("");

  let fetchAI = async (event) => {
      event.preventDefault();
    // const API_URL = "http://96d9-71-167-234-173.ngrok.io/openai";
      const API_URL = "http://localhost:5003/openai";


    let body = {
      noun: noun,
      adj: adj,
      verb: verb,
      place: place,
      thingy: thingy
    }

    // let headers ={
    //   "Content-Type": "text/plain"
    // }

    console.log(body)

    axios.post(API_URL, body).then( async (r) => {
      console.log(r.data)
      
      setReport(r.data);
  
      console.log("fetchAI called");
      await axios.get("http://localhost:5004/init")
  
  
      console.log("posting");
      await axios.post("http://localhost:5004/write", body)
  
      await axios.get("http://localhost:5004/read", body)
    })
    .catch(err => {
      console.log(err)
    })


  } 

  let sendNum = () => {

  }

  let validateTicker = (event) => {
    // event.preventDefault()
    if(stocks.lookup(ticker) === null){
      setValidation(false);
    }
    else{
      setValidation(true)
    }

  }

  return (
    <div className="App">
      <header className="App-header">
        <br></br>
        <br></br>
        <img src={piper} className="img-fluid logo" alt="image"></img>
        <br></br>
        <h1><text></text>Story <text style={{color: "#00FFC6"}}>DAO</text></h1>
        <h4 className="text-light">Enter 5 words to get a <text style={{color: "#00FFC6"}}>fun story</text> with the help of the <text style={{color: "#00FFC6"}}>Hedara</text> network</h4>
        <br/>
          <Form.Group className="mb-3" className = "input float-left"  controlId="formStockTicker" >
            <Form.Control placeholder="NOUN" onChange={event => {setNoun(event.target.value)}}/><br/>
            <Form.Control placeholder="VERB" onChange={event => {setVerb(event.target.value)}}/><br/>
            <Form.Control placeholder="ADJECTIVE" onChange={event => {setAdj(event.target.value)}}/><br/>
            <Form.Control placeholder="EVENT" onChange={event => {setThingy(event.target.value)}}/><br/>
            <Form.Control placeholder="PLACE" onChange={event => {setPlace(event.target.value)}}/>
          </Form.Group>
          <br></br>
          <div>
          
          </div>
          <div className='notify'><Button className="mb-3" size="lg" variant="outline-success" className="mybutton float-right" type="submit" onClick={(event) => {fetchAI(event)} }>
              Submit
              </Button>

          </div>
          <br></br>
          {notify ?<Form.Group className="mb-3" className = "input float-left"  controlId="formStockTicker" ><Form.Control placeholder="Enter Your Phone Number Ex. +(123)-456-7893"/></Form.Group>: null}

        <br></br>
        <br></br>
    
        <Stack direction="horizontal" className="justify-content-center" gap={3}>
          {spinner ? <Spinner className="loader" animation="grow" variant="light" /> : null }
          {spinner ? <Spinner className="loader" animation="grow" variant="light" /> : null }
          {spinner ? <Spinner className="loader" animation="grow" variant="light" /> : null }
        </Stack>
        {/* {report.map((value, index) => {
              return <div className="result" key={index}>{value}</div>
            })} */}
            {report}
      </header>
      
    </div>
  );
}

export default App;
