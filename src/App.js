import { useEffect } from 'react';
import Home from './Components/Home/Home';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { createUserWithEmailAndPassword } from 'Services/firebase';

function App() {
  useEffect(() => {
    createUserWithEmailAndPassword(
      'cotocvasilegabriel@yahoo.com',
      '123456789',
      'gab8n'
    );
  }, []);
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
