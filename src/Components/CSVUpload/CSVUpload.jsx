import { addBookToCollection, addBookFilter } from 'Services/firebaseBooks';
import { CSVReader } from 'react-papaparse';
import React from 'react';
const publishers = [
  'orice',
  'Trafalgar Square',
  'Rowohlt',
  'Puffin Books',
  "St. Martin's Paperbacks",
  'Scholastic',
  'Jove Books',
  'Laurel Leaf',
  'Fawcett Books',
  'Ullstein Tb',
  'Inner Ocean Publishing',
  'Farrar Straus &amp; Giroux',
  'Simon &amp; Schuster',
  'Riverhead Books',
  'Ballantine Books',
  'Doubleday',
  'Teamcom Books',
  "Viking Children's Books",
  'Anchor Pub',
  'Hyperion Press',
  'Random House',
  'Morehouse Group',
  'Abacus',
  'Apple Signature (Scholastic)',
  'Modern Library',
  'Hyperion Books for Children',
  'Faber Faber Inc',
  'Distribooks Inc',
  'Perennial',
  'Health Communications',
  'Edicions 62',
  'Warner Books',
  'Dark Horse Comics',
  'Zebra Books',
  'Firebrand Books',
  'Cambridge University Press',
  'Bantam Books',
  'Chambers Harrap Publishers Ltd',
  'Anchor',
  'Harcourt',
  'Routledge',
  'Steeple Hill',
  'Bantam Dell Pub Group',
  'Heyne',
  'Sourcebooks Landmark',
  'St Martins Pr',
  'Landoll',
  'Scribner',
  'Dell',
  'Harpercollins Juvenile Books',
  'Plume Books',
  'Minotauro',
  'Mira',
  'Dover Publications',
  'Tyndale House Publishers',
  "Reader's Digest",
  'River City Pub',
  "St. Martin's Press",
  'L�?¼bbe',
  'Berkley Publishing Group',
  'Back Bay Books',
  'Del Rey Books',
  'HarperTorch',
  'Hyperion Books',
  'WestBow Press',
  'Flammarion',
  'Doubleday Books',
  'Dutton Books',
  'Tor Books',
  'Quill (HarperCollins)',
  'Dell Publishing Company',
  'Puffin',
  'Penguin Books Ltd',
  'Celestial Arts',
  'Columna',
  'Kidsbooks.Com',
  'Piper',
  'Signet',
  'Troll Communications Llc',
  'Ediciones Temas de Hoy',
  'Random House, Inc.',
  'Pan Macmillan',
  'Windstorm Creative',
  'NTC/Contemporary Publishing Company',
  'William Morrow',
  'Island',
  'Dreamhaven Books',
  'Little, Brown',
  'HarperCollins',
  'Winedale Publishing',
  'Bantam Doubleday Dell',
  'Bloomsbury Publishing PLC',
  'Atlantic Monthly Press',
  "St. Martin's Griffin",
  'Alyson Books',
  'Hyperion',
  'Ivy Books',
  'Eos',
  'Pocket Books',
  'Grove Press',
  'Aufbau Taschenbuch Verlag',
  'Polirom',
  'HarperSanFrancisco',
  'Push',
  'Editiones B, Grupo Zeta',
  'Magic Carpet Books',
  'Knopf Books for Young Readers',
  'Dial Books',
  'Palgrave-Macmillan',
  'Knopf',
  'Penguin Putnam~trade',
  'Delta',
  'Vintage',
  'University of Nebraska Press',
  'Delacorte Press',
  'Scholastic Paperbacks',
  'Llewellyn Publications',
  'Editorial Empúries',
  'Harper Collins - UK',
  'LGF',
  'Pocket',
  'Avon Trade',
  'Scholastic Paperbacks (Mm)',
  'Viking Juvenile',
  'Tusquets',
  'Harper Mass Market Paperbacks (Mm)',
  'McClelland &amp; Stewart',
  'Gallimard',
  'Warner Vision',
  'Roc',
  'Aladdin',
  'Little Brown &amp; Company',
  'Adams Media Corp',
  'Diogenes Verlag',
  'Amber-Allen Publishing',
  'Pub Group West',
  'Castle Books',
  'Cornell University Press',
  'Deutscher Taschenbuch Verlag (DTV)',
  'Oxford University Press',
  'Egmont Childrens Books',
  'Bantam',
  'Spectra Books',
  "Union générale d'éditions",
  'Harvest Books',
  'Harvard University Press',
  'Wendy Lamb Books',
  "G. P. Putnam's Sons",
  'Viking Books',
  'Silhouette',
  'Brilliance Audio - Trade',
  'Henry Holt &amp; Company',
  'Laure Leaf',
  'Broadway Books',
  'Orb Books',
  'Readers Digest Assn',
  'Fischer (Tb.), Frankfurt',
  'Edicoes Asa',
  'Golden Books Publishing Company',
  'Dtv',
  'Wings',
  'Love Spell',
  'Rowohlt Tb.',
  'Thorndike Pr',
  'W Publishing Group',
  'Vintage Books USA',
  'Ecco Press',
  'Audioworks',
  'Atria',
  'Putnam Publishing Group',
  'Farrar Straus Giroux',
  'Kensington Publishing Corp.',
  'HarperPrism',
  'HarperFlamingo Canada',
  "Faber Children's Books",
  'Random House Inc',
  'F. H. Revell',
  "J'ai lu",
  'Scholastic, Inc.',
  'Akashic Books',
  'Scholastic Inc',
  'Signet Book',
  'Houghton Mifflin Company',
  'Einaudi',
  'Citadel Press',
  'Laia',
  'Broadway',
  'Avon',
  'Harpercollins',
  'White Pine Press (NY)',
  'Alfred A. Knopf',
  'Simon Schuster Trade',
  'HarperEntertainment',
  'Goldmann',
  'Dearborn Financial Publishing',
  'Penguin Books',
  "Michael O'Mara Books",
  'Editech Pr',
  'Random House Value Publishing',
  'Atria Books',
  'New York Review of Books',
  'Ediciones B',
  'HarperCollins Publishers',
  'Fireside',
  'Spectra',
  'HarperTrophy',
  'Simon Pulse',
  'Three Rivers Press',
  'Mysterious Press',
  'Downtown Book Center',
  'Childrens Press',
  'Reston Pub. Co',
  'Readers Digest',
  'HarperFestival',
  'Watson-Guptill Publications',
  'Stonewall Inn Editions',
  'O. W. Barth Bei Scherz',
  'Mariner Books',
  'Bloomsbury Pub Ltd',
  'University of California Press',
  'Thomas Nelson',
  'Sagebrush Bound',
  'Touchstone',
  'Lectorum Pubns (J)',
  'Onyx Books',
  'Seuil',
  'National Geographic Society',
  'Picador (UK)',
  'Bertelsmann, M�?¼nchen',
  'Livre de Poche',
  'Pleasant Company Publications',
  'Andrews McMeel Publishing',
  'Avon Books',
  'Tor Fantasy',
  'Ryland Peters &amp; Small Ltd',
  'Beacon Press',
  'Monarch Books',
  'Free Press',
  'Putnam Pub Group',
  'Picador USA',
  'Putnam Pub Group (Paper)',
  'Random House Trade Paperbacks',
  'Red Dress Ink',
  'Signet Classics',
  'Editorial Laia',
  "Everyman's Library",
  'Michael Joseph Ltd',
  'Del Rey',
  'Lomond Books',
  'Washington Square Press',
  'Lamuv',
  'Crimeline',
  'Hal Leonard Corp',
  'W. W. Norton &amp; Company',
  'Artisan Publishers',
  'Laurel-Leaf Books',
  'Harper Mass Market Paperbacks',
  'I Books',
  'Little Brown &amp; Co',
  'Plume',
  'Main Street Books',
  'Dargaud',
  'Arcadia Books',
  'Ace Books',
  'Press Gang Publishers',
  'Jossey-Bass',
  'Destino',
  'Little Brown and Company',
  "St. Martin's Minotaur",
  'Owl Books',
  'Fawcett',
  'Sunflower Press',
  'Crown',
  'Thomas Nelson Inc',
  'MacAdam/Cage Publishing',
  'W.W. Norton &amp; Company',
  'Hackett Pub Co Inc',
  'Edizioni E/O',
  'DC Comics',
  'Harlequin',
  'Delacorte Books for Young Readers',
  'Penguin USA',
  'Area',
  'John Wiley &amp; Sons Inc',
  'Crabtree Publishing Company',
  'Speed Graphics',
  'Noble House',
  'Starfire',
  'btb',
  'Cowley Publications',
  'YWAM Publishing',
  'Albert Whitman &amp; Company',
  'Delta Systems',
  'Editores Mexicanos Unidos, S.A.',
  'Playmore Inc. Publishers',
  'Gulf Publishing Company',
  'NavPress',
  'Golden Books',
  'Mira Books',
  'McGraw-Hill',
  '1stBooks Library',
  'Image',
  'Pinnacle Books',
  'Word Publishing',
  'House of Anansi Press',
  'Prentice Hall (K-12)',
  'Too Far',
  'Presses Pocket French',
  'Yearling',
  'Warner Books (Mm)',
  'Del Sol Press',
  'Four Walls Eight Windows',
  'Nelson Books',
  'Saunders College Publishing',
  'Anagrama',
  'Kiepenheuer &amp; Witsch',
  'Brockhampton Press',
  'University Press of America',
  'David R. Godine Publisher',
  'Distribooks',
  'Thomas Dunne Books',
  'Penguin USA (Paper)',
  'Ferguson Publishing Company',
  'Edicions de la Magrana',
  'Manning Publications',
  'Amereon Limited',
  'Regal Books',
  'Soho Press',
  'Harmony',
  'Rising Tide Press (AZ)',
  'Salamandra',
  'Regan Books',
  'Phoenix Books',
  'Emmaus Road Intl',
  'Hodder &amp; Stoughton General Division',
  'Access Press (HarperCollins)',
  'Alianza',
  'Harpercollins Publisher',
  'Emblem Editions',
  'Multnomah',
  'Cypress House',
  'Andrew Scott Publishers',
  'William Morrow &amp; Company',
  'Random House Canada',
  'Tor Books (Mm)',
  'Schocken Books',
  'HarperTempest',
  'Philipp Reclam, Jun Verlag GmbH',
  'New Directions Publishing Corporation',
  'Scribner Paper Fiction',
  'Alpha Books',
  'Bantam Dell Publishing Group',
  'Griffin Trade Paperback',
  'Fabbri - RCS Libri',
  'Droemersche Verlagsanstalt Th. Knaur Nachf., GmbH &amp; Co.',
  'Pocket Star',
  'Hill &amp; Wang',
  'Houghton Mifflin',
  'Harpercollins Library',
  'Ten Speed Pr',
  'F.J. Moody',
  'Arcade Publishing',
  "Random House Children's Books",
  'Douglas Gibson Books',
  'Miramax',
  'W. Morrow',
  'New Amer Library',
  'W W Norton &amp; Co',
  'Trafalgar Square Books',
  'Southwater Publishing',
  'Nan A. Talese',
  'Canongate Books Ltd',
  'Ohio University Press',
  'Diogenes',
  'Gallimard French',
  'John Hunt Publishing, Ltd.',
  'Fischer Taschenbuch Verlag GmbH',
  'Baker Book House',
  'Wizards of the Coast',
  'Simon &amp; Schuster (Trade Division)',
  'Star Trek',
  'John F. Blair Publisher',
  'Livre De Poche French',
  'Price Stern Sloan',
  'Globe Pequot Pr',
  'MacMillan Publishing Company.',
  'Last Knight Pub Co',
  'Alyson Publications',
  'Feltrinelli',
  'Jump at the Sun',
  'Random House Childrens Books',
  'Villard Books',
  'Rowohlt, Reinbek',
  'Suhrkamp',
  'Plaza &amp; Janés',
  'HarperPerennial',
];
const handleOpenDialog = (e) => {
  // Note that the ref is set async, so it might be null at some point
  if (buttonRef.current) {
    buttonRef.current.open(e);
  }
};
const handleSuccess = () => {
  console.log('added with sucess');
};
const handleError = (error) => {
  console.log(error);
};

const handleOnFileLoad = (data) => {
  console.log('---------------------------');
  console.log(data);
  console.log('---------------------------');

  data.forEach((book, index) => {
    if (
      book.data[1] &&
      book.data[2] &&
      book.data[4] &&
      book.data[5] &&
      book.data[6] &&
      book.data[7] &&
      book.data[8] &&
      book.data[9] &&
      book.data[10] &&
      book.data[11] &&
      index >= 5000 &&
      index <= 6000
    ) {
      const randomPublisherNumber = Math.floor(
        Math.random() * publishers.length
      );
      const bookData = {
        isbn: book.data[1],
        title: book.data[2],
        authors: book.data[4].split(';'),
        genres: [book.data[5]],
        publisher: publishers[randomPublisherNumber],
        thumbnail: book.data[6],
        description: book.data[7],
        timestamp: new Date(),
        publicationYear: book.data[8],
        pageCount: book.data[10],
        aviable: true,
        rating: book.data[9],
        ratingCount: book.data[11],
      };
      console.log('book number: ', index);
      // addBookToCollection(bookData, handleSuccess, handleError);
      book.data[4].split(';').forEach((author) => {
        // addBookFilter(author, 'authors');
      });
      // addBookFilter(book.data[5], 'genres');
    }
  });
};

const handleOnError = (err, file, inputElem, reason) => {
  console.log(err);
};

const handleOnRemoveFile = (data) => {
  console.log('---------------------------');
  console.log(data);
  console.log('---------------------------');
};
const buttonRef = React.createRef();

const handleRemoveFile = (e) => {
  // Note that the ref is set async, so it might be null at some point
  if (buttonRef.current) {
    buttonRef.current.removeFile(e);
  }
};
const CSVUpload = () => {
  return (
    <CSVReader
      ref={buttonRef}
      onFileLoad={handleOnFileLoad}
      onError={handleOnError}
      noClick
      noDrag
      header={true}
      onRemoveFile={handleOnRemoveFile}
    >
      {({ file }) => (
        <aside
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: 10,
          }}
        >
          <button
            type="button"
            onClick={handleOpenDialog}
            style={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              width: '40%',
              paddingLeft: 0,
              paddingRight: 0,
            }}
          >
            Browse file
          </button>
          <div
            style={{
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: '#ccc',
              height: 45,
              lineHeight: 2.5,
              marginTop: 5,
              marginBottom: 5,
              paddingLeft: 13,
              paddingTop: 3,
              width: '60%',
            }}
          >
            {file && file.name}
          </div>
          <button
            style={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              paddingLeft: 20,
              paddingRight: 20,
            }}
            onClick={handleRemoveFile}
          >
            Remove
          </button>
        </aside>
      )}
    </CSVReader>
  );
};

export default CSVUpload;
