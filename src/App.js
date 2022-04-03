import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Stack from 'react-bootstrap/Stack';
import piper from './piper.png';
// import raw from './nyse.txt';
// import TextField from '@mui/material/TextField';
const API_URL = "http://localhost:5002/stockington-4ffbd/us-central1/sec"

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
  let [report, setReport] = useState([]);
  let [notify, setNotify] = useState(false);
  let [number, setNumber] = useState("");

  let [noun, setNoun] = useState("");
  let [adj, setAdj] = useState("");
  let [verb, setVerb] = useState("");
  let [place, setPlace] = useState("");
  let [event, setEvent] = useState("");


  let fetchAI = (event) => {
    // event.preventDefault()

    let body = {
      ticker
    }

    let headers = {
      "Content-Type": "text/plain"

    }
    console.log(ticker)
    setSpinner(true)
    .then(res =>{
      console.log('hi');
      console.log(res.data);
      setReport(res.data.split("\n"));
      setSpinner(false)
    })
    .catch(err => {
      console.log('bye')
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
        <h4 className="text-light">Enter 5 words to get a <text style={{color: "#00FFC6"}}>fun story</text> with the help of the <text style={{color: "#00FFC6"}}>secret</text> network</h4>
        <br/>
          <Form.Group className="mb-3" className = "input float-left"  controlId="formStockTicker" >
            <Form.Control placeholder="NOUN" onChange={event => {setNoun(event.target.value)}}/><br/>
            <Form.Control placeholder="VERB" onChange={event => {setVerb(event.target.value)}}/><br/>
            <Form.Control placeholder="ADJECTIVE" onChange={event => {setAdj(event.target.value)}}/><br/>
            <Form.Control placeholder="EVENT" onChange={event => {setEvent(event.target.value)}}/><br/>
            <Form.Control placeholder="PLACE" onChange={event => {setPlace(event.target.value)}}/>
          </Form.Group>
          <br></br>
          <div>
            <Button disabled className="mb-3" size="lg" variant="outline-danger" className="mybutton float-right" type="submit" onClick={(event) => {fetchAI(event)} }>
            Submit
          </Button>
          
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
        {report.map((value, index) => {
              return <div className="result" key={index}>{value}</div>
            })}
      </header>
      
    </div>
  );
}

export default App;
