import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import Pagination from './Pagination';
import bubble from "../bubble.svg"
import eye from "../eye.svg"
import hide from "../hide.svg"
const Films = (props) => {

    let { films, status, hiddenFields } = useSelector(state => state.films)
    const addToHidden = (code) => {
        props.addToHidden(code)
    }
    return <>
        <div className={"table-wrapper"}>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Summary</th>
                        <th>Year</th>
                        <th>Rating</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {status === "loaded" ? films.map((film) =>
                        <tr key={film.imdb_code}>
                            <td><img src={hiddenFields.indexOf(film.imdb_code) >= 0 ? eye : hide} onClick={() => addToHidden(film.imdb_code)} /></td>
                            {hiddenFields.indexOf(film.imdb_code) >= 0 ? null : <>  <td>{film.title}</td>
                                <td className="description">{film.summary}</td>
                                <td>{film.year}</td>
                                <td>{film.rating}</td>
                                <td><Link to={`/${film.imdb_code}`}><img src={bubble} /></Link></td></>}

                        </tr>
                    ) : null}
                </tbody>
            </table>
        </div>

        <Pagination totalCount={30150} limit={20} />
    </>
}
export default Films