import Home from 'Components/Pages/Home/Home';
import AboutUs from 'Components/Pages/AboutUs/AboutUs';
import Collection from 'Components/Pages/Collection/Collection';
import Account from 'Components/Pages/Account/Account';
import Faq from 'Components/Pages/Faq/Faq';
import Contact from 'Components/Pages/Contact/Contact';
import Book from 'Components/Pages/Book/Book';
import Page404 from 'Components/Pages/Page404/Page404';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/collection" component={Collection} exact={false}></Route>
        <Route path="/aboutus" component={AboutUs} exact={true}></Route>
        <Route path="/faq" component={Faq} exact={true}></Route>
        <Route path="/contact" component={Contact} exact={true}></Route>
        <Route path="/account" component={Account} exact={true}></Route>
        <Route path="/collection" component={Collection}></Route>
        <Route path="/book/:id" component={Book}></Route>
        <Route path="/" component={Home} exact={true}></Route>
        <Route path="*" component={Page404}></Route>
      </Switch>
    </Router>
  );
}

export default App;
