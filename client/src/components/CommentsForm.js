import React, {useState, useContext, useEffect} from 'react'
import CommentList from './CommentList'
import {CommentsContext} from '../context/CommentsProvider'



export default function CommentsForm(props) {
  const{addComment, deleteComment,  comments}=useContext(CommentsContext)
 
  const [inputs, setInput] = useState({text:''})
  
  console.log(comments,'comments')

  //
  

  const handleChange = e => setInput(e.target.value)


  const handleSubmit = (e) => {
    e.preventDefault()
    addComment({text: inputs, issue: props.issue._id})
    setInput({text:''})
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
            placeholder={props.issue.description}/>
          <button>Add Comment</button>
        </form>
        {comments.filter(comment=>props.issue._id===comment.issue).
        map(comment=><CommentList comment={comment} deleteComment={deleteComment}/>)}
    </div>
  )
}
