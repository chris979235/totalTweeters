import React, {useState,useContext} from 'react'
import {IssueContext} from '../context/IssueProvider'
import CommentsForm from './CommentsForm'

export default function IssueDisplay(props) {
  const {voteUp, voteDown}=useContext(IssueContext)
  

  return (
    <div>
   <h1>{props.issues.title} {props.issues.description}</h1> 
  <button onClick={()=>voteDown(props.issues._id)}>votedown:{props.issues.downvote}</button>
  <button onClick={()=>voteUp(props.issues._id)}>voteup{props.issues.upvote}</button>
  </div>
  )
}
