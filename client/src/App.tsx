import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import Movies from './components/Movies';
import Home from './components/Home';
import Admin from './components/Admin';
import OneMovie from './components/OneMovie';
import Genres from './components/Genres';
import OneGenre from './components/OneGenre';
import EditMovie from './components/EditMovie';
import Login from './components/Login';

function App() {

  const [jwt, setJwt] = React.useState("");

  const handleJwtChange = React.useCallback((jwt: string) => {
    setJwt(jwt);
  }, []);

  const logout = React.useCallback(() => {
    setJwt("");
    localStorage.removeItem("go-movies-jwt");
  }, []);

  let loginLink;
  if (jwt === "") {
    loginLink = <Link to="/login">Login</Link>;
  } else {
    loginLink = <Link to="/logout" onClick={logout}>Logout</Link>;
  }

  React.useEffect(() => {
    const t = localStorage.getItem("go-movies-jwt");
    if (t) {
      if (jwt === "") setJwt(JSON.parse(t));
    }
  }, []);

  return (
    <Router>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col mt-3">
            <h1 className="mt-3">
              Go watch a movie
            </h1>
          </div>
          <div className="col mt-3 text-end">
            {loginLink}
          </div>
          <hr className="mb-e" />
        </div>

        <div className="row">
          <div className="col-md-2">
            <nav>
              <ul className="list-group">
                <li className="list-group-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/movies">Movies</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/genres">Genres</Link>
                </li>

                {jwt !== "" && (
                  <React.Fragment>
                    <li className="list-group-item">
                      <Link to="/admin/movie/0">Add movie</Link>
                    </li>
                    <li className="list-group-item">
                      <Link to="/admin">Manage Catalogue</Link>
                    </li>
                  </React.Fragment>
                )}
                
              </ul>
            </nav>
          </div>

          <div className="col-md-10">
            <Switch>
              <Route path="/movies/:id" component={OneMovie} />
              <Route path="/movies">
                <Movies />
              </Route>

              <Route
                exact
                path="/login"
                component={() => <Login handleJwtChange={handleJwtChange} />}
              />

              <Route path="/genre/:id" component={OneGenre} />
              <Route exact path="/genres">
                <Genres />
              </Route>
              <Route path="/admin/movie/:id" component={() => <EditMovie jwt={jwt} />} />
              <Route path="/admin">
                <Admin jwt={jwt} />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </div>

      </div>
    </Router>
  );
}

export default App;
