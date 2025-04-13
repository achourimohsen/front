import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import { Link } from 'react-router-dom'
import './admin-table.css'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from "react-redux"
import { deleteProfile, getAllUsersProfile } from '../../redux/apiCalls/profileApiCall'

const UsersTable = () => {
    const dispatch = useDispatch()
    const { profiles, isProfileDeleted } = useSelector(state => state.profile)
    const { usersCount } = useSelector(state => state.profile)

    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        dispatch(getAllUsersProfile())
    }, [dispatch, isProfileDeleted])

    // Delete User Handler 
    const deleteUserHandler = (userIds) => {
        const ids = Array.isArray(userIds) ? userIds : [userIds];

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this user!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                ids.forEach(id => dispatch(deleteProfile(id)))
                setSelectedUsers([])
            }
        });
    }

    const handleCheckboxChange = (userId) => {
        setSelectedUsers(prev => 
            prev.includes(userId) 
            ? prev.filter(id => id !== userId) 
            : [...prev, userId]
        );
    }
    
    return (
        <section className="table-container">
            <AdminSidebar />
            <div className="table-wrapper">
                <h1 className="table-title">Users</h1>
                <h3 style={{direction: "ltr"}}>{usersCount} Users</h3>

                <button 
                    disabled={!selectedUsers.length}
                    onClick={() => deleteUserHandler(selectedUsers)}
                >
                    Delete Selected Users
                </button>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>Count</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {profiles?.slice().reverse().map((item, index) => (
                            <tr key={item._id} >
                                
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedUsers.includes(item._id)}
                                        onChange={() => handleCheckboxChange(item._id)}
                                    />
                                </td>
                                <td>{index + 1}</td>

                                <td>
                                    <div className="table-image">
                                        <img
                                            src={item.profilePhoto?.url}
                                            alt=""
                                            className='table-user-image'
                                        />
                                        <span className='table-username'>
                                            {item.username}
                                        </span>
                                    </div>
                                </td>
                                <td>{item.email}</td>
                                <td>
                                    <div className="table-button-group">
                                        <button>
                                            <Link to={`/profile/${item._id}`}>
                                                View Profile
                                            </Link>
                                        </button>
                                        <button 
                                        onClick={() => deleteUserHandler(item._id)}
                                        >
                                            Delete
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

export default UsersTable
