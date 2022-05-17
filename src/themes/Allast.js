import React from 'react'
import MyExplore from '../components/Explore/Allasset';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
function Mcol({acc,web3main}) {
    return (
        <div className="main">
                <MyExplore allnft={"allnft"} acc={acc} web3main={web3main}/>
               
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
        </div>
    )
}

export default Mcol
