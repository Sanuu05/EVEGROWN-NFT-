import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import nft from '../../abi/nft.json'
import { Link } from 'react-router-dom';
import { useMoralisQuery } from "react-moralis";
import { addrs } from '../../abi/address'





function ExploreThree({ cut, acc }) {
    const [allfixed, setallfix] = useState([])
    const [accountid, setaccountid] = useState()
    const [chainid, setchainid] = useState()
    const [cath, setcath] = useState()
    const [allfildata, setallfilldata] = useState()
    const [allfildatabase, setallfilldatabase] = useState()
    const dataa = useMoralisQuery('NEWNFT')
    const fildata = dataa?.data?.filter((v) => Number(v?.attributes?.amout) > 0)

    const initData = {
        pre_heading: "Explore",
        heading: "Exclusive Digital Assets",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
        filter_1: "All",
        filter_2: "Art",
        filter_3: "Trading Card",
        filter_4: "Collectibles",
        filter_5: "Sports",
        filter_6: "Utility"
    }
    useEffect(() => {
        if (acc) {
            salenft(0)

        }

    }, [acc])
    useEffect(async () => {
        if (cath === undefined || cath === "") {
            setallfilldata(allfixed)


        } else {
            const findd = await allfixed?.filter((v) => v[9] === cath)
            console.log('findresult', findd)
            setallfilldata(findd)
        }


    }, [cath, allfixed])
    useEffect(async () => {
        if (cath === undefined || cath === "") {
            setallfilldatabase(fildata)


        } else {
            const findd = await fildata?.filter((v) => v?.attributes?.cath === cath)
            console.log('findresult1', findd)
            setallfilldatabase(findd)
        }


    }, [cath, fildata?.length])
    useEffect(async () => {
        if (acc) {
            const accounts1 = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setaccountid(accounts1[0])
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            setchainid(chainId)

        }

    }, [acc])

    const salenft = async (id) => {
        if (acc && window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)

            swaping.methods.listOfSaleNft(id).call({ from: userwalletaddresss })
                .then((length) => {
                    var listlen = length[0]?.length
                    for (let i = 0; i < listlen; i++) {
                        const ll = length[0][i]
                        nftinfo(ll)

                    }
                })
                .catch()

        }
    }



    const nftinfo = async (id) => {
        if (acc && window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)

            swaping.methods.nftInformation(id).call({ from: userwalletaddresss })
                .then((fees) => {
                    swaping.methods.listOfSaleNft(fees[0]).call({ from: userwalletaddresss })
                        .then((length) => {
                            swaping.methods.everGrowCoin(fees[0]).call({ from: userwalletaddresss })
                                .then((value) => {

                                    swaping.methods.properties(id).call({ from: userwalletaddresss })
                                        .then((recipt) => {

                                            // ffind?.set('prop',[recipt]).save().then(v=>console.log('pdone',v))

                                            savelist({ ...fees, 10: length[3], 11: length[2], 12: value, 20: recipt ? (JSON.parse(recipt[recipt?.length - 1])[1]) : null })
                                        })


                                }).catch()
                        })
                        .catch()

                }).catch()

        }
    }
    const savelist = (data) => {
        setallfix((old) => [
            ...old, data
        ])


    }







    return (
        <section className="explore-area">
            <div className="container">
                <div className="intro d-flex justify-content-between align-items-end m-0">
                    <div className="intro-content">
                        <span>Sale</span>
                        <h3 className="mt-3 mb-0">Sale</h3>
                    </div>

                    <div className="intro-btn">
                        <a className="btn content-btn text-left" href="/sale">Sale</a>
                    </div>
                </div>
                {
                    cut === "cut" ? null :
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-8 col-lg-7">
                                {/* Intro */}
                                <div className="intro text-center mb-4">
                                    <span>{initData.pre_heading}</span>
                                    <h3 className="mt-3 mb-0">{initData.heading}</h3>
                                    <p>Discover, collect, and sell extraordinary NFTs Explore on the world's best & largest NFT marketplace</p>
                                </div>
                            </div>
                        </div>
                }
                {
                    cut === "cut" ? null :
                        <div className="row justify-content-center text-center">
                            <div className="col-12">
                                {/* Explore Menu */}
                                <div className="explore-menu btn-group btn-group-toggle flex-wrap justify-content-center text-center mb-4" data-toggle="buttons">
                                    <label className="btn active d-table text-uppercase p-2" onClick={(e) => setcath("")}>
                                        <input type="radio" defaultValue="all" defaultChecked className="explore-btn" />
                                        <span>{initData.filter_1}</span>
                                    </label>
                                    <label className="btn d-table text-uppercase p-2" onClick={(e) => setcath(initData.filter_2)}>
                                        <input type="radio" defaultValue="art" className="explore-btn" />
                                        <span>{initData.filter_2}</span>
                                    </label>
                                    <label className="btn d-table text-uppercase p-2" onClick={(e) => setcath(initData.filter_3)}>
                                        <input type="radio" defaultValue="music" className="explore-btn" />
                                        <span>{initData.filter_3}</span>
                                    </label>
                                    <label className="btn d-table text-uppercase p-2" onClick={(e) => setcath(initData.filter_4)}>
                                        <input type="radio" defaultValue="collectibles" className="explore-btn" />
                                        <span>{initData.filter_4}</span>
                                    </label>
                                    <label className="btn d-table text-uppercase p-2" onClick={(e) => setcath(initData.filter_5)}>
                                        <input type="radio" defaultValue="sports" className="explore-btn" />
                                        <span>{initData.filter_5}</span>
                                    </label>
                                    <label className="btn d-table text-uppercase p-2" onClick={(e) => setcath(initData.filter_6)}>
                                        <input type="radio" defaultValue="sports" className="explore-btn" />
                                        <span>{initData.filter_6}</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                }
                {
                    accountid && chainid == 0x61 && acc ?

                        <div className="row items">

                            {
                                cut === "cut" ?
                                    allfixed?.slice(0, 4).map((item, idx) => {
                                        return (
                                            <div key={`exo_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                                                <div className="card">
                                                    <div className="image-over" style={{ padding: '20px' }}>
                                                        <div style={{ minHeight: '230px' }} >
                                                            {
                                                                (item[20] === "video/mp4" || item[20] === "video/mov") || item[20] === "video/webm" ?
                                                                    <Link to={`/item-details/${item[0]}`} >
                                                                        <video className="card-img-top" src={`${item ? `https://gateway.pinata.cloud/ipfs/${item[6]} ` : null}`} style={{ height: '220px', borderRadius: '7px' }} alt="" autoPlay loop />
                                                                    </Link>
                                                                    : null
                                                            }
                                                            {
                                                                (item[20] === "image/jpeg" || item[20] === "image/png" || item[20] === "image/gif" || item[20] === "image/svg" || item[20] === "image/jpg") ?
                                                                    <Link to={`/item-details/${item[0]}`} >
                                                                        <img className="card-img-top" src={`${item ? `https://gateway.pinata.cloud/ipfs/${item[6]} ` : null}`} style={{ height: '220px', borderRadius: '7px' }} alt="" />
                                                                    </Link>
                                                                    : null
                                                            }
                                                            {
                                                                (item[20] === "audio/mpeg") ?
                                                                    <Link to={`/item-details/${item[0]}`} >
                                                                        <audio className="card-img-top" src={`${item ? `https://gateway.pinata.cloud/ipfs/${item[6]} ` : null}`} controls />
                                                                    </Link>
                                                                    : null
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="card-caption col-12 p-0">

                                                        <div className="card-body">
                                                            <Link to={`/item-details/${item[0]}`}>

                                                                <h5 className="mb-0 ">{item ? item[1] : null}</h5>
                                                            </Link>
                                                            <div className="seller d-flex align-items-center my-3">
                                                                <span>Owned By</span>
                                                                <Link to={`/item-details/${item[0]}`}>

                                                                    <h6 className="mb-0 ml-2">{item ? item[3] : null}</h6>
                                                                </Link>
                                                            </div>
                                                            <div className="card-bottom d-flex justify-content-between">
                                                                <span>{item ? Number(item[10]) > 0 ? Number(item[10]) / 1000000000000000000 : Number(item[11]) / 1000000000000000000 : null} {item[12] ? "NFT" : "BNB"}</span>

                                                            </div>
                                                            <Link to={`/item-details/${item[0]}`} className="btn btn-bordered-white btn-smaller mb-2 mt-2" >Buy</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }) : allfildata?.map((item, idx) => {
                                        return (
                                            <div key={`exo_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                                                <div className="card">
                                                    <div className="image-over" style={{ padding: '20px' }}>
                                                        <div style={{ minHeight: '230px' }} >
                                                            {
                                                                (item[20] === "video/mp4" || item[20] === "video/mov") || item[20] === "video/webm" ?
                                                                    <Link to={`/item-details/${item[0]}`} >
                                                                        <video className="card-img-top" src={`${item ? `https://gateway.pinata.cloud/ipfs/${item[6]} ` : null}`} style={{ height: '220px', borderRadius: '7px' }} alt="" autoPlay loop />
                                                                    </Link>
                                                                    : null
                                                            }
                                                            {
                                                                (item[20] === "image/jpeg" || item[20] === "image/png" || item[20] === "image/gif" || item[20] === "image/svg" || item[20] === "image/jpg") ?
                                                                    <Link to={`/item-details/${item[0]}`} >
                                                                        <img className="card-img-top" src={`${item ? `https://gateway.pinata.cloud/ipfs/${item[6]} ` : null}`} style={{ height: '220px', borderRadius: '7px' }} alt="" />
                                                                    </Link>
                                                                    : null
                                                            }
                                                            {
                                                                (item[20] === "audio/mpeg") ?
                                                                    <Link to={`/item-details/${item[0]}`} >
                                                                        <audio className="card-img-top" src={`${item ? `https://gateway.pinata.cloud/ipfs/${item[6]} ` : null}`} controls />
                                                                    </Link>
                                                                    : null
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="card-caption col-12 p-0">

                                                        <div className="card-body">
                                                            <Link to={`/item-details/${item[0]}`}>

                                                                <h5 className="mb-0 ">{item ? item[1] : null}</h5>
                                                            </Link>
                                                            <div className="seller d-flex align-items-center my-3">
                                                                <span>Owned By</span>
                                                                <Link to={`/item-details/${item[0]}`}>

                                                                    <h6 className="mb-0 ml-2">{item ? item[3] : null}</h6>
                                                                </Link>
                                                            </div>
                                                            <div className="card-bottom d-flex justify-content-between">
                                                                <span>{item ? Number(item[10]) > 0 ? Number(item[10]) / 1000000000000000000 : Number(item[11]) / 1000000000000000000 : null} {item[12] ? "NFT" : "BNB"}</span>

                                                            </div>
                                                            <Link to={`/item-details/${item[0]}`} className="btn btn-bordered-white btn-smaller mb-2 mt-2" >Buy</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}

                        </div> :
                        <div className="row items">
                            {
                                cut === "cut" ?
                                    fildata?.slice(0, 4)?.map((item, idx) => {
                                        return (
                                            <>
                                                {



                                                    <div key={`exo_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                                                        <div className="card">
                                                            <div className="image-over" style={{ padding: '20px' }}>
                                                            <div style={{ minHeight: '230px' }} >
                                                                {/* <Link to={`/item-details/${item?.attributes?.nftId}`} >
                                                                    <img className="card-img-top" src={`https://gateway.pinata.cloud/ipfs/${item?.attributes?.nftImg}`} style={{ height: '220px', borderRadius: '7px' }} alt="" />
                                                                </Link> */}
                                                                {
                                                                    (item?.attributes?.datatype === "video/mp4" || item?.attributes?.datatype === "video/mov") || item?.attributes?.datatype === "video/webm" ?
                                                                        <Link to={`/item-details/${item?.attributes?.nftId}`}>
                                                                            <video className="card-img-top" src={`https://gateway.pinata.cloud/ipfs/${item?.attributes?.nftImg}`} style={{ height: '220px', borderRadius: '7px' }} alt="" autoPlay loop />
                                                                        </Link>
                                                                        : null
                                                                }
                                                                {
                                                                    (item?.attributes?.datatype === "image/jpeg" || item?.attributes?.datatype === "image/png" || item?.attributes?.datatype === "image/gif" || item?.attributes?.datatype === "image/svg" || item?.attributes?.datatype === "image/jpg") ?
                                                                        <Link to={`/item-details/${item?.attributes?.nftId}`}>
                                                                            <img className="card-img-top" src={`https://gateway.pinata.cloud/ipfs/${item?.attributes?.nftImg}`} style={{ height: '220px', borderRadius: '7px' }} alt="" />
                                                                        </Link>
                                                                        : null
                                                                }
                                                                {
                                                                    (item?.attributes?.datatype === "audio/mpeg") ?
                                                                        <Link to={`/item-details/${item?.attributes?.nftId}`}>
                                                                            <audio className="card-img-top" src={`https://gateway.pinata.cloud/ipfs/${item?.attributes?.nftImg}`} controls />
                                                                        </Link>
                                                                        : null
                                                                }
                                                                </div>
                                                            </div>

                                                            <div className="card-caption col-12 p-0">

                                                                <div className="card-body">
                                                                    <Link to={`/item-details/${item?.attributes?.nftId}`} >

                                                                        <h5 className="mb-0 ">{item?.attributes?.nftName}</h5>
                                                                    </Link>
                                                                    <div className="seller d-flex align-items-center my-3">
                                                                        <span>Owned By</span>
                                                                        <Link to={`/item-details/${item?.attributes?.nftId}`} >

                                                                            <h6 className="mb-0 ml-2">{item?.attributes?.ownerName}</h6>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="card-bottom d-flex justify-content-between">
                                                                        <span>{item?.attributes?.amout} {item?.attributes?.salebool ? "NFT" : "BNB"}</span>

                                                                    </div>
                                                                    <Link to={`/item-details/${item?.attributes?.nftId}`} className="btn btn-bordered-white btn-smaller mb-2 mt-2" >Buy</Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>}
                                            </>
                                        );
                                    }) : allfildatabase?.map((item, idx) => {
                                        return (
                                            <>
                                                {



                                                    <div key={`exo_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                                                        <div className="card">
                                                            <div className="image-over" style={{ padding: '20px' }}>
                                                            <div style={{ minHeight: '230px' }} >
                                                            {
                                                                    (item?.attributes?.datatype === "video/mp4" || item?.attributes?.datatype === "video/mov") || item?.attributes?.datatype === "video/webm" ?
                                                                        <Link to={`/item-details/${item?.attributes?.nftId}`}>
                                                                            <video className="card-img-top" src={`https://gateway.pinata.cloud/ipfs/${item?.attributes?.nftImg}`} style={{ height: '220px', borderRadius: '7px' }} alt="" autoPlay loop />
                                                                        </Link>
                                                                        : null
                                                                }
                                                                {
                                                                    (item?.attributes?.datatype === "image/jpeg" || item?.attributes?.datatype === "image/png" || item?.attributes?.datatype === "image/gif" || item?.attributes?.datatype === "image/svg" || item?.attributes?.datatype === "image/jpg") ?
                                                                        <Link to={`/item-details/${item?.attributes?.nftId}`}>
                                                                            <img className="card-img-top" src={`https://gateway.pinata.cloud/ipfs/${item?.attributes?.nftImg}`} style={{ height: '220px', borderRadius: '7px' }} alt="" />
                                                                        </Link>
                                                                        : null
                                                                }
                                                                {
                                                                    (item?.attributes?.datatype === "audio/mpeg") ?
                                                                        <Link to={`/item-details/${item?.attributes?.nftId}`}>
                                                                            <audio className="card-img-top" src={`https://gateway.pinata.cloud/ipfs/${item?.attributes?.nftImg}`} controls />
                                                                        </Link>
                                                                        : null
                                                                }
                                                                </div>
                                                            </div>
                                                            {/* Card Caption */}
                                                            <div className="card-caption col-12 p-0">

                                                                <div className="card-body">
                                                                    <Link to={`/item-details/${item?.attributes?.nftId}`} >

                                                                        <h5 className="mb-0 ">{item?.attributes?.nftName}</h5>
                                                                    </Link>
                                                                    <div className="seller d-flex align-items-center my-3">
                                                                        <span>Owned By</span>
                                                                        <Link to={`/item-details/${item?.attributes?.nftId}`} >

                                                                            <h6 className="mb-0 ml-2">{item?.attributes?.ownerName}</h6>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="card-bottom d-flex justify-content-between">
                                                                        <span>{item?.attributes?.amout} BNB</span>

                                                                    </div>
                                                                    <Link to={`/item-details/${item?.attributes?.nftId}`} className="btn btn-bordered-white btn-smaller mb-2 mt-2" >Buy</Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>}
                                            </>
                                        );
                                    })}
                        </div>
                }

            </div>

        </section>
    );
}


export default ExploreThree;