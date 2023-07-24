import { configureStore } from '@reduxjs/toolkit'
import themeReducer from "../Features/ThemeSlice";
export default configureStore({
    reducer: {
        rootTheme: themeReducer
    },
})