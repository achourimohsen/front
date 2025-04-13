import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import "./report-details.css";
import { toast } from "react-toastify";
import AddComment from "../../components/comments/AddComment";
import CommentList from '../../components/comments/CommentList';
import UpdateReportModel from "./UpdateReportModel";
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from "react-redux";
import { deleteReport, fetchSingleReport, toggleLikeReport, updateReportImage } from "../../redux/apiCalls/reportApiCall";

const ReportDetails = () => {
    const dispatch = useDispatch();
    const { report } = useSelector(state => state.report);
    const { user } = useSelector(state => state.auth);

    const { id } = useParams();

    const [file, setFile] = useState(null);
    const [updateReport, setUpdateReport] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchSingleReport(id));
    }, [id]);

    // Update Image Submit Handler
    const UpdateImageSubmitHandler = (e) => {
        e.preventDefault();
        if (!file) return toast.warning("there is no file");

        const formdData = new FormData();
        formdData.append("image", file);
        dispatch(updateReportImage(formdData, report?._id));
    };

    const navigate = useNavigate();
    // Delete report Handler 
    const deleteReportHandler = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Once deleted, dra this report",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteReport(report?._id));
                navigate(`/profile/${user?.id}`);
            }
        });
    };

    return (
        <section className="report-details">
            {/* <ToastContainer theme='colored' position='top-center' /> */}

            <div className="report-details-image-wrapper">
                <img
                    src={file ? URL.createObjectURL(file) : report?.image?.url}
                    alt=""
                    className="report-details-image"
                />

                {user?._id === report?.user?._id && (
                    <form
                        onSubmit={UpdateImageSubmitHandler}
                        className="update-report-image-form"
                    >
                        <label htmlFor="file" className="update-report-label">
                            <i className="bi bi-image-fill"></i>
                            Select new image
                        </label>
                        <input
                            style={{ display: "none" }}
                            type="file" name="file"
                            id="file"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <button type="submit">upload</button>
                    </form>
                )}
            </div>

            <h1 className="report-details-title">{report?.title} </h1>

            <div className="report-details-user-info">
                <img
                    src={report?.user?.profilePhoto?.url}
                    alt=""
                    className="report-details-user-image"
                />

                <div className="report-details-user">
                    <strong>
                        <Link to={`/profile/${report?.user?._id}`} >
                            {report?.user?.username}
                        </Link>
                    </strong>
                    <span>{new Date(report?.createdAt).toDateString()}</span>
                </div>
            </div>

            <p className="report-details-description">
                {report?.description}
            </p>

            <div className="report-details-icon-wrapper">
                <div>
                    {
                        user && (
                            <i
                                onClick={() => dispatch(toggleLikeReport(report?._id))}
                                className={
                                    report?.likes?.includes(user?._id)
                                        ? "bi bi-hand-thumbs-up-fill" 
                                        : "bi bi-hand-thumbs-up"
                                }
                            ></i>
                        )
                    }
                    <small>{report?.likes?.length} likes</small>
                </div> 

                {
                    user?._id === report?.user?._id && (
                        <div>
                            <i onClick={() => setUpdateReport(true)} className="bi bi-pencil-square"></i>
                            <i onClick={deleteReportHandler} className="bi bi-trash-fill"></i>
                        </div>
                    )
                }
            </div>

            {
                user ? <AddComment reportId={report?._id} /> :
                    <p className='report-details-info-write'>
                        to write a comment you should login first
                    </p>

            }

            <CommentList comments={report?.comments} />

            {updateReport && (
                <UpdateReportModel report={report} setUpdateReport={setUpdateReport} />
            )}

            <div></div>
        </section>
    )
}

export default ReportDetails;
