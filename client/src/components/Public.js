import React, {useContext, useEffect} from 'react'
import IssueDisplay from './IssueDisplay'
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
    <div className='maincontainer'>
      <div className="issuecontainer1">
        {issues.sort((a,b) => b.upvote-a.upvote).map(issue => <IssueDisplay issue={issue} key={issue._id} />)}
      </div>
    </div>
      
  )
}
