import Home from 'Components/Pages/Home/Home';
import AboutUs from 'Components/Pages/AboutUs/AboutUs';
import Collection from 'Components/Pages/Collection/Collection';
import Account from 'Components/Pages/Account/Account';
import Faq from 'Components/Pages/Faq/Faq';
import Contact from 'Components/Pages/Contact/Contact';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { addBookToCollection } from 'Services/firebaseBooks';
import { useEffect } from 'react';

function App() {
  const bookData = {
    title: 'Let it snow',
    isbn: '0141349174',
    authors: ['john green', 'maureen johnson', 'lauren myracle'],
    genres: ['fantasty', 'action', 'adventure'],
    pageCount: 300,
    publicationYear: 2003,
    publisher: 'Puffin',
    description:
      "Three dazzling holiday romances by three of America's bestselling authors: John Green (The Fault In Our Stars), Maureen Johnson (13 Little Blue Envelopes) and Lauren Myracle (Kissing Kate).",
    thumbnail:
      'https://mcdn.elefant.ro/mnresize/1500/1500/images/44/1492144/let-it-snow-paperback_1_fullsize.jpg',
  };
  const handleSuccess = () => {
    console.log('added with sucess');
  };
  const handleError = (error) => {
    console.log(error);
  };

  useEffect(() => {
    // addBookToCollection(bookData, handleSuccess, handleError);
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
