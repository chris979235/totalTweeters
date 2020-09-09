import React, {useState, useContext} from 'react'
import {CommentsContext} from './CommentsProvider'
import {IssueContext} from './IssueProvider'
import axios from 'axios'

export const UserContext = React.createContext();

export const userAxios=axios.create()

userAxios.interceptors.request.use(config =>{
  const token=localStorage.getItem("token")
  config.headers.Authorization=`Bearer ${token}`
  return config
})

   export default function UserProvider(props) {
    const { getAllComments}=useContext(CommentsContext)
    const {getAllIssues}=useContext(IssueContext)
  const initState = {
    user: JSON.parse(localStorage.getItem('user')) || {},
    token: localStorage.getItem("token") || "",
    errMsg:"",
  }

 

  const [userState, setUserState]=useState(initState)
  console.log(userState,'userstate')

  function signup(credentials){
  axios.post("/auth/signup", credentials)
  .then(res => {
    const {user, token}=res.data
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))
     getAllComments()
    getAllIssues()
    setUserState(prevUserState =>({
      ...prevUserState,
      user,
      token
    }))
  })
  .catch(err => handleAuthError(err.response.data.errMsg))
  }

  function login(credentials){
    axios.post("/auth/login", credentials)
    .then(res => {
      const {user, token}=res.data
      localStorage.setItem("token",token)
      localStorage.setItem("user", JSON.stringify(user))
      getAllComments()
      setUserState(prevUserState =>({
        ...prevUserState,
        user,
        token,
      }))
    })
    .catch(err => handleAuthError(err.response.data.errMsg))
  }

 

  function handleAuthError(errMsg){
  setUserState(prevState =>({
    ...prevState, 
    errMsg
  }))
  }

  function resetAuthError(){
    setUserState(prevState => ({
      ...prevState, 
      errMsg:""
    }))
  }

  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log(localStorage,888)
    setUserState({
        user: {},
        token: "",
        comments: [],
    });
}
 

  

  

  


  return (
      <UserContext.Provider
      value={{
        ...userState,
        signup,
        login,
        resetAuthError,
        logOut,
      }}>
      {props.children}
      </UserContext.Provider>
  )
}
