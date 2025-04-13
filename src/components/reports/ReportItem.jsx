import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { updateReportStatus } from '../../redux/apiCalls/reportApiCall'; // افترض أن لديك هذه الدالة جاهزة
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faCheckCircle, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import './report.css';

const ReportItem = ({ report, username, userId }) => {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const profileLink = userId ? `/profile/${userId}` : `/profile/${report?.user?._id}`;

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        if (['Open', 'Fixed', 'Under Review'].includes(newStatus)) {
            dispatch(updateReportStatus(report._id, newStatus));
        } else {
            console.error('Invalid status:', newStatus);
        }
    };

    const getStatusClassName = (status) => {
        switch (status) {
            case 'Open':
                return 'status-open';
            case 'Fixed':
                return 'status-fixed';
            case 'Under Review':
                return 'status-under-review';
            default:
                return '';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Open':
                return <FontAwesomeIcon icon={faExclamationCircle} className="status-icon" />;
            case 'Fixed':
                return <FontAwesomeIcon icon={faCheckCircle} className="status-icon" />;
            case 'Under Review':
                return <FontAwesomeIcon icon={faSyncAlt} className="status-icon" />;
            default:
                return null;
        }
    };

    return (
        <div className="report-item">
            <div className="report-item-image-wrapper">
                <img
                    src={report?.image.url}
                    alt=""
                    className="report-item-image"
                />
            </div>
            <div className="report-item-info-wrapper">
                <div className="report-item-info">
                    <div className="report-item-author">
                        <strong>Author: </strong>
                        <Link
                            className="report-item-username"
                            to={profileLink}
                        >
                            {username ? username : report?.user?.username}
                        </Link>
                    </div>
                    <div className="report-item-date">
                        {new Date(report?.createdAt).toDateString()}
                    </div>
                </div>

                <div className="report-item-details">
                    <h4 className="report-item-title">{report?.title}</h4>
                    <Link
                        className='report-item-category'
                        to={`/reports/categories/${report?.category}`}
                    >
                        {report?.category}
                    </Link>
                </div>

                <p className="report-item-description">
                    {report?.description}
                </p>

                <div className='report-item-status-flex'>
                    <div>
                        <strong className='status'>
                            Status: 
                            <h3 className={`report-item-status ${getStatusClassName(report?.status)}`}>
                                {getStatusIcon(report?.status)} {report?.status}
                            </h3>
                        </strong>
                    </div>

                    {user ? (
                        <Link
                            className="report-item-link"
                            to={`/reports/details/${report?._id}`}
                        >
                            Read more...
                        </Link>
                    ) : ""}
                </div>

                {user && user.isAdmin && (
                    <div className="report-item-admin-actions">
                        <select
                            className='option'
                            value={report?.status}
                            onChange={handleStatusChange}
                        >
                            <option value="Open" className='option-item'>Open</option>
                            <option value="Fixed" className='option-item'>Fixed</option>
                            <option value="Under Review" className='option-item'>Under Review</option>
                        </select>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReportItem;
