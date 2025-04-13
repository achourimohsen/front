import React from 'react'
import './admin.css'
import { NavLink } from 'react-router-dom'

const AdminSidebar = () => {
    return (
        <section className="admin-sidebar">

            <NavLink to="/admin-dashboard" className='admin-sidebar-title'>
                <i className="bi bi-columns"></i>
                Dashboard
            </NavLink>

            <ul className="admin-dashboard-list">
                <NavLink className='admin-sidebar-link' to="/admin-dashboard/users-table">
                    <i className="bi bi-person"></i>
                    Users
                </NavLink>

                <NavLink className='admin-sidebar-link' to="/admin-dashboard/reports-table">
                    <i className="bi bi-file-post"></i>
                    Reports
                </NavLink>

                <NavLink className='admin-sidebar-link' to="/admin-dashboard/categories-table">
                    <i className="bi bi-tag-fill"></i>
                    Category
                </NavLink>

                <NavLink className='admin-sidebar-link' to="/admin-dashboard/comments-table">
                    <i className="bi bi-chat-left-text"></i>
                    comments
                </NavLink>
            </ul>
        </section>
  )
}

export default AdminSidebar