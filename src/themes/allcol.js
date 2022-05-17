import React, { Component } from 'react';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
import Collections from '../components/Collections/Collections';

function Allcol ({acc}) {
    
        return (
            <div className="main">
                <Collections acc={acc}/> 
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    
}

export default Allcol;