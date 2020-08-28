import React, {useContext} from 'react'
import IssueForm from './IssueForm'
import IssueList from './IssueList'
import { UserContext } from '../context/UserProvider.js'
import { IssueContext } from '../context/IssueProvider'

export default function Profile() {
  const {user: { 
    username 
  }
}=useContext(UserContext)

  const { 
    addIssues, 
issues
  } = useContext(IssueContext)

  return (
    <div className="profile">
    <h1>Welcome @{username}!</h1>
    <h3>create a post</h3>
    <IssueForm addIssues={addIssues}/>
    <h3></h3>
    <IssueList issues={issues}/>
  </div>
  )
}
