import React, {useContext, useEffect} from 'react'
import IssueDisplay from './IssueDisplay'
import CommentDisplay from './CommentDisplay'
import CommentsForm from './CommentsForm'
import { IssueContext } from '../context/IssueProvider'

export default function Public(){

const {getAllIssues, issues}=useContext(IssueContext)

useEffect(()=>{
getAllIssues()
},[])

  return (
    <div className="public">
      {issues.sort((a,b) => b.upvote-a.upvote).map(issues => <IssueDisplay issues={issues} key={issues._id} />)}
      {issues.map(issue=><CommentsForm issue={issue}/>)}
      <CommentDisplay />
    </div>
  )
}
