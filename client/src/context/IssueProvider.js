import React, {useState, useCallback, useEffect} from 'react'
import axios from 'axios'

export const IssueContext=React.createContext()

export const issueAxios=axios.create()

issueAxios.interceptors.request.use(config =>{
  const token=localStorage.getItem("token")
  config.headers.Authorization=`Bearer ${token}`
  return config
})

const initInputs = {
  title: "",
  description: "",
}

 export default function IssueProvider(props) {
 
  
  const [issues, setIssues]=useState(initInputs)
  const [votedUp, setVotedUp]=useState(0)
  const [votedDown, setVotedDown]=useState(0)
  console.log(issues,787878)


  const getIssues = useCallback(() => {
    issueAxios
    .get("/api/issue")
    .then((res,) => {
      setIssues(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, [])
  
useEffect(()=>{
  getIssues()
},[])

function addIssues(...newIssues){
  issueAxios.post("/api/issue", newIssues)
    .then(res => {
      console.log(res.data)
      setIssues(prevState => ({
        ...prevState,
        issues: [prevState, res.data]
      }))
    })
    .catch(err => console.log(err))
}


function voteUp(issueid){
  issueAxios
  .put(`/api/issue/upvote/${issueid}`)
  .then((res,) => {
    setVotedUp( prev =>{  
     const foundIssue= prev.findIndex((issue) => issue._id===issueid) 
     const edditedObject={...prev[foundIssue], upvote: res.data.upvote}
     const begining = prev.slice(0, foundIssue)
     const ending = prev.slice(foundIssue +1)
     return [...begining, edditedObject, ...ending]
    }
    );
  })
  .catch((err) => {
    console.log(err);
  });
}

function voteDown(issueid){
  issueAxios
  .put(`/api/issue/downvote/${issueid}`)
  .then((res,) => {
    setVotedDown( prev =>{  
     const foundIssue= prev.findIndex((issue) => issue._id===issueid) 
     const edditedObject={...prev[foundIssue], downvote: res.data.downvote}
     const begining = prev.slice(0, foundIssue)
     const ending = prev.slice(foundIssue +1)
     return [...begining, edditedObject, ...ending]
    }
    );
  })
  .catch((err) => {
    console.log(err);
  });
}


  return (
    <IssueContext.Provider
    value={{
      issues,
      voteUp,
      voteDown,
      getIssues,
      addIssues,
    }}>
    {props.children}
    </IssueContext.Provider>
)
}

