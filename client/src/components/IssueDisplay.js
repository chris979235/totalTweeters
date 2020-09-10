import React, {useContext} from 'react'
import {IssueContext} from '../context/IssueProvider'

export default function IssueDisplay(props) {
  const {voteUp, voteDown}=useContext(IssueContext)
  

  return (
    <div className='issuegridcontainer'>
      <div className='dived'>
        <button className='butt1' onClick={()=>voteDown(props.issues._id)}>votedown:{props.issues.downvote}</button>
        <button className='butt2' onClick={()=>voteUp(props.issues._id)}>voteup{props.issues.upvote}</button>
      </div>
        <h1 className='halved'>{props.issues.title} {props.issues.description}</h1> 
        
  </div>
  )
}
