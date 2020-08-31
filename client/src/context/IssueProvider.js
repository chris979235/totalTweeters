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
posted: [], 
votedUp:0,
votedDown:0
}

 export default function IssueProvider(props) {
 
  
  const [issues, setIssues]=useState(initInputs)
  const [upvote, setVotedUp]=useState(0)
  const [downvote, setVotedDown]=useState(0)
  console.log(issues,787878)


  function getUserIssues(){
    issueAxios.get("/api/issue/user")
      .then(res => {
        setIssues(prevState => ({
          ...prevState,
          posted: res.data
        }))
      })
      .catch(err => console.log(err.response.data.errMsg))
  }

  

function addIssue(newIssues){
  issueAxios.post("/api/issue", newIssues)
    .then(res => {
      setIssues(prevState => {
        return {
        ...prevState,
        posted: [...prevState.posted, res.data]
      }
    })
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
      ...issues,
      voteUp,
      voteDown,
      getUserIssues,
      addIssue,
    }}>
    {props.children}
    </IssueContext.Provider>
)
}

