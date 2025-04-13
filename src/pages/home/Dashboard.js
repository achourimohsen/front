import React, { useEffect } from 'react';
import "./dashboard.css";
import { getAllReports, getFixedReportsCount } from '../../redux/apiCalls/reportApiCall';
import { useSelector, useDispatch } from 'react-redux';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { reportsCount, fixedReportsCount } = useSelector(state => state.report);

    useEffect(() => {
        dispatch(getAllReports());
        // dispatch(getFixedReportsCount());  // Fetch the count of fixed reports
    }, [dispatch]);

    return (
        <section className="user-main">
            <h5 className="sidebar-user-title">لوحة القيادة</h5>

            <div className="user-main-header">
                <div className="user-main-card">
                    <h5 className="user-card-title">المشاكل المبلغ عنها</h5>
                    <div className="user-card-count">
                        {reportsCount}
                    </div>
                </div>
            </div>
            <div className="user-main-header">
                <div className="user-main-card">
                    <h5 className="user-card-title">المشاكل المحلولة</h5>
                    <div className="user-card-count" style={{ color: "green" }}>
                        tw nshoufouha
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Dashboard;
