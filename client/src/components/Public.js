import React, {useContext, useEffect} from 'react'
import IssueDisplay from './IssueDisplay'
import CommentsForm from './CommentsForm'
import { IssueContext } from '../context/IssueProvider'
import {CommentsContext} from '../context/CommentsProvider'

export default function Public(){
 
const {getAllComments}=useContext(CommentsContext)

const {getAllIssues, issues}=useContext(IssueContext)
console.log(issues,'issues')
useEffect(()=>{
getAllIssues()
getAllComments()
},[])

  return (
    <div className="public">
      {issues.sort((a,b) => b.upvote-a.upvote).map(issues => <IssueDisplay issues={issues} key={issues._id} />)}
      {issues.map(issue=><CommentsForm issue={issue} />)}
    </div>
  )
}
