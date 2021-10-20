import Home from './Components/Home/Home';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App"></div>
    <Switch>
      <Route path="/" component={Home}></Route>
    </Switch>
  </Router>
  );
}

export default App;
