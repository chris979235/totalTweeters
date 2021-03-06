import React, {useContext, useEffect} from 'react'
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
    addIssue, 
    getUserIssues,
    issues,
  } = useContext(IssueContext)

  useEffect(()=>{
    getUserIssues()
  },[])

  return (
    <>
    <div className="profile">
          <div className='issuegrid'>
            <p className="yourissues">Your Issues</p>
            {issues.sort((a,b) => b.upvote-a.upvote).map(issues => <IssueList issues={issues} key={issues._id}/>)}
            </div>  
      <div className='gridcontainer'>
        <h1>Welcome @{username}!</h1>
        <h3>create a post</h3>
          <div className='issueformholder'>
              <IssueForm addIssue={addIssue}/>
          </div>
      </div>
  </div>
  </>
  )
}
