import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
let baseUrl = "https://yts.mx/api/v2/list_movies.json"
export const getFilms = createAsyncThunk("films/getFilms", async (obj = { query: "", page: 1 }, { dispatch }) => {
    let response = await fetch(baseUrl + `?page=${obj.page}&&query_term=${obj.query}`)
    return response.json()
})
const filmsSlice = createSlice({
    name: "films",
    initialState: {
        films: [],
        status: null,
        comments: { list: [], code: null },
        hiddenFields: [],
        page: 1
    },
    reducers: {
        makeComment: (state, action) => {
            state.comments = action.payload
        },
        addHidden: (state, action) => {
            state.hiddenFields = action.payload
        },
        setPage: (state, action) => {
            state.page = action.payload
        }
    },
    extraReducers: {
        [getFilms.pending]: (state) => {
            state.status = "loading"
        },
        [getFilms.fulfilled]: (state, { payload }) => {
            state.status = "loaded"
            payload.data.movies.forEach((mov) => { mov.comments = [] })
            state.films = payload.data.movies
        },
        [getFilms.rejected]: (state) => {
            state.status = "error"
        }
    }
})
export const { makeComment, addHidden, setPage } = filmsSlice.actions
export default filmsSlice.reducer