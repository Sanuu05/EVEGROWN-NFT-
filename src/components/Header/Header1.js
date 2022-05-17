import React, { useEffect, useState } from 'react';
import logo from './nft-logo.png'
import { NavLink } from 'react-router-dom';
import Web3 from 'web3';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import { BsWallet } from "react-icons/bs";
let web3Modal;
let provider;
let selectedAccount;
function init() {
    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider,
            options: {
                // Mikko's test key - don't copy as your mileage may vary
                // infuraId: "8043bb2cf99347b1bfadfb233c5325c0",
                rpc: {
                    56: "https://bsc-dataseed.binance.org/"
                },
                chainId: 56
            }
        },


    };

    web3Modal = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: true, // optional
        providerOptions // required
    });

    window.w3m = web3Modal;
}

async function fetchAccountData() {
    const web3Provider = new ethers.providers.Web3Provider(provider);
    const signer = web3Provider.getSigner();
    selectedAccount = await signer.getAddress();

    return selectedAccount;
}

async function refreshAccountData() {
    await fetchAccountData(provider);
}

async function onConnect() {
    try {
        provider = await web3Modal.connect();
    } catch (e) {
        return;
    }
   

    provider.on("accountsChanged", (accounts) => {
        fetchAccountData();
    });

    provider.on("chainChanged", (chainId) => {
        fetchAccountData();
    });

    provider.on("networkChanged", (networkId) => {
        fetchAccountData();
    });
    window.location.reload()

    await refreshAccountData();
}



async function disconnet() {
    try {
        await web3Modal.clearCachedProvider();
        window.location.reload()
    } catch (e) {
        return;
    }


}
const Header = ({ change, theme, web3m, provider1 }) => {
    const [accountid, setaccountid] = useState()
    const [acc, setacc] = useState()
    useEffect(async () => {

        if (acc) {
            // const accounts1 = await window.ethereum.request({ method: 'eth_requestAccounts' });
            // setaccountid(accounts1[0])
            provider = await web3Modal.connect();
            const web3 = new Web3(provider);
            const accounts = await web3.eth.getAccounts();
            console.log('dddd',accounts)
            web3m(web3)
            setaccountid(accounts[0])
            provider1(provider)


        }


    }, [acc]);
    useEffect(() => {
        init();
        change(false)
        if (web3Modal.cachedProvider) {
            setacc(true)
            change(true)
        }
    }, []);


    return (
        <header id={`${theme ? "header" : "headernew"}`} >
            {/* Navbar */}
            <nav data-aos="zoom-out" data-aos-delay={800} className="navbar navbar-expand">
                <div className="container header">
                    {/* Navbar Brand*/}
                    <a className="navbar-brand" href="/">
                        <img className="navbar-brand-sticky" src={logo} alt="sticky brand-logo" />
                    </a>
                    <div className="ml-auto" />
                    {/* Navbar */}
                    <ul className="navbar-nav items mx-auto">
                        <li className="nav-item dropdown">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>


                        <li className="nav-item dropdown">
                            <a className="nav-link" >Explore <i className="fas fa-angle-down ml-1" /></a>
                            <ul className="dropdown-menu">
                                <li className="nav-item dd"><NavLink to="/auctions" className="nav-link">Live Auctions</NavLink></li>
                                <li className="nav-item dd"><NavLink to="/sale" className="nav-link">Sale</NavLink></li>
                                {/* <li className="nav-item dd"><a href="/explore-1" className="nav-link">Explore Style 1</a></li>
                                <li className="nav-item dd"><a href="/explore-2" className="nav-link">Explore Style 2</a></li>
                                <li className="nav-item dd"><a href="/explore-3" className="nav-link">Explore Style 3</a></li>
                                <li className="nav-item dd"><a href="/explore-4" className="nav-link">Explore Style 4</a></li> */}
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link" >Create <i className="fas fa-angle-down ml-1" /></a>
                            <ul className="dropdown-menu">
                                <li className="nav-item dd"><NavLink to="/create" className="nav-link">Collection</NavLink></li>
                                <li className="nav-item dd"><NavLink to="/assetcreate" className="nav-link">NFT</NavLink></li>
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
                        {/* <li className="nav-item dropdown">
                            <a className="nav-link" href="#">Community <i className="fas fa-angle-down ml-1" /></a>
                            <ul className="dropdown-menu">
                                <li className="nav-item"><a href="/blog" className="nav-link">Blog</a></li>
                                <li className="nav-item"><a href="/blog-single" className="nav-link">Blog Single</a></li>
                                <li className="nav-item"><a href="/help-center" className="nav-link">Help Center</a></li>
                            </ul>
                        </li> */}
                        {/* <li className="nav-item dropdown">
                            <a className="nav-link" href="#">Pages <i className="fas fa-angle-down ml-1" /></a>
                            <ul className="dropdown-menu">
                                <li className="nav-item"><a href="/authors" className="nav-link">Authors</a></li>
                                <li className="nav-item"><a href="/author" className="nav-link">Author</a></li>
                                <li className="nav-item"><a href="/wallet-connect" className="nav-link">Wallet Connect</a></li>
                                <a href="/activity" className="nav-link">Activity</a>
                                <li className="nav-item"><a href="/login" className="nav-link">Login</a></li>
                                <li className="nav-item"><a href="/signup" className="nav-link">Signup</a></li>
                            </ul>
                        </li> */}
                    </ul>

                    <ul className="navbar-nav toggle" style={{ color: 'black' }}>
                        <li className="nav-item">
                            <a href="#" className="nav-link" data-toggle="modal" data-target="#menu">
                                <i className="fas fa-bars toggle-icon m-0" />
                            </a>
                        </li>
                    </ul>
                    {/* Navbar Action Button */}

                    <ul className="navbar-nav action">
                        <li className="nav-item ml-3">
                            {acc ?
                                <>  <a className="btn ml-lg-auto btn-bordered-white" style={{ fontSize: '15px', width: '180px', wordBreak: 'break-all' }}>{accountid?.slice(0, 3)}.....{accountid?.slice(-3)}<br /></a>
                                    <a onClick={disconnet} className="btn ml-lg-2 btn-bordered-white">Logout</a>
                                </> : <a onClick={onConnect} className="btn ml-lg-auto btn-bordered-white">Wallet Connect</a>

                            }

                        </li>
                    </ul>
                </div>
            </nav>

        </header>
    );
};

export default Header;