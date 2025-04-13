import React, { useState } from 'react'
import "./comment-list.css"
import Swal from 'sweetalert2';
import UpdateCommentModel from './UpdateCommentModel';
import Moment from "react-moment"
import { useDispatch, useSelector } from "react-redux"
import { deleteComment } from '../../redux/apiCalls/commentApiCall';

const CommentList = ({ comments }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const [updateComment, setUpdateComment] = useState(false)
  const [commentForUpdate, setCommentForUpdate] = useState(null)

  // Update comment Handler
  const updateCommentHandler = (comment) => {
    setCommentForUpdate(comment)
    setUpdateComment(true)
  }
  
  //   Delete Report Handler 
  const commentDeleteHandler = (commentId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    }).then((isOk) => {
      if (isOk.isConfirmed) {
        dispatch(deleteComment(commentId))
      }
    });
  }


  return (
    <div className="comment-list">
      <h4 className="comment-list-count">{comments?.length} Comments</h4>
      {comments?.slice().reverse().map((comment) => (
        <div key={comment._id} className="comment-item">
          <div className="comment-item-info">
            <div className="comment-item-username">
              {comment.username}
            </div>

            <div className="comment-item-time">
              <Moment fromNow ago>
                {comment.createdAt}
              </Moment>{" "} ago
            </div>
          </div>

          <p className="comment-item-text">
            {comment.text}
          </p>

          {
            user?._id === comment.user && (
              <div className="comment-item-icon-wrapper">
                <i 
                onClick={() => updateCommentHandler(comment)}
                className="bi bi-pencil-square"></i>
                <i 
                onClick={() => commentDeleteHandler(comment?._id)} 
                className="bi bi-trash-fill"></i>
              </div>
            )
          }

        </div>
      ))}
      {updateComment && (
        <UpdateCommentModel
          commentForUpdate={commentForUpdate}
          setUpdateComment={setUpdateComment}
        />
      )}
    </div>
  )
}

export default CommentList