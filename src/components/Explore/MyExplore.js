import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import nft from '../../abi/nft.json'

import { addrs } from '../../abi/address'
import { Link } from 'react-router-dom';

function MyExplore({acc}) {
    const [alldatan, setalldatan] = useState([])
    const [accountid, setaccountid] = useState()

    useEffect(async () => {
        if(acc){
        const accounts1 = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setaccountid(accounts1)

        }
    }, [acc])


    useEffect(() => {
       
        if(acc){
            collectionarray()

        }


    }, [acc])
    const collectionarray = async () => {
        if (acc && window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)
            swaping.methods.totalCollectionDetails().call({ from: userwalletaddresss })
                .then((fees) => {
                    
                    for (let i = 0; i < fees?.length; i++) {
                        
                        collectiondetailsnew(fees[i])
                        

                    }
                })
                .catch()

        }
    }
    const collectiondetailsnew = async (id) => {
        if (acc && window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)

            swaping.methods.collectionDetails(id).call({ from: userwalletaddresss })
                .then((fees) => {
                    
                    getalllist(fees)


                }).catch()

        }
    }
    const getalllist = (data) => {
        setalldatan((old) => [
            ...old, data
        ])


    }
console.log('sss',alldatan)

    return (

        <section className="popular-collections-area py-5">
            <div className="container ">
                <div className="row">
                    <div className="col-12">
                        {/* Intro */}
                        <div className="intro d-flex justify-content-between align-items-end m-0">
                            <div className="intro-content">
                                <span>My Collections</span>
                                <h3 className="mt-3 mb-0">My Collections</h3>
                            </div>
                            {/* <div className="intro-btn">
                                    <a className="btn content-btn text-left" href="/explore-2">{this.state.data.btnText}</a>
                                </div> */}
                        </div>
                    </div>
                </div>
                <div className="row items">
                    {alldatan.map((val, idx) => {
                        return (
                            <>{
                                

                                <div key={`cd_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                                <div className="card no-hover text-center">
                                    <div className="image-over p-3" >
                                    <Link to={`/col-details/${val[0]}`} >
                                                <img className="card-img-top" style={{height:'170px'}}  src={`${val ? `https://gateway.pinata.cloud/ipfs/${val[6]} `: null}`} alt="" />
                                            </Link>
                                        {/* Seller */}
                                        <Link className="seller" to={`/col-details/${val[0]}`} >
                                        
                                            <div className="seller-thumb avatar-lg">
                                                <img className="rounded-circle"src={`${val ? `https://gateway.pinata.cloud/ipfs/${val[6]} `: null}`} alt="" />
                                            </div>
                                        </Link>
                                    </div>
                                    {/* Card Caption */}
                                    <div className="card-caption col-12 p-0 pt-2">
                                        {/* Card Body */}
                                        <div className="card-body mt-4">
                                        <Link to={`/col-details/${val[0]}`} >
                                                    <h5 style={{fontSize:'20px',marginTop:'15px'}} className="mb-0">{val ? val[2] : null}</h5>
                                                </Link>
                                                <span style={{fontSize:'18px',marginTop:'0px',color:'#8E8E8E'}}>{val ? val[3] : null}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            }
                            </>
                        );
                    })}
                </div>
                
                            
            </div>
        </section>
    );
}


export default MyExplore;