import React, { Component } from 'react';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import SignupSection from '../components/Signup/Signup';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

class Signup extends Component {
    render() {
        return (
            <div className="main">
                <Breadcrumb title="Signup" subpage="Pages" page="Signup" />
                <SignupSection />
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }
}

export default Signup;