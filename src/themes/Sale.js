import React  from 'react';
import LiveAuctions from '../components/Auctions/ExploreThree1';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
function Sale ({theme,acc}){
        return (
            <div className={`${theme?"main":"mainwhite"}`}  style={{
                backgroundColor:"#09080D"
            }}>
                <LiveAuctions acc={acc}/>
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }


export default Sale;