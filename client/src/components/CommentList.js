import React from 'react'
export default function CommentList(props) {
  console.log(props,'props')

return (
    <div>
{props.comment.text}
    </div>
  )
}
