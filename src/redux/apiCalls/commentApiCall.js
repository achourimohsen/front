import { reportActions } from "../slices/reportSlice";
import { commentActions } from "../slices/commentSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";



// Create Comment
export function createComment(newComment) {
    return async (dispatch, getState) => {
        try {
            const {data} = await request.post("/comments", newComment, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                },
            });

            dispatch(commentActions.addComment(data)); // Update local comments
            dispatch(reportActions.addCommentToReport(data));
        } catch (error) {
            console.error("Error creating comment:", error);
            toast.error(error.response?.data?.message || error.message);
        }
    };
}



// Update Comment
export function updateComment(commentId, comment) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.put(`/comments/${commentId}`, comment, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
            dispatch(reportActions.updateCommentReport(data));
        } catch (error) {
            toast.error(error.response.data.message)
        }
    };
}


// Delete Comment
export function deleteComment(commentId) {
    return async (dispatch, getState) => {
        try {
            await request.delete(`/comments/${commentId}`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });            
            dispatch(commentActions.deleteComment(commentId));
            dispatch(reportActions.deleteCommentFromReport(commentId));
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;

            toast.error(errorMessage)
        }
    };
}


// Fetch All Comments
export function fetchAllComments() {
    return async (dispatch, getState) => {
      try {
        const { data } = await request.get(`/comments`, {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        });
        dispatch(commentActions.setComments(data));
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
}


