import Header from "Components/Common/Header/Header";

import headerLogo from 'assets/headerImages/homePageLogo.svg'

const Home = () => {
    return ( 
    <div>
        <Header {...{headerLogo}} />
    </div> );
}
 
export default Home;