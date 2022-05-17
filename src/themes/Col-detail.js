import React, { Component, useState } from 'react';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
import Colmaindetail from '../components/ItemDetails/Coldetail';
// import ExploreFive from '../components/Explore/ExploreTwo';
 function Coldetails({theme,acc}) {
  

        return (
            <div className={`${theme?"main":"mainwhite"}`} style={{
                backgroundColor:"rgb(25,25,25)"
            }}>
                <Colmaindetail acc={acc}/>
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }


export default Coldetails;