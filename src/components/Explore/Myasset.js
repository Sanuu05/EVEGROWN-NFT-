import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Web3 from 'web3'
import nft from '../../abi/nft.json'
import { Link } from 'react-router-dom';

import { addrs } from '../../abi/address'

function Myasset({ colid, ckkid }) {
    const [allasset, setallasset] = useState([])
    const [accountid, setaccountid] = useState()
    useEffect(async () => {
        const accounts1 = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setaccountid(accounts1)
        // totalnft()
    }, [])

    useEffect(() => {
        nftarray(colid)

    }, [])
    const nftarray = async (collectionid) => {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)
            swaping.methods.collectionNft(collectionid).call({ from: userwalletaddresss })
                .then((fees) => {
                    for (let i = 0; i < fees?.length; i++) {
                        nftinfo(fees[i])

                    }
                }).catch()

        }
    }

    const nftinfo = async (id) => {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)

            swaping.methods.nftInformation(id).call({ from: userwalletaddresss })
                .then((fees) => {

                    swaping.methods.listOfSaleNft(fees[0]).call({ from: userwalletaddresss })
                        .then((length) => {
                            swaping.methods.everGrowCoin(id).call({ from: userwalletaddresss })
                                .then((value) => {
                                    swaping.methods.properties(id).call({ from: userwalletaddresss })
                                    .then((recipt) => {
                                        
                                        // ffind?.set('prop',[recipt]).save().then(v=>console.log('pdone',v))
                        
                                    
                                        callasset({ ...fees, 10: length[3], 11: length[2] ,12:value,20:recipt? (JSON.parse(recipt[recipt?.length-1])[1]):null})
                                    })
                                    
                                    
                                })
                           
                        })
                        .catch()



                }).catch()

        }
    }
    const callasset = (data) => {
        setallasset((old) => [
            ...old, data
        ])
    }


    return (
        <section className="explore-area ">
            <div className="container">
               
                <div className="intro d-flex justify-content-between align-items-end m-0">
                    <div className="intro-content">
                        <span>My Assets</span>
                        <h3 className="mt-3 mb-0">My Assets</h3>
                    </div>
                </div>
                <div className="row items">
                    {allasset.map((item, idx) => {
                        return (
                            <div key={`exo_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                            <div className="card">
                                <div className="image-over" style={{padding:'20px'}}>
                                <div style={{minHeight: '230px'}} >
                                {
                                                     (item[20]=== "video/mp4" || item[20]=== "video/mov") || item[20]=== "video/webm"?
                                                     <Link to={`/item-details/${item[0]}`} >
                                                    <video className="card-img-top" src={`${item ? `https://gateway.pinata.cloud/ipfs/${item[6]} ` : null}`} style={{ height: '220px', borderRadius: '7px' }} alt="" autoPlay loop />
                                                </Link>
                                                :null
                                                }
                                                {
                                                     ( item[20] === "image/jpeg" || item[20] ==="image/png" || item[20] ==="image/gif" || item[20] ==="image/svg" || item[20] ==="image/jpg" )?
                                                     <Link to={`/item-details/${item[0]}`} >
                                                    <img className="card-img-top" src={`${item ? `https://gateway.pinata.cloud/ipfs/${item[6]} ` : null}`} style={{ height: '220px', borderRadius: '7px' }} alt=""  />
                                                </Link>
                                                :null
                                                }
                                                 {
                                                     ( item[20] === "audio/mpeg" )?
                                                     <Link to={`/item-details/${item[0]}`} >
                                                    <audio className="card-img-top" src={`${item ? `https://gateway.pinata.cloud/ipfs/${item[6]} ` : null}`} controls />
                                                </Link>
                                                :null
                                                }
                                                </div>
                                </div>
                                {/* Card Caption */}
                                <div className="card-caption col-12 p-0">
                                    {/* Card Body */}
                                    <div className="card-body">
                                        <Link to={`/item-details/${item[0]}`}>
                                            {/* <h6>Hello</h6> */}
                                            <h5 className="mb-0 ">{item ? item[1] : null}</h5>
                                        </Link>
                                        <div className="seller d-flex align-items-center my-3">
                                            <span>Owned By</span>
                                            <Link to={`/item-details/${item[0]}`} >
                                                {/* <h6>Hello</h6> */}
                                                <h6 className="mb-0 ml-2">{item ? item[3] : null}</h6>
                                            </Link>
                                        </div>
                                        <div className="card-bottom d-flex justify-content-between">
                                            <span>{item ? Number(item[10]) > 0 ? Number(item[10]) / 1000000000000000000 : Number(item[11]) / 1000000000000000000 : null}{item[12]?"NFT":"BNB"}</span>
                                            {/* <span>{item.count}</span> */}
                                        </div>
                                        <Link to={`/item-details/${item[0]}`}  className="btn btn-bordered-white btn-smaller mb-2 mt-2" >Buy</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}


export default Myasset;