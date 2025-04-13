import React, { useEffect } from 'react'
import AdminSidebar from './AdminSidebar'
import { Link } from 'react-router-dom'
import './admin-table.css'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from "react-redux"
import { getAllReports, deleteReport } from '../../redux/apiCalls/reportApiCall'

const ReportsTable = () => {
    const dispatch = useDispatch()
    const { reports } = useSelector(state => state.report)
    const { reportsCount } = useSelector(state => state.report)

    useEffect(() => {
        dispatch(getAllReports())
    }, [])

    // Delete Report Handler 
    const deleteReportHandler = (reportId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this report!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(deleteReport(reportId))
            }
          });
    }
  return (
    <section className="table-container">
        <AdminSidebar />
        <div className="table-wrapper">
            <h1 className="table-title">Reports</h1>
            <h3 style={{direction: "ltr"}}>{reportsCount} Reports</h3>
              <table className="table">
                <thead>
                    <tr>
                        <th>Count</th>
                        <th>User</th>
                        <th>Report Title</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {reports?.slice().reverse().map((item, index) =>(
                        <tr key={item._id}>
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
                            <td>{item.title}</td>
                            <td>
                                <div className="table-button-group">
                                    <button>
                                        <Link to={`/reports/details/${item._id}`}>
                                        View Report
                                        </Link>
                                    </button>
                                    <button 
                                    onClick={() => deleteReportHandler(item._id)}
                                    >
                                        Delete Report
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

export default ReportsTable