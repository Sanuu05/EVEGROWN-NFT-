import React from 'react';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Creates from '../components/Create/Create';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

function Create ({theme,acc}) {
 
        return (
            <div className={`${theme?"main":"mainwhite"}`}  style={{
                backgroundColor:"#09080D"
            }}>
                <Creates acc={acc} />
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }


export default Create;