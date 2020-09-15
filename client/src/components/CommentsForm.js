import React, {useState, useContext} from 'react'
import CommentList from './CommentList'
import {CommentsContext} from '../context/CommentsProvider'



export default function CommentsForm(props) {
  const{addComment, deleteComment, comments}=useContext(CommentsContext)
 
  const [text, setText] = useState('')
  const [toggle, setToggle]= useState(true)

  console.log(toggle,'toggle')
  
  function toggled(){
    setToggle(toggle===true?false:true)
  }

  const handleChange = e => {
    setText(e.target.value)
  }
  // function handleChange(e){
  //   const {name, value} = e.target
  //   setInput(prevInputs => ({
  //     ...prevInputs,
  //     [name]: value
  //   }))
  // }

  const handleSubmit = (e) => {
    e.preventDefault()
    addComment({text, issue: props.issue._id})
    setText('')
  }

  
  return (
    <div>
      { toggle ?
          <div>
         {comments.filter(comment=>props.issue._id===comment.issue).map
           (comment=><CommentList comment={comment} deleteComment={deleteComment} key={comment._id}/>)}
           <button onClick={() => toggled()} className='addbutton'>Add Comment</button>
         </div>
        :
       <form onSubmit={handleSubmit}>
          <input
            type="text" 
            name="text" 
            value={text} 
            onChange={handleChange} 
            placeholder={props.issue.description}/>
          <button className='buttons'>submit</button>
          <button onClick={ () => toggled()} className='buttons'>close</button>
        </form>
        }
    </div>
  )
}
