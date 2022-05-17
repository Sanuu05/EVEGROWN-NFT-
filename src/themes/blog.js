import React, { Component } from 'react';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import BlogSection from '../components/Blog/Blog';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

class Blog extends Component {
    render() {
        return (
            <div className="main">
                <Breadcrumb title="Blog" subpage="Community" page="Blog" />
                <BlogSection />
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }
}

export default Blog;