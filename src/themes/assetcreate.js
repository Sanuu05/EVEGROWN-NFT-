import React from 'react';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
import Astcreate from '../components/Create/Astcreate';

function Assetcreate ({theme,acc}) {
    
        return (
            <div className={`${theme?"main":"mainwhite"}`}  style={{
                backgroundColor:"#09080D"
            }}>
                
                <Astcreate acc={acc} />
                {/* <MyExplore acc={acc}/> */}
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    } 


export default Assetcreate;