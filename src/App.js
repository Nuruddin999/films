import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getFilms } from './store/filmsReducer';
import { Switch, Route } from "react-router-dom"
import Films from './films/Films';
import FilmsContainer from './films/FilmsContainer';
import CommetsContainer from './comments/CommetsContainer';
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <FilmsContainer />
        </Route>
        <Route path={`/:id`}>
          <CommetsContainer />
        </Route>
      </Switch>

    </div>
  );
}

export default App;
