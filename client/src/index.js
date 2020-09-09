import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App.js'
import IssueProvider from './context/IssueProvider'
import UserProvider from './context/UserProvider.js'
import CommentsProvider from './context/CommentsProvider'
import './style.css'


ReactDOM.render(
  <BrowserRouter>
    <CommentsProvider>
      <IssueProvider>
        <UserProvider>
          <App/>
        </UserProvider>
      </IssueProvider>
    </CommentsProvider>
  </BrowserRouter>, 
  document.getElementById('root')
)