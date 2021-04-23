import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addHidden, getFilms, setPage } from '../store/filmsReducer';
import Films from './Films';

const FilmsContainer = () => {
    let dispatch = useDispatch()
    let { hiddenFields, page } = useSelector(state => state.films)
    const getHidden = () => {
        if (sessionStorage.getItem("hidden")) {
            let hidden = sessionStorage.getItem("hidden")
            dispatch(addHidden(JSON.parse(hidden)))
        }
    }
    const addToHidden = (code) => {
        let fields = hiddenFields.slice()
        let result;
        if (fields.indexOf(code) >= 0) {
            result = fields.filter(el => el !== code)
        }
        else {
            result = [...fields, code]
        }
        dispatch(addHidden(result))
        sessionStorage.setItem("hidden", JSON.stringify(result))
    }
    useEffect(() => {
        dispatch(getFilms({ query: "", page: sessionStorage.getItem("page") }))
        getHidden()
    }, [])
    return <Films addToHidden={addToHidden} />
}

export default FilmsContainer
