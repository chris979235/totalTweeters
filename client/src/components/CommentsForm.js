import React, {useState, useContext, useEffect} from 'react'
import CommentDisplay from './CommentDisplay'
import {CommentsContext} from '../context/CommentsProvider'



export default function CommentsFom(props) {
  
  const [inputs, setInput] = useState('')
console.log(inputs,555566)

  const{addComment, deleteComment}=useContext(CommentsContext)

  

  const handleChange = e => setInput(e.target.value)


  const handleSubmit = (e) => {
    e.preventDefault()
    addComment({text: inputs, issue: props.issue._id})
    setInput('')
  }

  const { text} = inputs
  return (
    <div>
       <form onSubmit={handleSubmit}>
          <input
            type="text" 
            name="text" 
            value={text} 
            onChange={handleChange} 
            placeholder={props.issue.title}/>
          <button>Add Comment</button>
        </form>
    </div>
  )
}
