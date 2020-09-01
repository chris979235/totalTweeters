import React from 'react'

export default function IssueList(props) {
console.log(props,3333333)
  
  return (
    <div>
         <h1>{props.issues.title} {props.issues.description}</h1> 
    </div>
  )
}