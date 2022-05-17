import React from 'react';
import ItemDetail from '../components/ItemDetails/ItemDetails';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

function ItemDetails ({theme,acc,web3main}) {
   
        return (
            <div className={`${theme?"main":"mainwhite"}`} style={{
                backgroundColor:'rgb(25,25,25)'
            }}>
                
                <ItemDetail acc={acc} web3main={web3main}/>
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }


export default ItemDetails;