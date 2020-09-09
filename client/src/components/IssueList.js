import React from 'react'
export default function IssueList(props) {
console.log(props,3333333)
  
  return (
    <div className='issuelist'>
         <h1>title: {props.issues.title}</h1> 
         <h2>description: {props.issues.description}</h2>
    </div>
  )
}


