import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import './App.css';
import Login from './Login'
import Home from './Home'

const App = () => {

  let routes ;

  if(JSON.parse(sessionStorage.getItem('loggedIn'))) {
    routes = (
      <Switch>
        <Route path="/home" exact>
          <Home/>
        </Route>
        <Redirect to="/home"/>
      </Switch>
    )
  }
  else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Login/>
        </Route>
        <Redirect to="/"/>
      </Switch>
    )
  }

  return(
    <Router>
      {routes}
    </Router>
  )
}

export default App;
