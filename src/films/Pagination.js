import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getFilms } from '../store/filmsReducer';
import next from "../next.svg"
import prev from "../prev.svg"
const Pagination = ({ totalCount, limit }) => {
    const [state, setState] = useState({
        pageLimit: 10
    })
    let dispatch = useDispatch()
    let totalPages = Math.ceil(totalCount / limit)
    const renderPages = () => {
        let pages = []
        for (let index = state.pageLimit - 10 + 1; index <= state.pageLimit; index++) {
            if (index > totalPages) { break }
            pages.push(index)
        }
        return pages
    }
    const nextPage = () => {
        if (state.pageLimit > totalPages) {
            return
        }
        setState(state => ({ ...state, pageLimit: state.pageLimit + 10 }))
    }
    const prevPage = () => {
        if (state.pageLimit < 11) {
            return
        }
        setState(state => ({ ...state, pageLimit: state.pageLimit - 10 }))
    }
    const goToPage = (page) => {
        dispatch(getFilms({ query: "", page }))
        sessionStorage.setItem("page", page)
    }
    return (
        <div className={"page-wrapper"}>
            <img src={prev} onClick={prevPage} />
            {renderPages().map(page => <div onClick={() => goToPage(page)}>{page}</div>)}

            <img src={next} onClick={nextPage} />
        </div>
    )
}

export default Pagination
