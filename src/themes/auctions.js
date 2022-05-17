import React from 'react';
import LiveAuctions from '../components/Auctions/AuctionsOne';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
function Auctions ({theme,acc, web3main , prov}) {
        return (
            <div className={`${theme?"main":"mainwhite"}`}  style={{
                backgroundColor:"#09080D"
            }}>
                <LiveAuctions acc={acc} web3main={web3main} prov={prov} />
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }


export default Auctions;