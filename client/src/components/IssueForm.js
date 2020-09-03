import React, {useState} from 'react'
export default function IssueForm(props) {

  const inintInputs={title:'',description:''}

  const [inputs, setInput]=useState(inintInputs)

  
  
  function handleChange(e){
    const {name, value} = e.target
    setInput(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSubmit(e){
    e.preventDefault()
    props.addIssue(inputs)
    setInput(inintInputs)
  }


  const { title, description } = inputs
  return (
    <div>
       <form onSubmit={handleSubmit}>
          <input
            type="text" 
            name="title" 
            value={title} 
            onChange={handleChange} 
            placeholder='title'/>
             <input
            type="text" 
            name="description" 
            value={description} 
            onChange={handleChange} 
            placeholder='description'/>
          <button>Add post</button>
        </form>
    </div>
  )
}
