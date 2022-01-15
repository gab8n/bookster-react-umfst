import Home from 'Components/Pages/Home/Home';
import AboutUs from 'Components/Pages/AboutUs/AboutUs';
import Collection from 'Components/Pages/Collection/Collection';
import Account from 'Components/Pages/Account/Account';
import Faq from 'Components/Pages/Faq/Faq';
import Contact from 'Components/Pages/Contact/Contact';
import Book from 'Components/Pages/Book/Book';
import Page404 from 'Components/Pages/Page404/Page404';
import Messages from 'Components/Pages/Messages/Messages';
import Admin from 'Components/Pages/Admin/Admin';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useEffect } from 'react';
import { populateDbWithUsers } from 'Services/firebaseAuth';
import {
  setAllBooksStatusToAviable,
  getBooksAll,
  addBooksToBooksTest,
  repairAllBooksFeedback,
} from 'Services/firebaseBooks';
import { useSelector, useDispatch } from 'react-redux';
function App() {
  useEffect(() => {
    // getBooksAll();
    // addBooksToBooksTest();
    // repairAllBooksFeedback();
  }, []);
  const authStore = useSelector((state) => state.authStore);
  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          authStore.loggedIn ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/',
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  };
  const PrivateAdminRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          authStore.loggedIn &&
          authStore.userData.email === 'administrator@yahoo.com' ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/',
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  };
  return (
    <Router>
      <Switch>
        <Route path="/collection" component={Collection} exact={false}></Route>
        <Route path="/aboutus" component={AboutUs} exact={true}></Route>
        <Route path="/faq/:subpage" component={Faq}></Route>
        <Route path="/faq" component={Faq}></Route>
        <Route path="/contact" component={Contact} exact={true}></Route>
        <PrivateRoute path="/account/:subpage">
          <Account />
        </PrivateRoute>
        <PrivateAdminRoute path="/admin/:subpage">
          <Admin />
        </PrivateAdminRoute>
        <Route path="/messages" component={Messages} exact={true}></Route>
        <Route path="/collection" component={Collection}></Route>
        <Route path="/book/:id" component={Book}></Route>
        <Route path="/" component={Home} exact={true}></Route>
        <Route path="*" component={Page404}></Route>
      </Switch>
    </Router>
  );
}

export default App;
