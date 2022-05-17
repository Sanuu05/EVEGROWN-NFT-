import React from 'react'
import MyExplore from '../components/Explore/MyExplore';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
function Mcol({theme,acc}) {
    // const [theme,settheme] = useState(true)
    
    // const onc=()=>{
    //     settheme(!theme)
    // }
    return (
        <div className={`${theme?"main mycol":"mainwhite mycol"}`} style={{
            backgroundColor:"rgb(25,25,25)"
        }}>
                <MyExplore acc={acc}/>
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
        </div>
    )
}

export default Mcol
