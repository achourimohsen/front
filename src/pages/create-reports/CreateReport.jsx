import { useState, useEffect } from "react";
import "./create-report.css";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createReport } from "../../redux/apiCalls/reportApiCall";
import { RotatingLines } from "react-loader-spinner";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";

const CreateReport = () => {
  const dispatch = useDispatch();
  const { loading, isReportCreated } = useSelector((state) => state.report);
  const { categories } = useSelector((state) => state.category);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Report title is required");
    if (category.trim() === "") return toast.error("Report category is required");
    if (description.trim() === "") return toast.error("Report description is required");
    if (!file) return toast.error("Report image is required");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    setIsSubmitting(true);
    dispatch(createReport(formData));
  };

  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (isReportCreated) {
      navigate("/");
    }
    setIsSubmitting(false);
  }, [isReportCreated, navigate]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <section className="create-report">
      <h1 className="create-report-title">Create New Report</h1>
      <form onSubmit={formSubmitHandler} className="create-report-form">
        <input
          type="text"
          placeholder="Report Title"
          className="create-report-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="create-report-input"
        >
          <option disabled value="">
            Select A Category
          </option>
          {categories.map((category) => (
            <option key={category._id} value={category.title}>
              {category.title}
            </option>
          ))}
        </select>
        <textarea
          className="create-report-textarea"
          rows="5"
          placeholder="Report Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="file"
          name="file"
          id="file"
          className="create-report-upload"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit" className="create-report-btn">
          {isSubmitting ? (
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="40"
              visible={true}
            />
          ) : (
            "Create"
          )}
        </button>
      </form>
    </section>
  );
};

export default CreateReport;
