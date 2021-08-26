import { 
  BrowserRouter as Router, 
  Redirect, 
  Route, 
  Switch 
} from 'react-router-dom'
import Login from './Login'
import Home from './Home'

const App = () => {

  let routes ;

  if(JSON.parse(sessionStorage.getItem('loggedIn'))) {
    routes = (
      <Switch>
        <Route path="/home" component={Home} exact/>
        <Redirect to="/home"/>
      </Switch>
    )
  }
  else {
    routes = (
      <Switch>
        <Route path="/" component={Login} exact/>
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
