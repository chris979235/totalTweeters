import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App.js'
import IssueProvider from './context/IssueProvider'
import UserProvider from './context/UserProvider.js'
import './style.css'

ReactDOM.render(
  <BrowserRouter>
    <IssueProvider>
      <UserProvider>
        <App/>
      </UserProvider>
    </IssueProvider>
  </BrowserRouter>, 
  document.getElementById('root')
)