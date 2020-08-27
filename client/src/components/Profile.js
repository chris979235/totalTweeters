import React, { useContext } from 'react'
import IssueForm from './IssueForm.js'
import IssueList from './IssueList.js'
import IssueDisplay from './IssueDisplay.js'
import { UserContext } from '../context/UserProvider.js'

export default function Profile(){
  const { 
    user: { 
      username 
    }, 
    addTodo, 
    todos 
  } = useContext(UserContext)

  return (
    <div className="profile">
      <h1>Welcome @{username}!</h1>
      <h3>Add A Todo</h3>
      <IssueForm addTodo={addTodo}/>
      <h3>Your Todos</h3>
      <IssueList todos={todos}/>
    </div>
  )
}