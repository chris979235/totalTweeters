import React, { useState, useContext } from 'react'
import AuthForm from './AuthForm.js'
import styled from 'styled-components'
import { UserContext } from '../context/UserProvider.js'

const initInputs = { username: "", password: "" }

export default function Auth(){
  const [inputs, setInputs] = useState(initInputs)
  const [toggle, setToggle] = useState(false)

  const { signup, login, errMsg, resetAuthError} = useContext(UserContext)

  function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSignup(e){
    e.preventDefault()
    signup(inputs)
  }

  function handleLogin(e){
    e.preventDefault()
    login(inputs)
  }

  function toggleForm(){
    setToggle(prev => !prev)
    resetAuthError()
  }

  return (
    <Div className="auth-container"> 
        <Intro>Welcome to TotalTweeters a place to create and talk about anything you want. 
          get in touch with like minded individuals and share stories or complaints about your life.</Intro>
      <h1> Total Tweeters</h1>
      { !toggle ?
        <>
          <AuthForm 
            handleChange={handleChange}
            handleSubmit={handleSignup}
            inputs={inputs}
            btnText="Sign up"
            errMsg={errMsg}
          />
          <Button onClick={toggleForm}>Already a member?</Button>
        </>
      :
        <>
          <AuthForm 
            handleChange={handleChange}
            handleSubmit={handleLogin}
            inputs={inputs}
            btnText="Login"
            errMsg={errMsg}
            className="authform"
          />
          <Button onClick={toggleForm}>Not a member?</Button>
        </>
      }
    </Div>
  )
}

const Button = styled.p`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: rgb(128, 159, 255);
  margin: 0 1em;
  padding: 0.25em 1em;
`
const Div= styled.div`
  background: lightsalmon;
  border-radius: 3px;
  color: rgb(128, 159, 255);
  padding: 5em 1em;
`

const Intro=styled.h2`
width:300px;
margin-right:95vh;
margin-top:5em;
position:absolute;
font-size:25px;
`