import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ExploreOne from "../themes/explore-one";
import ExploreThree from "../themes/explore-three";
import ExploreFour from "../themes/explore-four";
import Mcol from "../themes/Mcol";
import Activity from "../themes/activity";
import Coldetails from "../themes/Col-detail";
import Auctions from "../themes/auctions";
import ItemDetails from "../themes/item-details";
import Assetcreate from "../themes/assetcreate";
import ExploreTwo from "../themes/explore-two";
import Create from "../themes/create";
import Profile from "../themes/theme-one";
import Blog from "../themes/blog";
import BlogSingle from "../themes/blog-single";
import HelpCenter from "../themes/help-center";
import Authors from "../themes/authors";
import Author from "../themes/author";
import WalletConnect from "../themes/wallet-connect";
import Sale from "../themes/Sale";
import Header from '../components/Header/Header1'
import Allcol from "../themes/allcol";
import Login from "../themes/login";
import Signup from "../themes/signup";
import Contact from "../themes/contact";
import Alllast from "../themes/Allast";
import ScrollToTop from "../ScrollToTop";
import { Modal } from 'react-bootstrap'


function MyRouts() {
  const [theme, settheme] = useState(true)
  const [accountid, setaccountid] = useState()
  const [accountid1, setaccountid1] = useState()
  const [chainid, setchainid] = useState()
  const [show, setShow] = useState(false);
  const [web3main, setweb3main] = useState()
  const handleClose = () => setShow(false);
  const [prov,setprov] = useState()


  const [acc, setacc] = useState(false)
  const change = ((v) => {

    setacc(v)
  })
  const web3m = ((v)=>{
    setweb3main(v)
    
  })
  const provider1=((v)=>{
    setprov(v)
  })




  useEffect(async () => {

    if (acc) {
      const accounts1 = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setaccountid1(accounts1[0])
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });


      setchainid(chainId)
      const accountsa = await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x61' }], // chainId must be in hexadecimal numbers
      });


      await window.ethereum.on('chainChanged', (chainId) => {
        window.location.reload();
      });
    }



  }, [acc]);
  useEffect(() => {
    if (accountid != accountid1) {
      window.location.reload()
      // history.push('/')
    }

  }, [accountid])



  useEffect(() => {
    if (accountid1 && chainid) {

      chainid == "0x61" ? setShow(false) : setShow(true)
    }

  }, [accountid1, chainid])
  useEffect(async () => {
    if (acc) {
      const accounts1 = await window.ethereum.request({ method: 'eth_requestAccounts' });

      if (acc && window.ethereum) {
        async function getAccount() {
          const accounts = await window.ethereum.enable();
          const account = accounts[0];

        }


        window.ethereum.on('accountsChanged', function (accounts) {
          console.log("account", accounts)
          getAccount();
        })
      }
    }
  }, [])
  console.log('web3m',web3main)

  return (
    <>
      <div>
        {/* <Router> */}

        <ScrollToTop />
        <Header theme={theme} change={change} web3m={web3m} provider1={provider1} />
        <Switch>
          <Route exact path="/explore-1" component={ExploreOne}  />
          <Route exact path="/explore-2" component={ExploreTwo} />
          <Route exact path="/explore-3" component={ExploreThree} />
          <Route exact path="/explore-4" component={ExploreFour} />
          <Route exact path="/activity" component={Activity} />
          <Route exact path="/blog" component={Blog} />
          <Route exact path="/blog-single" component={BlogSingle} />
          <Route exact path="/help-center" component={HelpCenter} />
          <Route exact path="/authors" component={Authors} />
          <Route exact path="/author" component={Author} />
          <Route exact path="/wallet-connect" component={WalletConnect} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/contact" component={Contact} />

          {/* change={onc} */}
          <Route exact path="/" >
            <Profile theme={theme} acc={acc} web3main={web3main} prov={prov}  />
          </Route>
          <Route exact path="/auctions" >
            <Auctions theme={theme} acc={acc} web3main={web3main} />
          </Route>
          <Route exact path="/item-details/:nftid">
            <ItemDetails theme={theme} acc={acc} web3main={web3main} prov={prov}/>
          </Route>
          <Route exact path="/sale">
            <Sale theme={theme} acc={acc} web3main={web3main} prov={prov} />
          </Route>
          <Route exact path="/create"  >
            <Create theme={theme} acc={acc} web3main={web3main} prov={prov} />
          </Route>
          <Route exact path="/mycollection" >
            <Mcol theme={theme} acc={acc} web3main={web3main} prov={prov} />
          </Route>
          <Route exact path="/assetcreate" >
            <Assetcreate theme={theme} acc={acc} web3main={web3main} prov={prov} />
          </Route>
          <Route exact path="/col-details/:colid" >
            <Coldetails theme={theme} acc={acc} web3main={web3main} prov={prov} />
          </Route>
          <Route exact path="/allcol" >
            <Allcol acc={acc} web3main={web3main} prov={prov} />
          </Route>
          <Route exact path="/allnft" >
            <Alllast acc={acc} web3main={web3main} prov={prov} />
          </Route>

        </Switch>
        {/* </Router> */}
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >

        <Modal.Body>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h5>Switch Wallet to Smart Chain-Testnet</h5>

          </div>

        </Modal.Body>
      </Modal>
    </>
  );
}

export default MyRouts;