import { configureStore } from '@reduxjs/toolkit'
import themeReducer from "../Features/ThemeSlice";
import {rootAdminReducer} from "../Features/AdministrationSlice";
import {rootModalFormReducer} from "../Features/rootModalFormSlice";
import userSlice from "../Features/UserSlice";
export default configureStore({
    reducer: {
        rootTheme: themeReducer,
        rootAdmin: rootAdminReducer,
        rootModalForm: rootModalFormReducer,
        user: userSlice
    },
})