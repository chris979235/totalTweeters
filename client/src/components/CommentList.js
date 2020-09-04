import React, {useContext} from 'react'
import {UserContext} from '../context/UserProvider'
export default function CommentList(props) {
  const {user: { 
    username 
  }
}=useContext(UserContext)
  console.log(334455,props)
  return (
    <div>
      <p>@{username}</p>
{props.comment.text}
    </div>
  )
}
