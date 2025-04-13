import React, { useEffect } from 'react'
import "./sidebar.css"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '../../redux/apiCalls/categoryApiCall'
import Dashboard from '../../pages/home/Dashboard'
import Portfolio from './Portfolio'

const Sidebar = () => {
    const dispatch = useDispatch()
    const { categories } = useSelector(state => state.category)

    useEffect(() => {
        dispatch(fetchCategories())
    },[])

    return (
        <div className="sidebar">
            <h5 className="sidebar-title">Catégories</h5>
            <ul className="sidebar-links">
                {categories.map((category) =>(
                    <Link
                        className='sidebar-link'
                        key={category._id}
                        to={`/reports/categories/${category.title}`}
                    >
                        {category.title}
                    </Link>
                ))}
            </ul>

            
           <Dashboard />     
           <Portfolio />
        </div>
    )
}

export default Sidebar