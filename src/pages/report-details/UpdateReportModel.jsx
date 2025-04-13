import React, { useEffect, useState } from 'react'
import "./update-report.css"
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from "react-redux"
import { updateReport } from '../../redux/apiCalls/reportApiCall'
import { fetchCategories } from '../../redux/apiCalls/categoryApiCall'

const UpdateReportModel = ({ setUpdateReport, report }) => {
  const dispatch = useDispatch()
  const { categories } = useSelector(state => state.category)

  const [title, setTitle] = useState(report.title)
  const [description, setDescription] = useState(report.description)
  const [category, setCategory] = useState(report.category)

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault()               
    if (title.trim() === "") return toast.error("Report Title is required")
    if (description.trim() === "") return toast.error("Report description is required")
    if (category.trim() === "") return toast.error("Report category is required")

    dispatch(updateReport({ title, category, description }, report?._id))
    setUpdateReport(false)
  }

  useEffect(() => {
    dispatch(fetchCategories())
  })


  return (
    <div className="update-report">
      <form onSubmit={formSubmitHandler} className="update-report-form">

        <abbr title="close">
          <i
            onClick={() => setUpdateReport(false)}
            className="bi bi-x-circle-fill update-report-form-close">
          </i>
        </abbr>

        <h1 className="update-report-title">Update Report</h1>
        <input
          type="text"
          className="update-report-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          name="" id=""
          className="update-report-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option disabled value="">Select a category</option>
          {
            categories.map(category => (
              <option key={category._id} value={category.title} >
                {category.title}
              </option>
            ))
          }
        </select>

        <textarea
          className='update-report-textarea'
          row="5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type='submit' className="update-report-btn">
          Update Report
        </button>

      </form>
    </div>
  )
}

export default UpdateReportModel