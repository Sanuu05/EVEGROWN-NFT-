import React from 'react';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb1';
import Explore from '../components/Explore/ExploreThree1';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
import ProfileDetails from '../components/ProfileDetails';

function ExploreOne ({theme}) {
    // const [theme,settheme] = useState(false)
    
    // const onc=()=>{
    //     settheme(!theme)
    // }
        return (
            <div className={`${theme?"main":"mainwhite"}`}  style={{
                backgroundColor:"#09080D"
            }}>
                
                <Breadcrumb title="Explore" subpage="Explore" page="Explore Style 1" />
                
                <div className="displayFlex container-fluid">
                    <div className="row">
                    <div className="col-md-4">
                    <ProfileDetails />
                    </div>
                    <div className="col-md-8">
                        <Explore />
                    </div>
                    

                    </div>
                    

                    
                  
                </div>
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }

export default ExploreOne;