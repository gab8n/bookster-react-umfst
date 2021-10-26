import Home from './Components/Home/Home';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home}></Route>
        <Route path="/collection" component={Home}></Route>
        <Route path="/aboutus" component={Home}></Route>
        <Route path="/faq" component={Home}></Route>
        <Route path="/contact" component={Home}></Route>
      </Switch>
    </Router>
  );
}

export default App;
