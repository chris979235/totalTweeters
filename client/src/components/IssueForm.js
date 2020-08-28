import React, {useState} from 'react'

export default function IssueForm(props) {

  const [input, setInput]=useState({title:'',description:''})


  function handleSubmit(e){
    e.preventDefault()
    props.addIssues({title: input.title, description: input.description})
    setInput('')
  }
  function handleChange(e){
    const {name, value}=e.target
    setInput(prevInputs=> ({...prevInputs,[name]:value}))
  }

  return (
    <div>
          create a post 
       <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="title" 
            value={input.title} 
            onChange={handleChange} 
            placeholder='title'/>
             <input 
            type="text" 
            name="description" 
            value={input.description} 
            onChange={handleChange} 
            placeholder='description'/>
          <button>Add title</button>
        </form>
    </div>
  )
}
