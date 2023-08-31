import { configureStore } from '@reduxjs/toolkit'
import themeReducer from "../Features/ThemeSlice";
import {rootAdminReducer} from "../Features/AdministrationSlice";
import {rootModalFormReducer} from "../Features/rootModalFormSlice";
export default configureStore({
    reducer: {
        rootTheme: themeReducer,
        rootAdmin: rootAdminReducer,
        rootModalForm: rootModalFormReducer
    },
})