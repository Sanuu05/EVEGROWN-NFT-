import React, { useEffect, useState } from 'react'
// import axios from 'axios';
import Web3 from 'web3'
import nft from '../../abi/nft.json'
import { useMoralisQuery, useMoralis } from "react-moralis";
import { addrs } from '../../abi/address'
import { Link } from 'react-router-dom';

function Collections({ cut,acc }) {
    const [colllist, setcolllist] = useState()
    const [alldata, setalldata] = useState([])
    const [accountid, setaccountid] = useState()
    const [chain, setchain] = useState()
    // const { Moralis } = useMoralis();S
    useEffect(async () => {
        
        if (acc) {
            const accounts1 = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setaccountid(accounts1)
            
        }
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        setchain(chainId)
        totalcolection()

    }, [acc])
    const { data } = useMoralisQuery('NEWCREATECOLONE')
    const { Moralis } = useMoralis();
    // const del = data?.map((v)=>v.destroy())
 
    const totalcolection = async () => {

        if (acc && window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)

            swaping.methods.collectionform().call({ from: userwalletaddresss })
                .then((length) => {
                    setcolllist(length)
                    

                })
                .catch()

        }
    }
    useEffect(() => {
        for (let i = 1; i <= colllist; i++) {
            collectiondetails(i);
        }


    }, [colllist])
    const collectiondetails = async (id) => {
        if (acc && window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)

            swaping.methods.collectionDetails(id).call({ from: userwalletaddresss })
                .then((fees) => {
                    getalllist(fees)
                    // const GameScore = Moralis.Object.extend("NEWCREATECOLONE");
                    // const gameScore = new GameScore();
                    // //  const gameScore = new GameScore();
                    // gameScore?.set("collectionName", fees[2]);
                    // gameScore?.set("displayName", fees[3]);
                    // gameScore?.set("websiteUrl", fees[4]);
                    // gameScore?.set("collectionDescription", fees[5]);
                    // gameScore?.set("collectionImg", fees[6]);
                    // gameScore?.set("collectionId", fees[0]);

                    // gameScore.save().then((v)=>console.log(v))


                }).catch()

        }
    }

    const getalllist = (data) => {
        setalldata((old) => [
            ...old, data
        ])


    }
 


    return (

        <section className="popular-collections-area ">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {/* Intro */}
                        <div className="intro d-flex justify-content-between align-items-end m-0">
                            <div className="intro-content">
                                <span>Collections</span>
                                <h3 className="mt-3 mb-0">Collections</h3>
                            </div>
                            <div className="intro-btn">
                                <a className="btn content-btn text-left" href="/allcol">More</a>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    accountid && chain == 0x61 ?

                        <div className="row items">
                            {
                                cut === "cut" ?
                                    alldata?.slice(0, 8).map((val, idx) => {
                                        return (
                                            <>{


                                                <div key={`cd_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                                                    <div className="card no-hover text-center">
                                                        <div className="image-over p-3" >
                                                            <Link to={`/col-details/${val[0]}`} >
                                                                <img className="card-img-top" style={{ height: '170px' }} src={`${val ? `https://gateway.pinata.cloud/ipfs/${val[6]} ` : null}`} alt="" />
                                                            </Link>
                                                            {/* Seller */}
                                                            <Link className="seller" to={`/col-details/${val[0]}`} >

                                                                <div className="seller-thumb avatar-lg">
                                                                    <img className="rounded-circle" src={`${val ? `https://gateway.pinata.cloud/ipfs/${val[6]} ` : null}`} alt="" />
                                                                </div>
                                                            </Link>
                                                        </div>
                                                        {/* Card Caption */}
                                                        <div className="card-caption col-12 p-0 pt-0">
                                                            {/* Card Body */}
                                                            <div className="card-body mt-2">
                                                                <Link to={`/col-details/${val[0]}`} >
                                                                    <h5 style={{ fontSize: '20px', marginTop: '15px' }} className="mb-0">{val ? val[2] : null}</h5>
                                                                </Link>
                                                                <span style={{ fontSize: '18px', marginTop: '0px', color: '#8E8E8E' }}>{val ? val[3] : null} {val[0]} aaa</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            </>
                                        );
                                    }) : alldata?.map((val, idx) => {
                                        return (
                                            <>{


                                                <div key={`cd_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                                                    <div className="card no-hover text-center">
                                                        <div className="image-over p-3" >
                                                            <Link to={`/col-details/${val[0]}`}>
                                                                <img className="card-img-top" style={{ height: '170px' }} src={`${val ? `https://gateway.pinata.cloud/ipfs/${val[6]} ` : null}`} alt="" />
                                                            </Link>
                                                            {/* Seller */}
                                                            <Link className="seller" to={`/col-details/${val[0]}`} >

                                                                <div className="seller-thumb avatar-lg">
                                                                    <img className="rounded-circle" src={`${val ? `https://gateway.pinata.cloud/ipfs/${val[6]} ` : null}`} alt="" />
                                                                </div>
                                                            </Link>
                                                        </div>
                                                        {/* Card Caption */}
                                                        <div className="card-caption col-12 p-0 pt-0">
                                                            {/* Card Body */}
                                                            <div className="card-body mt-2">
                                                                <Link to={`/col-details/${val[0]}`} >
                                                                    <h5 style={{ fontSize: '20px', marginTop: '15px' }} className="mb-0">{val ? val[2] : null}</h5>
                                                                </Link>
                                                                <span style={{ fontSize: '18px', marginTop: '0px', color: '#8E8E8E' }}>{val ? val[3] : null}aaa</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            </>
                                        );
                                    })}
                        </div> :
                        <div className="row items">
                            <>
                                {
                                    cut === "cut" ?
                                        data?.slice(0, 8).map((val, idx) => {
                                            return (
                                                <>{


                                                    <div key={`cd_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                                                        <div className="card no-hover text-center">
                                                            <div className="image-over p-3" >
                                                                <Link to={`/col-details/${val?.attributes?.collectionId}`} >
                                                                    <img className="card-img-top" style={{ height: '170px' }} src={`https://gateway.pinata.cloud/ipfs/${val?.attributes ? val?.attributes?.collectionImg : null}`} alt="" />
                                                                </Link>
                                                                {/* Seller */}
                                                                <Link className="seller" to={`/col-details/${val?.attributes?.collectionId}`} >

                                                                    <div className="seller-thumb avatar-lg">
                                                                        <img className="rounded-circle" src={`https://gateway.pinata.cloud/ipfs/${val?.attributes ? val?.attributes?.collectionImg : null}`} alt="" />
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                            {/* Card Caption */}
                                                            <div className="card-caption col-12 p-0 pt-0">
                                                                {/* Card Body */}
                                                                <div className="card-body mt-2">
                                                                    <Link to={`/col-details/${val?.attributes?.collectionId}`} >
                                                                        <h5 style={{ fontSize: '20px', marginTop: '15px' }} className="mb-0">{val?.attributes ? val?.attributes?.collectionName : null}</h5>
                                                                    </Link>
                                                                    <span style={{ fontSize: '18px', marginTop: '0px', color: '#8E8E8E' }}>{val?.attributes ? val?.attributes?.displayName : null} bbbb</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                                </>
                                            );
                                        }) : data?.map((val, idx) => {
                                            return (
                                                <>{


                                                    <div key={`cd_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                                                        <div className="card no-hover text-center">
                                                            <div className="image-over p-3" >
                                                                <Link to={`/col-details/${val?.attributes?.collectionId}`} >
                                                                    <img className="card-img-top" style={{ height: '170px' }} src={`https://gateway.pinata.cloud/ipfs/${val?.attributes ? val?.attributes?.collectionImg : null}`} alt="" />
                                                                </Link>
                                                                {/* Seller */}
                                                                <Link className="seller" to={`/col-details/${val?.attributes?.collectionId}`} >

                                                                    <div className="seller-thumb avatar-lg">
                                                                        <img className="rounded-circle" src={`https://gateway.pinata.cloud/ipfs/${val?.attributes ? val?.attributes?.collectionImg : null}`} alt="" />
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                            {/* Card Caption */}
                                                            <div className="card-caption col-12 p-0 pt-0">
                                                                {/* Card Body */}
                                                                <div className="card-body mt-2">
                                                                    <Link to={`/col-details/${val?.attributes?.collectionId}`} >
                                                                        <h5 style={{ fontSize: '20px', marginTop: '15px' }} className="mb-0">{val?.attributes ? val?.attributes?.collectionName : null}</h5>
                                                                    </Link>
                                                                    <span style={{ fontSize: '18px', marginTop: '0px', color: '#8E8E8E' }}>{val?.attributes ? val?.attributes?.displayName : null}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                                </>
                                            );
                                        })}
                            </>
                        </div>
                }
            </div>
        </section>
    );
}


export default Collections;