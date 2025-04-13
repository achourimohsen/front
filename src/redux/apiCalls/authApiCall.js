import { authActions } from "../slices/authSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

// Login User
export function loginUser(user) {
    return async (dispatch) => {
        // console.log("User data:", user);
        try {
            const { data } = await request.post("/auth/login", user);
            dispatch(authActions.login(data));
            localStorage.setItem("userInfo", JSON.stringify(data)); //localstorage maye9belish object zedneha JSON.stringify(data) 
        } catch (error) {
            toast.error(error.response.data.message)
        }
    };
}


// Logout User
export function logoutUser(user) {
    return (dispatch) => {
        dispatch(authActions.logout()) //ya3ml state null kima mwjouda f authSlice
        localStorage.removeItem("userInfo") //yamsa7 user mn localstorage
    };
}


// Register User
export function registerUser(user) { //user feha username, email, password
    return async (dispatch) => {
        try {
            const { data } = await request.post("/auth/register", user);
            dispatch(authActions.register(data.message));
        } catch (error) {
            toast.error(error.response.data.message)
        }
    };
}


