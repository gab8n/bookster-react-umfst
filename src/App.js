import Home from 'Components/Pages/Home/Home';
import AboutUs from 'Components/Pages/AboutUs/AboutUs';
import Collection from 'Components/Pages/Collection/Collection';
import Account from 'Components/Pages/Account/Account';
import Faq from 'Components/Pages/Faq/Faq';
import Contact from 'Components/Pages/Contact/Contact';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useEffect } from 'react';
// import { getBooksAll } from 'Services/firebaseBooks';

function App() {
  useEffect(() => {
    // addBookToCollection(bookData, handleSuccess, handleError);
    // getBooksAll();
    // getBooks(1, 20);
  }, []);
  return (
    <Router>
      <Switch>
        <Route path="/collection" component={Collection}></Route>
        <Route path="/aboutus" component={AboutUs}></Route>
        <Route path="/faq" component={Faq}></Route>
        <Route path="/contact" component={Contact}></Route>
        <Route path="/account" component={Account}></Route>
        <Route path="/" component={Home}></Route>
      </Switch>
    </Router>
  );
}

export default App;
