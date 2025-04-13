import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import './admin-table.css'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from "react-redux"
import { deleteComment, fetchAllComments } from '../../redux/apiCalls/commentApiCall'

const CommentsTable = () => {
    const dispatch = useDispatch()
    const { comments } = useSelector(state => state.comment)

    const [selectedComments, setSelectedComments] = useState([]);

    useEffect(() => {
        dispatch(fetchAllComments())
    }, [dispatch])

    // Delete Report Handler 
    const deleteCommentsHandler = (commentIds) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert these comments!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete them!"
        }).then((result) => {
            if (result.isConfirmed) {
                commentIds.forEach(id => dispatch(deleteComment(id)));
                setSelectedComments([]);
            }
        });
    }
    

    const handleCheckboxChange = (commentId) => {
        setSelectedComments(prev => 
            prev.includes(commentId) 
            ? prev.filter(id => id !== commentId) 
            : [...prev, commentId]
        );
    }
    
    return (
        <section className="table-container">
            <AdminSidebar />
            <div className="table-wrapper">
                <h1 className="table-title">Comments</h1>
                <h3 style={{direction: "ltr"}}>
                    {comments.length} Comments
                </h3>
                
                <button 
                    disabled={!selectedComments.length}
                    onClick={() => deleteCommentsHandler(selectedComments)}
                >
                    Delete Selected Comments
                </button>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>Count</th>
                            <th>User</th>
                            <th>Comments</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments?.slice().reverse().map((item, index) =>(
                            <tr key={item._id}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedComments.includes(item._id)}
                                        onChange={() => handleCheckboxChange(item._id)}
                                    />
                                </td>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="table-image">
                                        <img 
                                            src={item.user.profilePhoto?.url}
                                            alt="" 
                                            className='table-user-image'
                                        />
                                        <span className='table-username'>
                                            {item.user.username}
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    {item.text}
                                </td>
                                <td>
                                    <div className="table-button-group">
                                        <button 
                                            onClick={() => deleteCommentsHandler([item._id])}
                                        >
                                            Delete Comment
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
    
}

export default CommentsTable