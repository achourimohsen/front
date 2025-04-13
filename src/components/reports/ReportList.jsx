import React from 'react';
import ReportItem from './ReportItem';
import "./report.css";

const ReportList = ({ reports }) => {
    return (
        <div className="report-list">
            {reports.map(item => (
                <ReportItem report={item} key={item._id} />
            ))}
        </div>
    );
};

export default ReportList;
