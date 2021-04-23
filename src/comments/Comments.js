import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
const Comments = (props) => {
    let { comments } = useSelector(state => state.films)
    console.log(comments)
    const [state, setState] = useState("")
    const handleClick = (e) => {
        props.addComment(state)
        setState(state => "")
    }
    const remove = (el) => { props.delete(el) }
    return (
        <div>
            <ul className={"comments"}>
                {comments.list.map((el, index) => <li key={el}><div>
                    <span>
                        {el}
                    </span>
                    <button onClick={() => remove(index)}>Remove</button>
                </div></li>)}
            </ul>

            < br />
            <textarea value={state} onChange={(e) => setState(state => e.target.value)} rows="4" cols="50" />
            <br />
            <button onClick={handleClick}>Add</button>
        </div>
    )
}

export default withRouter(Comments)
