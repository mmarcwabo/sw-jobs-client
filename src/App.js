import React from 'react';
import './App.css';

import Jobs from './Jobs';
//API SetupT
const JOB_API_URL = 'http://localhost:3001/jobs';
//Data from API or DB

const mockJobs = [

  {title: 'SWE 1', company: 'Google', as: '80k'},
  {title: 'SWE 2', company: 'Facebook', as: '78k'},
  {title: 'DBM 1', company: 'Apple', as: '180k'},
  {title: 'SWE 3', company: 'Amazone', as: '100k'}
]

async function fetchJobs(upadteCB){
  const res = await fetch(JOB_API_URL);
  const json = await res.json();

  //Setting the value of joblist to the json response
  //here
  upadteCB(json)
  //console.log({json})
}

function App() {

  //
  const [jobList, upadteJobs] = React.useState([])
  React.useEffect(()=>{
    fetchJobs(upadteJobs);
  }, []);

  return (
    <div className="App">
        <Jobs jobs={jobList}/>
    </div>
  );
}

export default App;
