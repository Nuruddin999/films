import { configureStore } from "@reduxjs/toolkit";
import filmsReducer from "./filmsReducer";

export default configureStore({
    reducer: {
        films: filmsReducer
    }
})