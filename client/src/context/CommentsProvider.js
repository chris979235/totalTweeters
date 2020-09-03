import React, {useState} from 'react'
import axios from 'axios'


export const CommentsContext = React.createContext();

export const commentsAxios=axios.create()

commentsAxios.interceptors.request.use(config =>{
  const token=localStorage.getItem("token")
  config.headers.Authorization=`Bearer ${token}`
  return config
})

export default function CommentsProvider(props) {
const [comments, setComments]=useState([])
console.log(comments,'comments')

  function getUserComments(titleid){
    commentsAxios.get(`/api/comments/${titleid}`)
    .then(res => {
      setComments(
         res.data
      )
    })
    .catch(err=> console.log(err.response.data.errMsg))
  }
  
  

  function addComment(newComment){
  commentsAxios.post('/api/comments', newComment)
  .then(res => {
    setComments( prevState=>(
     [...prevState, res.data]
    ))
  })
  .catch(err=> console.log(err))
  }

  


  function deleteComment(commentsid) {
    commentsAxios
        .delete(`/api/comments/${commentsid}`)
        .then((res) => {
            setComments((prev) =>
              ({
                ...prev,
                comments: prev.comments.filter((comments) => comments._id !== commentsid)
                })
            );
        })
        .catch((error) => console.log(error));
  }


  return (
    <CommentsContext.Provider
      value={{
        addComment,
        deleteComment,
        getUserComments,
      }}>
      {props.children}
      </CommentsContext.Provider>
  )
}



