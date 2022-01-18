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
  const PublicRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          authStore.userData.email !== 'administrator@yahoo.com' ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/admin/orders',
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
        <PublicRoute path="/collection" exact={false}>
          <Collection />
        </PublicRoute>
        <PublicRoute path="/aboutus" exact={true}>
          <AboutUs />
        </PublicRoute>
        <PublicRoute path="/faq/:subpage">
          <Faq />
        </PublicRoute>
        <PublicRoute path="/faq">
          <Faq />
        </PublicRoute>
        <PublicRoute path="/contact" exact={true}>
          <Contact />
        </PublicRoute>
        <PrivateRoute path="/account/:subpage">
          <Account />
        </PrivateRoute>
        <PrivateAdminRoute path="/admin/:subpage">
          <Admin />
        </PrivateAdminRoute>
        <PrivateAdminRoute path="/messages" exact={true}>
          <Messages />
        </PrivateAdminRoute>
        <PublicRoute path="/book/:id">
          <Book />
        </PublicRoute>
        <PublicRoute path="/" exact={true}>
          <Home />
        </PublicRoute>
        <Route path="*" component={Page404}></Route>
      </Switch>
    </Router>
  );
}

export default App;
