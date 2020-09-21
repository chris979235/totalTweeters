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




const [comments, setComments] = useState([])



 

  function getAllComments(){
    commentsAxios.get('/api/comments')
    .then(res=>{
      setComments(res.data)
    })
    .catch(err=>console.log(err))
  }

  function addComment(newComment){
  commentsAxios.post('/api/comments', newComment)
  .then(res => {
    console.log(res.data,'resdata')
    setComments( prevState=>(
    [ res.data, ...prevState]
    ))
  })
  .catch(err=> console.log(err))
  }
  console.log(comments,'comments')
  
  function deleteIssueComments(issueid){
    const issueComments=comments.filter(commentandissue => commentandissue.issue === issueid)
    console.log(issueComments,'issuecomments')
    issueComments.map(deleted => deleteComment(deleted._id))
  }


  function deleteComment(commentsid) {
    console.log(commentsid, 'comments id')
    commentsAxios
        .delete(`/api/comments/${commentsid}`)
        .then((res) => {
            setComments((prev) =>
              (
                comments.filter((comments) => comments._id !== commentsid)
              )
            );
        })
        .catch((error) => console.log(error));
  }


  return (
    <CommentsContext.Provider
      value={{
        comments,
        addComment,
        deleteComment,
        // getUserComments,
        // getCommentsByIssue,
        getAllComments,
        deleteIssueComments,
      }}>
      {props.children}
      </CommentsContext.Provider>
  )
}



