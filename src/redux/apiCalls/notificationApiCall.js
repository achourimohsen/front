import { notificationActions } from "../slices/notificationSlice";
import request from "../../utils/request";

export const getNotifications = () => async (dispatch) => {
  dispatch(notificationActions.getNotificationsStart());
  try {
    const res = await request.get("/notifications");
    dispatch(notificationActions.getNotificationsSuccess(res.data));
  } catch (err) {
    dispatch(notificationActions.getNotificationsFailure());
  }
};

export const markAllAsRead = () => async (dispatch) => {
  try {
    await request.put("/notifications/mark-all-as-read");
    dispatch(notificationActions.markAllAsReadSuccess());
  } catch (err) {
    console.log("Failed to mark notifications as read:", err);
  }
};
