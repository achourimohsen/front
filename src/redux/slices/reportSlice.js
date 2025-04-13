import { createSlice } from "@reduxjs/toolkit";

const reportSlice = createSlice({
    name: "report",
    initialState: {
        reports: [],
        reportsCount: null,
        reportsCate: [],
        loading: false,
        isReportCreated: false,
        report: null,
    },
    reducers: {
        setReports(state, action) {
            state.reports = action.payload;
        },
        setReportsCount(state, action) {
            state.reportsCount = action.payload;
        },
        setReportsCategory(state, action) {
            state.reportsCate = action.payload;
        },
        setLoading(state) {
            state.loading = true;
        },
        clearLoading(state) {
            state.loading = false;
        },
        setIsReportCreated(state) {
            state.isReportCreated = true;
            state.loading = false;
        },
        clearIsReportCreated(state) {
            state.isReportCreated = false;
        },
        setReport(state, action) {
            state.report = action.payload;
        },
        setLike(state, action) {
            state.report.likes = action.payload.likes;
        },
        deleteReport(state, action) {
            state.reports = state.reports.filter(report => report._id !== action.payload);
        },
        addCommentToReport(state, action) {
            // Add the new comment to the report
            state.report.comments.push(action.payload);

            // Notify the owner of the report about the new comment
            const ownerId = state.report.user; // Assuming report.user is the owner's ID
            if (ownerId !== action.payload.user) { // Make sure not to notify the commenter
                // Implement notification logic here (socket.io or any other method)
            }
        },
        updateCommentReport(state, action) {
            // Update the specific comment in the report
            state.report.comments = state.report.comments.map(comment =>
                comment._id === action.payload._id ? action.payload : comment
            );
        },
        deleteCommentFromReport(state, action) {
            // Remove the deleted comment from the report
            const commentIndex = state.report.comments.findIndex(comment => comment._id === action.payload);
            if (commentIndex !== -1) {
                state.report.comments.splice(commentIndex, 1);
            }
        },
        updateReportStatus(state, action) {
            const { reportId, status } = action.payload;
            const reportIndex = state.reports.findIndex(report => report._id === reportId);
            if (reportIndex !== -1) {
                state.reports[reportIndex].status = status;
            }
        },
    },
});

const reportReducer = reportSlice.reducer;
const reportActions = reportSlice.actions;

export { reportActions, reportReducer };
