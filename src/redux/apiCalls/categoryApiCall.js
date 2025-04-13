import { categoryActions } from "../slices/categorySlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

// Fetch All Categories
export function fetchCategories() {
    return async (dispatch) => {
        try {
            const { data } = await request.get("/categories");
            dispatch(categoryActions.setCategories(data));
        } catch (error) {
            toast.error(error.response?.data?.message)
        }
    };
}


// Create Category
export function createCategory(newCategory) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.post("/categories", newCategory, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token
                }
            });
            dispatch(categoryActions.addCategory(data));
            toast.success("category created successsssssss")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    };
}


// Delete Category
export function deleteCategory(categoryId) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.delete(`/categories/${categoryId}`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token
                }
            });
            dispatch(categoryActions.deleteCategory(data.categoryId));
            // toast.success(data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    };
}
