import React, {useContext} from 'react'
import {IssueContext} from '../context/IssueProvider'
import CommentsForm from './CommentsForm'

export default function IssueDisplay(props) {
  const {voteUp, voteDown}=useContext(IssueContext)
  console.log(props.issue,'issue')

  return (
    <div className='issuegridcontainer'>
        <h1 className='halved'>{props.issue.title}: {props.issue.description}</h1> 
          <div className='commentsform'>
            {<CommentsForm issue={props.issue} />}
          </div>
          <div className='dived'>
            <button className='butt2' onClick={()=>voteUp(props.issue._id)}>voteup{props.issue.upvote}</button>
            <button className='butt1' onClick={()=>voteDown(props.issue._id)}>votedown:{props.issue.downvote}</button>
          </div>
    </div>
  )
}
