import React, {useContext, useEffect} from 'react'
import IssueDisplay from './IssueDisplay'
import { IssueContext } from '../context/IssueProvider'

export default function Public(){

const {getAllIssues, issues}=useContext(IssueContext)

useEffect(()=>{
getAllIssues()
},[])

  return (
    <div className="public">
      {issues.sort((a,b) => b.upvote-a.upvote).map(issues => <IssueDisplay issues={issues} />)}
    </div>
  )
}
{/* <IssueDisplay issues={issues}/> */}
// {issues.sort((a,b) => b.upvote-a.upvote).map(issue => <IssueList issue={issue}  />)}