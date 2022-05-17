import React, {  useEffect, useState } from 'react';
import {Link,useParams } from 'react-router-dom';
import nft from '../../abi/nft.json'
import Web3 from 'web3'
import {addrs} from '../../abi/address'
import {useMoralisQuery } from "react-moralis";
import ExploreFive from '../../components/Explore/Myasset';
import Allasset from '../Explore/Allasset'




function Colmaindetail({acc}) {
    const [accountid, setaccountid] = useState()
    const {colid} = useParams()
    const [mfdata,setfmadata] =useState()
    const [chain, setchain] = useState()
    
    useEffect(async () => {
        if(acc){

        
        const accounts1 = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setaccountid(accounts1)
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        setchain(chainId)
        }

    }, [acc])
    useEffect(()=>{
        if(acc){
        collectiondetailsnew(colid)
        }

    },[colid,acc])

    useEffect(async () => {
        if(acc){
        const accounts1 = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setaccountid(accounts1[0])
        }

    }, [acc])
    

    const collectiondetailsnew = async (id) => {
        if (acc && window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)

            swaping.methods.collectionDetails(id).call({ from: userwalletaddresss })
                .then((fees) => {
                    setfmadata(fees)


                }).catch()

        }
    }
    const dataa = useMoralisQuery('NEWCREATECOLONE')
    const ffindcol = dataa?.data?.find((v) => v?.attributes?.collectionId ===(colid))
    console.log('fff',dataa?.data)
    


    return (
        
        <>
        
        { 
            ffindcol && !mfdata ?<>
            <section className="item-details-area">
                    <div className="container" style={{ backgroundColor: "transparent",borderRadius:'30px 20px' }}> 
                        <div className="row justify-content-between">
                            <div className="col-12 col-lg-5">
                                <div className="item-info">
                                <div className="item-thumb coll-img text-center" style={{height:'450px'}}>
                                        <img src={`https://gateway.pinata.cloud/ipfs/${ffindcol?.attributes ? ffindcol?.attributes?.collectionImg : null}`} alt="" style={{height:'450px',objectFit:'contain'}} />
                                    </div>
                                   
    
                                    <div className="tab-content" id="nav-tabContent">
    
    
                                        <div className="tab-pane fade" id="nav-profile">
                                            <ul className="list-unstyled">
                                                {/* Single Tab List */}
                                               
                                            </ul>
                                        </div>
                                        <div className="tab-pane fade" id="nav-contact">
                                            {/* Single Tab List */}
                                            <div className="owner-meta d-flex align-items-center mt-3">
                                                <span>Owner</span>
                                                <a className="owner d-flex align-items-center ml-2" href="/author">
                                                    {/* <img className="avatar-sm rounded-circle" src={this.state.initData.ownerImg} alt="" /> */}
                                                    <h6 className="ml-2" style={{color:"black"}}>{ffindcol?.attributes.collectionName}</h6>
                                                </a>
                                            </div>
                                            <p className="mt-2">Created :{ffindcol?.attributes ? ffindcol?.attributes[4] : null}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6 pt-2">
                                {/* Content */}
                                <div className="content mt-5 mt-lg-0">
                                    <h3 className="m-0" style={{fontSize:'50px',color:'#99B7FF',textTransform:'capitalize'}}>{ffindcol?.attributes?ffindcol?.attributes.collectionName:null}</h3>
                                    
                                    <p style={{color:"black"}}>{ffindcol?.attributes ? ffindcol?.attributes[5] : null}</p>
                                    <h3 className="m-0" style={{fontSize:'15px',color:'black',textTransform:'capitalize'}}>{ffindcol?.attributes?ffindcol?.attributes.collectionDescription:null}</h3>
                                    <p style={{color:"black"}}>{ffindcol?.attributes?ffindcol?.attributes.websiteUrl:null}</p>
                                    
                                    {/* Owner */}
                                    <div className="owner d-flex align-items-center">
                                        <span>Owned By</span>
                                        <a className="owner-meta d-flex align-items-center ml-3">
                                            <img className="avatar-sm rounded-circle" src={`https://gateway.pinata.cloud/ipfs/${ffindcol?.attributes ? ffindcol?.attributes.collectionImg : null}`} alt="" />
                                            <h6 style={{color:"black"}} className="ml-2">{ffindcol?.attributes?ffindcol?.attributes.displayName:null}</h6>
                                        </a>
                                    </div>
                                 
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Allasset/>
            </>:
            !mfdata?null:
             <>
        

            <section className="item-details-area">
                <div className="container" style={{ backgroundColor: "transparent",borderRadius:'30px 20px' }}> 
                    <div className="row justify-content-between">
                        <div className="col-12 col-lg-5">
                            <div className="item-info">
                            <div className="item-thumb coll-img text-center" style={{height:'450px'}}>
                                    <img src={`${mfdata ? `https://gateway.pinata.cloud/ipfs/${mfdata[6]} `: null}`} alt="" style={{height:'450px',objectFit:'contain'}} />
                                </div>
                               

                                <div className="tab-content" id="nav-tabContent">


                                
                                    <div className="tab-pane fade" id="nav-contact">
                                        {/* Single Tab List */}
                                        <div className="owner-meta d-flex align-items-center mt-3">
                                            <span>Owner</span>
                                            <a className="owner d-flex align-items-center ml-2" href="/author">
                                                <h6 className="ml-2" style={{color:"black"}}>{mfdata ? mfdata[2] : null}</h6>
                                            </a>
                                        </div>
                                        <p className="mt-2">Created :{mfdata ? mfdata[4] : null}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 pt-2">
                            {/* Content */}
                            <div className="content mt-5 mt-lg-0">
                                <h3 className="m-0" style={{fontSize:'50px',color:'#99B7FF',textTransform:'capitalize'}}>{mfdata ? mfdata[2] : null}</h3>
                                
                                <p style={{color:"black"}}>{mfdata ? mfdata[5] : null}</p>
                                <h3 className="m-0" style={{fontSize:'15px',color:'black',textTransform:'capitalize'}}>{mfdata ? mfdata[3] : null}</h3>
                                <p style={{color:"black"}}>{mfdata ? mfdata[4] : null}</p>
                                
                                {/* Owner */}
                                <div className="owner d-flex align-items-center">
                                    <span>Owned By</span>
                                    <a className="owner-meta d-flex align-items-center ml-3">
                                        <img className="avatar-sm rounded-circle" src={`${mfdata ? `https://gateway.pinata.cloud/ipfs/${mfdata[6]} `: null}`} alt="" />
                                        <h6 style={{color:"black"}} className="ml-2">{mfdata ? mfdata[2] : null}</h6>
                                    </a>
                                </div>
                                {/* Item Info List */}

                                {
                                    mfdata[1]? mfdata[1]?.toLowerCase() === accountid?

                                        <Link className="btn w-100 mt-3 mt-sm-4" to={{pathname:"/assetcreate",state:mfdata}}>Create new Asset</Link> :null:null
                                        }

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ExploreFive colid={mfdata?mfdata[0]:null} />

        </>
        }
        </>
      
    );
}


export default Colmaindetail;