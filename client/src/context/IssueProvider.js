import React, {useState, useCallback, useEffect} from 'react'
import axios from 'axios'

export const IssueContext=React.createContext()

export const issueAxios=axios.create()

issueAxios.interceptors.request.use(config =>{
  const token=localStorage.getItem("token")
  config.headers.Authorization=`Bearer ${token}`
  return config
})

const initInputs = []


 export default function IssueProvider(props) {
 
  
  const [issues, setIssues]=useState(initInputs)
  
  console.log(issues,777)

  function getUserIssues(){
    issueAxios.get("/api/issue/user")
      .then(res => {
        setIssues(
          res.data
       )
      })
      .catch(err => console.log(err.response.data.errMsg))
  }

  function getAllIssues(){
    issueAxios.get('/api/issue')
    .then(res => {
      setIssues(
         res.data
      )
    })
    .catch(err => console.log(err.response.data.errMsg))
}

  

function addIssue(newIssues){
  issueAxios.post("/api/issue", newIssues)
    .then(res => {
      setIssues(prevState => [...prevState, res.data])
    })
    .catch(err => console.log(err))
}
//

function voteUp(issueid){
  issueAxios
  .put(`/api/issue/upvote/${issueid}`)
  .then((res,) => {
    setIssues(prev=>{
      console.log(prev,888)
    const issueIndex=prev.findIndex(issue=>issue._id===issueid)
    const newObject={...prev[issueIndex], upvote: res.data.upvote}
    const newIssues=[...prev]
    newIssues.splice(issueIndex,1,newObject)
    return newIssues
  })
  })
  .catch((err) => {
    console.log(err);
  });
}

function voteDown(issueid){
  issueAxios
  .put(`/api/issue/downvote/${issueid}`)
  .then((res,) => {
    setIssues(prev=>{
      console.log(prev,888)
    const issueIndex=prev.findIndex(issue=>issue._id===issueid)
    const newObject={...prev[issueIndex], downvote: res.data.downvote}
    const newIssues=[...prev]
    newIssues.splice(issueIndex,1,newObject)
    return newIssues
  })
  })
  .catch((err) => {
    console.log(err);
  });
}


  return (
    <IssueContext.Provider
    value={{
      voteUp,
      voteDown,
      getUserIssues,
      getAllIssues,
      addIssue,
      issues,
    }}>
    {props.children}
    </IssueContext.Provider>
)
}

