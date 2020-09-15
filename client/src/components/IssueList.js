import React, {useContext, useEffect} from 'react'
import {IssueContext} from '../context/IssueProvider'
export default function IssueList(props) {
const {deleteIssue}=useContext(IssueContext)
console.log(props,'propssss')

  
  return (
    <div className='issuelist'>
         <h1>title: {props.issues.title}</h1> 
         <h2>description: {props.issues.description}</h2>
         <button onClick={()=> deleteIssue(props.issues._id)}> delete</button>
    </div>
  )
}


