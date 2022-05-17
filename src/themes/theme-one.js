import React from 'react';
import Hero from '../components/Hero/Hero';
import Auctions from '../components/Auctions/AuctionsOne';
import Collections from '../components/Collections/Collections';
import Explore from '../components/Auctions/ExploreThree1';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
import Allast from '../components/Explore/Allasset'

function ThemeOne ({acc,web3main}) {
    console.log('jjj',web3main)
    
        return (
            <div className="main">
                
                <Hero />
                <Auctions cut="cut" acc={acc}  web3main={web3main}/>
               
                <Collections cut="cut" acc={acc} />
                <Explore cut="cut" acc={acc} />
                <Allast web3main={web3main} acc={acc} />
               
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }

export default ThemeOne;