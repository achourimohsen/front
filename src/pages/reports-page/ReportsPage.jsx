import React, { useEffect, useState } from 'react'
import ReportList from "../../components/reports/ReportList"
import Sidebar from "../../components/sidebar/Sidebar"
import { Pagination } from '../../components/pagination/Pagination'
import './report-page.css'
import { useDispatch, useSelector } from "react-redux"
import { fetchReports, getReportsCount } from "../../redux/apiCalls/reportApiCall"

const REPORT_PER_PAGE =  3

const ReportsPage = () => {
  const dispatch = useDispatch()
  const { reportsCount, reports } = useSelector(state => state.report)

  const [currentPage, setCurrentPage] = useState(1)
  const pages = Math.ceil(reportsCount / REPORT_PER_PAGE)
  

  useEffect(() => {
    dispatch(fetchReports(currentPage, REPORT_PER_PAGE))
    window.scroll(0, 0)
  }, [dispatch, currentPage])

  useEffect(() => {
    dispatch(getReportsCount())
  }, [dispatch])

  

  return (
    <div>
      <section className="reports-page">
        <ReportList reports={reports}/> 
        <Sidebar /> 
      </section>
      <Pagination
        pages={pages} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}

export default ReportsPage