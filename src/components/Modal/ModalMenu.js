import React from 'react';
import { NavLink } from 'react-router-dom';

const ModalMenu = () => {
    return (
        <div id="menu" className="modal fade p-0" style={{color:'black'}}>
            <div className="modal-dialog dialog-animated">
                <div className="modal-content h-100">
                    <div className="modal-header" data-dismiss="modal">
                        Menu <i className="far fa-times-circle icon-close" style={{color:'white'}} />
                    </div>
                    <div className="menu modal-body">
                        <div className="row w-100">
                            {/* <div className="items p-0 col-12 text-center" /> */}
                            <ul className="navbar-nav items mx-auto">
                        <li className="nav-item dropdown">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>


                        <li className="nav-item dropdown">
                            <a className="nav-link" >Explore <i className="fas fa-angle-down ml-1" /></a>
                            <ul className="dropdown-menu">
                                <li className="nav-item dd"><NavLink to="/auctions" className="nav-link">Live Auctions</NavLink></li>
                                <li className="nav-item dd"><NavLink to="/sale" className="nav-link">Sale</NavLink></li>
                                <li className="nav-item dd"><a href="/explore-1" className="nav-link">Explore Style 1</a></li>
                                <li className="nav-item dd"><a href="/explore-2" className="nav-link">Explore Style 2</a></li>
                                <li className="nav-item dd"><a href="/explore-3" className="nav-link">Explore Style 3</a></li>
                                <li className="nav-item dd"><a href="/explore-4" className="nav-link">Explore Style 4</a></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link" >Create <i className="fas fa-angle-down ml-1" /></a>
                            <ul className="dropdown-menu">
                                <li className="nav-item dd"><NavLink to="/create" className="nav-link">Collection</NavLink></li>
                                <li className="nav-item dd"><NavLink to="/assetcreate" className="nav-link">NFT</NavLink></li>
                                \
                            </ul>
                        </li>


                        <li className="nav-item">
                            <NavLink to="/mycollection" className="nav-link">My collection</NavLink>
                        </li>
                        {/* <li className="nav-item">
                            <NavLink to="/create" className="nav-link">Create</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/assetcreate" className="nav-link">Create Asset</NavLink>
                        </li> */}
                        <li className="nav-item dropdown">
                            <a className="nav-link" href="#">Community <i className="fas fa-angle-down ml-1" /></a>
                            <ul className="dropdown-menu">
                                <li className="nav-item"><a href="/blog" className="nav-link">Blog</a></li>
                                <li className="nav-item"><a href="/blog-single" className="nav-link">Blog Single</a></li>
                                <li className="nav-item"><a href="/help-center" className="nav-link">Help Center</a></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link" href="#">Pages <i className="fas fa-angle-down ml-1" /></a>
                            <ul className="dropdown-menu">
                                <li className="nav-item"><a href="/authors" className="nav-link">Authors</a></li>
                                <li className="nav-item"><a href="/author" className="nav-link">Author</a></li>
                                <li className="nav-item"><a href="/wallet-connect" className="nav-link">Wallet Connect</a></li>
                                <a href="/activity" className="nav-link">Activity</a>
                                <li className="nav-item"><a href="/login" className="nav-link">Login</a></li>
                                <li className="nav-item"><a href="/signup" className="nav-link">Signup</a></li>
                            </ul>
                        </li>
                    </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalMenu;