import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { getFilms, makeComment } from '../store/filmsReducer';
import Comments from './Comments';

const CommetsContainer = (props) => {
    let dispatch = useDispatch()
    const getComments = () => {
        let { commentsList, reqIndex } = checkIfComments()
        if (reqIndex >= 0) {
            dispatch(makeComment(commentsList[reqIndex]))
        }
        else {
            dispatch(makeComment({ list: [], code: props.match.params.id }))
        }
    }
    const checkIfComments = () => {
        if (!sessionStorage.getItem("comments")) {
            return { commentsList: [], reqIndex: -1 }
        }
        let { id } = props.match.params
        let commentsList = JSON.parse(sessionStorage.getItem("comments"))
        let reqIndex = commentsList.findIndex((obj => obj.code === id));
        return { commentsList, reqIndex }

    }
    const addComment = (text) => {
        let { commentsList, reqIndex } = checkIfComments()
        if (reqIndex >= 0) {
            commentsList[reqIndex].list.push(text)
            dispatch(makeComment(commentsList[reqIndex]))
        }
        else {
            commentsList.push({ list: [text], code: props.match.params.id })
            dispatch(makeComment({ list: [text], code: props.match.params.id }))
        }
        sessionStorage.setItem("comments", JSON.stringify(commentsList))
    }
    const deleteComment = (index) => {
        let { commentsList, reqIndex } = checkIfComments()
        commentsList[reqIndex].list.splice(index, 1)
        sessionStorage.setItem("comments", JSON.stringify(commentsList))
        dispatch(makeComment(commentsList[reqIndex]))
    }
    useEffect(() => {
        getComments()
    }, [dispatch])
    return <Comments addComment={addComment} delete={deleteComment} />
}

export default withRouter(CommetsContainer)
