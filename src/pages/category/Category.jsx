import React, { useEffect } from 'react'
import "./category.css"
import { Link, useParams } from 'react-router-dom'
import ReportList from '../../components/reports/ReportList'
import { useDispatch, useSelector } from "react-redux"
import { fetchReportsBasedOnCategory } from '../../redux/apiCalls/reportApiCall'


const Category = () => {
  const dispatch = useDispatch()

  const { category } = useParams()
  const { reportsCate } = useSelector(state => state.report)

  useEffect(() => {
    dispatch(fetchReportsBasedOnCategory(category))
    window.scrollTo(0, 0)
  }, [category, dispatch])

  return (
    <section className="category">
      {reportsCate && reportsCate.length === 0 ? (
        <>
          <h1 className="category-not-found">
            reports with
            <span>{category}</span>Category Not Found
          </h1>
          <Link
            to="/reports"
            className='category-not-found-link'>
            Go to reports page
          </Link>
        </>
      ) : (
        <>
          <h1 className="category-title">
            reports based on {category}
            </h1>
          <ReportList reports={reportsCate} />
        </>
      )}
    </section>
  )
}

export default Category

