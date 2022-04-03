import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import PieChartFull from "./PieChartFull";
import { PieChart } from "react-minimal-pie-chart";

import { Button, Box, TextField, Stack } from "@mui/material";
var randomColor = require('randomcolor'); 

function App() {




  const [name, setName] = useState("");
  const [tokens, setTokens] = useState("");
  const [time, setTime] = useState("");
  const [tokenArr, setTokenArr] = useState([10,10,10]);
  const [data1, setData1] = useState([
    { title: "Joe", value: 10, color: "#E38627" },
    { title: "Bob", value: 10, color: "black" },
    { title: "Billy", value: 10, color:  "teal" },
  ]);
  const [data2, setData2] = useState([
    { title: "Joe", value: 100, color: "#E38627" },
    { title: "Bob", value: 100, color: "black" },
    { title: "Billy", value: 100, color: "teal" },
  ]);

  const onSubmit = () =>{
    const randColor = randomColor({
      luminosity: 'dark'});
    
    setTokenArr([...tokenArr, tokens]);
    
    setData1([...data1,{title: name, value: Number(tokens), color: randColor}]);
    const timeValue = calculateTimeValue(Number(tokens),Number(time));
    setData2([...data2,{title: name, value: timeValue, color: randColor}]);

    setName("");
    setTokens("");
    setTime("")

  }
  const calculateTimeValue = (tokens,time) =>{
      return tokens * time;
  }


  return (
    <div className="App">
      <header className="App-header">
        <div className="charts">
          <PieChartFull data={data1} title="Normal Voting" tokenArr={tokenArr}/>
          <PieChartFull data={data2} title="Time-Accrued Voting" tokenArr={tokenArr} timeElapsed={true} />
        </div>
        <div className="Box">
          <Box
            noValidate
            autoComplete="off"
            sx={{ border: "1px solid", borderColor: "#c2ccff", width: "300px", padding: "50px", backgroundColor:"#d5dbf7" }}
          >
            <Stack spacing={2}>
              <TextField label="Name" value={name} onChange={(e) =>{
                setName(e.target.value);
              }}/>
              <TextField label="Tokens Held" 
              value={tokens}
              onChange={(e) =>{
                setTokens(e.target.value);
              }}/>
              <TextField label="Time Accrued (seconds)"
              value={time}
              onChange={(e) =>{
                setTime(e.target.value)
              }} />
              <Button variant="contained" onClick={onSubmit}> Vote! </Button>
            </Stack>
          </Box>
 
        </div>
      </header>
    </div>
  );
}

export default App;
