import CheckBox from 'Components/Common/CheckBox/CheckBox';
import { useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import styles from './MultiselectFilter.module.scss';

const genres = [
  'Action',
  'Action Adventure',
  'Adventure',
  'Alternate History',
  'Apocalyptic',
  'Biographical ',
  'Black Comedy',
  'Chick Lit',
  'Christian ',
  'Comedy',
  'Coming of Age ',
  'Commercial ',
  'Contemporary Fantasy',
  'Contemporary ',
  'Contemporary Realistic ',
  'Crime ',
  'Dark Fantasy',
  'Detective ',
  'Disaster Thriller',
  'Drama ',
  'Dystopian',
  'Epic ',
  'Erotic ',
  'Espionage',
  'Ethnic ',
  'Faction',
  'Fable',
  'Fairy Tale',
  'Family Saga',
  'Fan ',
  'Fantasy',
  'Flash ',
  'Folktale',
  'Gangster ',
  'Gay ',
  'General ',
  'Ghost Story',
  'Glitz ',
  'Gothic ',
  'Graphic Novel',
  'Hardboiled Crime ',
  'Historical ',
  'Horror',
  'Inspirational ',
  'Legal ',
  'Lesbian ',
  'Literary ',
  'Magical Realism',
  'Mainstream ',
  'Military ',
  'Modern ',
  'Monster ',
  'Multicultural ',
  'Murder Mystery',
  'Mystery',
  'Mythic ',
  'Narrative ',
  'New Adult',
  'Noir',
  'Occult ',
  'Paranoid ',
  'Paranormal ',
  'Parody',
  'Period Piece ',
  'Philosophical ',
  'Poetry',
  'Police Procedural',
  'Political ',
  'Post-Apocalyptic',
  'Prose',
  'Psychological ',
  'Psychological Thriller',
  'Pulp ',
  'Realistic ',
  'Religious ',
  'Romance',
  'Romantic Comedy',
  'Satirical ',
  'Science ',
  'Short Story',
  'Slasher ',
  'Slice of Life ',
  'Southern ',
  'Southern Gothic',
  'Speculative ',
  'Sports ',
  'Spy ',
  'Steampunk ',
  'Supernatural ',
  'Survival ',
  'Suspense',
  'Techno-thriller',
  'Thriller',
  'Tragedy',
  'Urban Fantasy',
  'Upmarket ',
  'Urban ',
  'Utopian ',
  'Vampire ',
  'Werewolf ',
  'Western',
  'Whodunit ',
  'Women’s ',
  'Animals and Pets',
  'Architecture ',
  'Art ',
  'Autobiography',
  'Beauty ',
  'Biography',
  'Business ',
  'Celebrity ',
  'Child Guidance ',
  'Christian ',
  'Computer ',
  'Cookbook',
  'Cooking ',
  'Crafts ',
  'Creative ',
  'Cultural and Social Issues',
  'Current Affairs and Events',
  'Dating ',
  'Design ',
  'Diet ',
  'Economics ',
  'Education ',
  'Entertainment ',
  'Environment ',
  'Ethnic ',
  'Family ',
  'Fashion ',
  'Film ',
  'Finance and Money',
  'Fitness ',
  'Food and Drinks ',
  'Gardening ',
  'Gay ',
  'General ',
  'Gift and Novelty',
  'Government',
  'Health ',
  'History',
  'How-to',
  'Humor ',
  'Inspirational ',
  'Investigative ',
  'Journalism ',
  'Legal ',
  'Lesbian ',
  'Lifestyle',
  'Medical and Medicine',
  'Memoir Definition',
  'Military ',
  'Mind, Body, Spirit',
  'Multicultural ',
  'Music ',
  'Narrative ',
  'Nature ',
  'New Adult ',
  'New Age ',
  'Nutrition',
  'Parenting',
  'Personal Development',
  'Philosophy',
  'Photography',
  'Political ',
  'Pop Culture',
  'Practical ',
  'Prescriptive ',
  'Psychology',
  'Reference',
  'Relationship',
  'Religious ',
  'Science',
  'Self Help',
  'Sexuality',
  'Spirituality',
  'Sports',
  'Style',
  'Technology',
  'Travel',
  'True Adventure',
  'True Crime',
  'Upmarket ',
  'War',
  'Wellness',
  'Women’s Issues',
  'Picture ',
  'Chapter s for Kids',
  'Juvenile ',
  'Juvenile  Definition',
  'Middle Grade ',
  'Young Adult',
];

const MultiselectFilter = () => {
  const [checkedState, setCheckedState] = useState(
    new Array(genres.length).fill(false)
  );
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    console.log(checkedState);
  };

  const {
    multiSelectContainer,
    multiSelectHeader,
    multiSelectTitle,
    expandIcon,
    multiSelectorOptionsContainer,
    noHeight,
  } = styles;
  return (
    <div className={multiSelectContainer}>
      <div className={multiSelectHeader}>
        <h4 className={multiSelectTitle}>GENRES</h4>
        {isExpanded ? (
          <AiOutlineMinus className={expandIcon} onClick={toggleExpanded} />
        ) : (
          <AiOutlinePlus className={expandIcon} onClick={toggleExpanded} />
        )}
      </div>
      <div
        className={
          isExpanded
            ? multiSelectorOptionsContainer
            : `${multiSelectorOptionsContainer} ${noHeight}`
        }
      >
        <Scrollbars
          autoHeight
          autoHeightMin={250}
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          renderTrackHorizontal={(props) => (
            <div {...props} style={{ display: 'none' }} />
          )}
        >
          {genres.map((element, index) => (
            <CheckBox
              name={element}
              onChange={() => {
                handleOnChange(index);
              }}
              isChecked={checkedState[index]}
              label={element}
            />
          ))}
        </Scrollbars>
      </div>
    </div>
  );
};

export default MultiselectFilter;
