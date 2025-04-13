import { reportActions } from "../slices/reportSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

// Fetch reports Based On Page Number
export function fetchReports(pageNumber) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/reports?pageNumber=${pageNumber}`);
            dispatch(reportActions.setReports(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    };
}

//Get Report Count
export function getReportsCount() {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/reports/count`);
            dispatch(reportActions.setReportsCount(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    };
}

// Fetch reports Based On Category
export function fetchReportsBasedOnCategory(category) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/reports?category=${category}`);
            dispatch(reportActions.setReportsCategory(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    };
}

// Create report
export function createReport(newReport) {
    return async (dispatch, getState) => {
        try {
            dispatch(reportActions.setLoading())
            await request.post(`/reports`, newReport, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                    "Content-Type": "multipart/form.data"
                }
            });
            dispatch(reportActions.setIsReportCreated())

            setTimeout(() => 
            dispatch(reportActions.clearIsReportCreated()
            ), 2000)
             
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(reportActions.clearLoading())
        }
    };
}

// Fetch Single report
export function fetchSingleReport(reportId) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/reports/${reportId}`);
            dispatch(reportActions.setReport(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    };
}

// Toggle Like report
export function toggleLikeReport(reportId) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.put(`/reports/like/${reportId}`, {}, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
            dispatch(reportActions.setLike(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    };
}

// Update Report Image
export function updateReportImage(newImage, reportId) {
    return async (dispatch, getState) => {
        try {
            await request.put(`/reports/update-image/${reportId}`, newImage, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                    "Content-Type": "multipart/form.data"
                }
            });
            toast.success("New Report Image Uploaded successssss")
            dispatch(fetchSingleReport(reportId));

        } catch (error) {
            toast.error(error.response.data.message)
        }
    };
}

// Update Report
export function updateReport(newReport, reportId) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.put(`/reports/${reportId}`,newReport, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
            dispatch(reportActions.setReport(data))
            toast.success(data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    };
}

// Delete report
export function deleteReport(reportId) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.delete(`/reports/${reportId}`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                    'Content-Type': 'application/json',
                }
            });
            dispatch(reportActions.deleteReport(data.reportId))
            toast.success(data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    };
}

// Get All reports
export function getAllReports() {
    return async (dispatch) => {
        try {
            dispatch(reportActions.setLoading(true));
            const { data } = await request.get(`/reports`);
            dispatch(reportActions.setReports(data));
        } catch (error) {
            toast.error(error.response.data.message);
            dispatch(reportActions.setError(error.response.data.message));
        } finally {
            dispatch(reportActions.setLoading(false));
        }
    };
}





// Update Report Status
export function updateReportStatus(reportId, statusData) {
    return async (dispatch, getState) => {
        try {
            const { user } = getState().auth; // assuming you have auth state with user info
            const token = user.token; // get token from the user state

            const { data } = await request.put(
                `/reports/${reportId}/status`,
                { status: statusData },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            dispatch(reportActions.updateReportStatus({ reportId, status: data.status }));
            toast.success("Report status updated successfully");
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Error updating report status";
            toast.error(errorMessage);
            console.error("Error updating report status:", errorMessage);
        }
    };
}
