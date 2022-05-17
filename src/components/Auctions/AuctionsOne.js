import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import nft from '../../abi/nft.json'
import { Link } from 'react-router-dom';
import { addrs } from '../../abi/address'
import { useMoralisQuery } from "react-moralis";


function AuctionsOne({ auc, cut, acc, web3main }) {
    const [allfixed, setallfix] = useState([])
    const [accountid, setaccountid] = useState()
    const [chainid, setchainid] = useState()
    const [cath, setcath] = useState()
    const [allfildata, setallfilldata] = useState()
    const [allfildatabase, setallfilldatabase] = useState()

    console.log('web3auc', web3main)
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
        if (acc && web3main) {
            salenft(0)
        }
    }, [acc, web3main])
    useEffect(async () => {
        if (cath === undefined || cath === "") {
            setallfilldata(allfixed)


        } else {
            const findd = await allfixed?.filter((v) => v[9] === cath)
            console.log('findresult', findd)
            setallfilldata(findd)
        }


    }, [cath, allfixed, web3main])
    const dataa = useMoralisQuery('NEWNFT')
    const fildata = dataa?.data?.filter((v) => Number(v?.attributes?.auction) > 0)
    useEffect(async () => {
        if (cath === undefined || cath === "") {
            setallfilldatabase(fildata)


        } else {
            const findd = await fildata?.filter((v) => v?.attributes?.cath === cath)
            console.log('findresult1', findd)
            setallfilldatabase(findd)
        }


    }, [cath, fildata?.length])

    console.log('allsa', cath)
    console.log('all', allfildatabase)
    console.log('main', fildata)


    useEffect(async () => {
        if (acc && web3main) {
            const accounts1 = await web3main.eth.getAccounts();
            setaccountid(accounts1[0])
        }
    }, [acc, web3main])
    const salenft = async (id) => {
        if (acc && web3main) {

            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            let swaping = new web3main.eth.Contract(nft, addrs)

            swaping.methods.listOfSaleNft(id).call({ from: userwalletaddresss })
                .then((length) => {
                    // alert(length)
                    var listlen = length[1]?.length
                    for (let i = 0; i < listlen; i++) {
                        const ll = length[1][i]
                        nftinfo(ll)
                    }
                })
                .catch()
        }
    }


    const nftinfo = async (id) => {

        if (acc && web3main) {
            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            let swaping = new web3main.eth.Contract(nft, addrs)
            swaping.methods.nftInformation(id).call({ from: userwalletaddresss })
                .then((fees) => {
                    swaping.methods.listOfSaleNft(fees[0]).call({ from: userwalletaddresss })
                        .then((length) => {
                            swaping.methods.auctionDetail(fees[0]).call({ from: userwalletaddresss })
                                .then((value) => {
                                    swaping.methods.timing(fees[0]).call({ from: userwalletaddresss })
                                        .then((timeee) => {
                                            swaping.methods.auctionDetail(id).call({ from: userwalletaddresss })
                                                .then((valueh) => {
                                                    swaping.methods.properties(id).call({ from: userwalletaddresss })
                                                        .then((recipt) => {

                                                            // ffind?.set('prop',[recipt]).save().then(v=>console.log('pdone',v))
                                                            var day = Math.floor(timeee / 86400)
                                                            var hr = Math.floor((timeee - day * 86400) / 3600)
                                                            var minutesout = Math.floor((timeee - day * 86400 - hr * 3600) / 60);
                                                            const dval = { ...fees, 10: length[2], 11: value[0], 12: value[1], 13: value[2], 14: day, 15: hr, 16: minutesout, 17: (Number(valueh[0]))?.length > 21 ? Number(valueh[0]) / 1000000000000000000000000000000000000 : Number(valueh[0]) / 1000000000000000000, 20: recipt ? (JSON.parse(recipt[recipt?.length - 1])[1]) : null }
                                                            savelist(dval)
                                                        })

                                                }).catch()
                                        }).catch()
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
    console.log('alld', allfixed)


    return (
        <section className="popular-collections-area explore-area mauction">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {
                            auc === "auc" ? null : <div className="intro d-flex justify-content-between align-items-end m-0">
                                <div className="intro-content">
                                    <span>Auctions</span>
                                    <h3 className="mt-3 mb-0">Auctions</h3>
                                </div>



                                <div className="intro-btn">
                                    <a className="btn content-btn text-left" href="/auctions">Auctions</a>
                                </div>
                            </div>
                        }
                        {/* {
                            cut === "cut" ? null : <div className="intro d-flex justify-content-between align-items-end m-0">
                                <div className="form-group mt-3" >
                                    <label style={{ color: 'white', padding: '5px' }}>Choose Category:</label>
                                    <select style={{ overflow: 'hidden', backgroundColor: '#09080D', outline: 'none', border: '1px solid white' }} onChange={(e) => setcath(e.target.value)} required>
                                        <option style={{ overflow: 'hidden', backgroundColor: '#09080D' }} value="" style={{ color: 'white' }}>ALL</option>
                                        <option style={{ overflow: 'hidden', backgroundColor: '#09080D' }} value="Art" style={{ color: 'white' }}>Art</option>
                                        <option style={{ overflow: 'hidden', backgroundColor: '#09080D' }} value="Trading Card" style={{ color: 'white' }}>Trading Card</option>
                                        <option style={{ overflow: 'hidden', backgroundColor: '#09080D' }} value="Collectibles" style={{ color: 'white' }}>Collectibles</option>
                                        <option style={{ overflow: 'hidden', backgroundColor: '#09080D' }} value="Sports" style={{ color: 'white' }}>Sports</option>
                                        <option style={{ overflow: 'hidden', backgroundColor: '#09080D' }} value="Utility" style={{ color: 'white' }}>Utility</option>

                                    </select>
                                </div>
                            </div>
                        } */}
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

                    </div>
                </div>
                {
                    accountid && allfixed && acc ?

                        <div className="row items">
                            {cut === "cut" ?
                                allfixed?.slice(0, 4).map((item, idx) => {
                                    return (
                                        <div className="col-12 col-sm-6 col-lg-3 col-md-3 item explore-item " >
                                            <div className="card">
                                                <div className="image-over" style={{ padding: '20px' }}>
                                                    <div style={{ minHeight: '230px' }} >
                                                        {
                                                            (item[20] === "video/mp4" || item[20] === "video/mov" || item[20] === "video/webm") ?
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
                                                    <div className="countdown-times mb-0">
                                                        <div className="countdown px-4"  >

                                                            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white' }}>
                                                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                                                    <p style={{ margin: '0px', fontSize: '10px' }}>Days</p>
                                                                    <p style={{ margin: '0px', marginTop: '5px', fontWeight: 'bold' }}>{item ? item[14] : null}</p>
                                                                </div>
                                                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} >
                                                                    <p style={{ margin: '0px', fontSize: '10px' }}>Hours</p>
                                                                    <p style={{ margin: '0px', marginTop: '5px', fontWeight: 'bold' }}>{item ? item[15] : null}</p>
                                                                </div>
                                                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                                                    <p style={{ margin: '0px', fontSize: '10px' }}>Minutes</p>
                                                                    <p style={{ margin: '0px', marginTop: '5px', fontWeight: 'bold' }}>{item ? item[16] : null}</p>
                                                                </div>

                                                            </div>

                                                        </div>
                                                    </div>

                                                    <div className="card-body my-2" >
                                                        <Link to={`/item-details/${item[0]}`}>
                                                            <h5 className="mb-0 mb-1a">{item ? item[1] : null}</h5>
                                                        </Link>
                                                        <div className="seller sellermid d-flex align-items-center my-2">
                                                            <div className="position-relative">
                                                                {/* <img className="img1a" src={`${item ? `https://gateway.pinata.cloud/ipfs/${item[6]} ` : null}`} alt="" />
                                                                {
                                                                    (item[20] === "video/mp4" || item[20] === "video/mov" || item[20] === "video/webm") ?
                                                                        <Link to={`/item-details/${item[0]}`} >
                                                                            <video className="img1a" src={`${item ? `https://gateway.pinata.cloud/ipfs/${item[6]} ` : null}`}  autoPlay loop />
                                                                        </Link>
                                                                        : null
                                                                }
                                                                {
                                                                    (item[20] === "image/jpeg" || item[20] === "image/png" || item[20] === "image/gif" || item[20] === "image/svg" || item[20] === "image/jpg") ?
                                                                        <Link to={`/item-details/${item[0]}`} >
                                                                            <img className="img1a" src={`${item ? `https://gateway.pinata.cloud/ipfs/${item[6]} ` : null}`} alt="" />
                                                                        </Link>
                                                                        : null
                                                                } */}

                                                            </div>
                                                            <Link to={`/item-details/${item[0]}`}>
                                                                <h6 className="ml-2 my-2 mb-0 mb-1b">{item ? item[3] : null}</h6>
                                                            </Link>
                                                            <Link to={`/item-details/${item[0]}`}>
                                                                <h6 className="ml-2 mb-0  " style={{ color: 'whitesmoke' }}>{item ? item[10] / 1000000000000000000 : null} {item ? item[13] ? "NFT" : "BNB" : null}</h6>
                                                            </Link>
                                                        </div>
                                                        <div className="seller d-flex align-items-center justify-content-between my-3">
                                                            <Link to={`/item-details/${item[0]}`}>
                                                                <h6 className="ml-2 mb-0 mb-1b" style={{ color: 'whitesmoke' }}>Highest Bid</h6>
                                                            </Link>
                                                            <Link to={`/item-details/${item[0]}`}>
                                                                <h6 className="ml-2 mb-0 mb-1b" style={{ color: 'whitesmoke' }}>{item ? Number(item[10]) > Number(item[11]) ? Number(item[10]) / 1000000000000000000 : Number(item[11]) / 1000000000000000000 : null}  {item ? item[13] ? "NFT" : "BNB" : null}</h6>
                                                            </Link>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }) : allfildata?.map((item, idx) => {
                                    return (
                                        <div className="col-12 col-sm-6 col-lg-3 col-md-3 item explore-item " >
                                            <div className="card">
                                                <div className="image-over" style={{ padding: '20px' }}>
                                                    <div style={{ minHeight: '230px' }} >
                                                        {
                                                            (item[20] === "video/mp4" || item[20] === "video/mov" || item[20] === "video/webm") ?
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
                                                    <div className="countdown-times mb-0">
                                                        <div className="countdown px-4"  >

                                                            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white' }}>
                                                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                                                    <p style={{ margin: '0px', fontSize: '10px' }}>Days</p>
                                                                    <p style={{ margin: '0px', marginTop: '5px', fontWeight: 'bold' }}>{item ? item[14] : null}</p>
                                                                </div>
                                                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} >
                                                                    <p style={{ margin: '0px', fontSize: '10px' }}>Hours</p>
                                                                    <p style={{ margin: '0px', marginTop: '5px', fontWeight: 'bold' }}>{item ? item[15] : null}</p>
                                                                </div>
                                                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                                                    <p style={{ margin: '0px', fontSize: '10px' }}>Minutes</p>
                                                                    <p style={{ margin: '0px', marginTop: '5px', fontWeight: 'bold' }}>{item ? item[16] : null}</p>
                                                                </div>

                                                            </div>

                                                        </div>
                                                    </div>

                                                    <div className="card-body my-2" >
                                                        <Link to={`/item-details/${item[0]}`}>

                                                            <h5 className="mb-0 mb-1a">{item ? item[1] : null}</h5>
                                                        </Link>
                                                        <div className="seller sellermid d-flex align-items-center my-2">
                                                            {/* <div className="position-relative">
                                                                <img className="img1a" src={`${item ? `https://gateway.pinata.cloud/ipfs/${item[6]} ` : null}`} alt="" />

                                                            </div> */}
                                                            <Link to={`/item-details/${item[0]}`}>
                                                                <h6 className="ml-2 my-2 mb-0 mb-1b">{item ? item[3] : null}</h6>
                                                            </Link>
                                                            <Link to={`/item-details/${item[0]}`}>
                                                                <h6 className="ml-2 mb-0  " style={{ color: 'whitesmoke' }}>{item ? item[10] / 1000000000000000000 : null} {item ? item[13] ? "NFT" : "BNB" : null}</h6>
                                                            </Link>
                                                        </div>
                                                        <div className="seller d-flex align-items-center justify-content-between my-3">
                                                            <Link to={`/item-details/${item[0]}`}>
                                                                <h6 className="ml-2 mb-0 mb-1b" style={{ color: 'whitesmoke' }}>Highest Bid</h6>
                                                            </Link>
                                                            <Link to={`/item-details/${item[0]}`}>
                                                                <h6 className="ml-2 mb-0 mb-1b" style={{ color: 'whitesmoke' }}>{item ? Number(item[10]) > Number(item[11]) ? Number(item[10]) / 1000000000000000000 : Number(item[11]) / 1000000000000000000 : null}  {item ? item[13] ? "NFT" : "BNB" : null} lll</h6>
                                                            </Link>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}



                        </div>
                        :
                        <div className="row items">

                            {cut === "cut" ?


                                fildata?.slice(0, 4).map((item, idx) => {
                                    return (
                                        <>
                                            {
                                                (Number(item?.attributes?.auction)) > 0 ?
                                                    <div className="col-12 col-sm-6 col-lg-3 col-md-3 item explore-item " >
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

                                                            <div className="card-caption col-12 p-0">
                                                                <div className="countdown-times mb-0">
                                                                    <div className="countdown px-4"  >

                                                                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white' }}>
                                                                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                                                                <p style={{ margin: '0px', fontSize: '10px' }}>Days</p>
                                                                                <p style={{ margin: '0px', marginTop: '5px', fontWeight: 'bold' }}>{item?.attributes?.days ? item?.attributes?.days : '0'}</p>
                                                                            </div>
                                                                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} >
                                                                                <p style={{ margin: '0px', fontSize: '10px' }}>Hours</p>
                                                                                <p style={{ margin: '0px', marginTop: '5px', fontWeight: 'bold' }}>{item?.attributes?.hours ? item?.attributes?.hours : "0"}</p>
                                                                            </div>
                                                                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                                                                <p style={{ margin: '0px', fontSize: '10px' }}>Minutes</p>
                                                                                <p style={{ margin: '0px', marginTop: '5px', fontWeight: 'bold' }}>{item?.attributes?.mins ? item?.attributes?.mins : "0"}</p>
                                                                            </div>

                                                                        </div>

                                                                    </div>
                                                                </div>

                                                                <div className="card-body my-2" >
                                                                    <Link to={`/item-details/${item?.attributes?.nftId}`} >

                                                                        <h5 className="mb-0 mb-1a">{item?.attributes?.nftName}</h5>
                                                                    </Link>
                                                                    <div className="seller sellermid d-flex align-items-center my-2">
                                                                        {/* <div className="position-relative">
                                                                            <img className="img1a" src={`https://gateway.pinata.cloud/ipfs/${item?.attributes?.nftImg}`} alt="" />

                                                                        </div> */}
                                                                        <Link to={`/item-details/${item?.attributes?.nftId}`} >
                                                                            <h6 className="ml-2 my-2 mb-0 mb-1b">{item?.attributes?.ownerName}</h6>
                                                                        </Link>
                                                                        <Link to={`/item-details/${item?.attributes?.nftId}`} >
                                                                            <h6 className="ml-2 mb-0  " style={{ color: 'whitesmoke' }}>{item?.attributes?.auction} {item?.attributes?.bool ? "NFT" : "BNB"}</h6>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="seller d-flex align-items-center justify-content-between my-3">
                                                                        <Link to={`/item-details/${item?.attributes?.nftId}`} >
                                                                            <h6 className="ml-2 mb-0 mb-1b" style={{ color: 'whitesmoke' }}>Highest Bid</h6>
                                                                        </Link>
                                                                        <Link to={`/item-details/${item?.attributes?.nftId}`} >
                                                                            <h6 className="ml-2 mb-0 mb-1b" style={{ color: 'whitesmoke' }}>{(Number(item?.attributes?.auction)) > (Number(item?.attributes?.highbid)) ? Number(item?.attributes?.auction) : Number(item?.attributes?.highbid)} {item?.attributes?.bool ? "NFT" : "BNB"}</h6>
                                                                        </Link>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> : null}
                                        </>
                                    );
                                }) :

                                allfildatabase?.map((item, idx) => {
                                    return (
                                        <>
                                            {
                                                (Number(item?.attributes?.auction)) > 0 ?
                                                    <div className="col-12 col-sm-6 col-lg-3 col-md-3 item explore-item " >
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

                                                            <div className="card-caption col-12 p-0">
                                                                <div className="countdown-times mb-0">
                                                                    <div className="countdown px-4"  >

                                                                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white' }}>
                                                                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                                                                <p style={{ margin: '0px', fontSize: '10px' }}>Days</p>
                                                                                <p style={{ margin: '0px', marginTop: '5px', fontWeight: 'bold' }}>{item?.attributes?.days ? item?.attributes?.days : '0'}</p>
                                                                            </div>
                                                                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} >
                                                                                <p style={{ margin: '0px', fontSize: '10px' }}>Hours</p>
                                                                                <p style={{ margin: '0px', marginTop: '5px', fontWeight: 'bold' }}>{item?.attributes?.hours ? item?.attributes?.hours : "0"}</p>
                                                                            </div>
                                                                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                                                                <p style={{ margin: '0px', fontSize: '10px' }}>Minutes</p>
                                                                                <p style={{ margin: '0px', marginTop: '5px', fontWeight: 'bold' }}>{item?.attributes?.mins ? item?.attributes?.mins : "0"}</p>
                                                                            </div>

                                                                        </div>

                                                                    </div>
                                                                </div>

                                                                <div className="card-body my-2" >
                                                                    <Link to={`/item-details/${item?.attributes?.nftId}`} >

                                                                        <h5 className="mb-0 mb-1a">{item?.attributes?.nftName}</h5>
                                                                    </Link>
                                                                    <div className="seller sellermid d-flex align-items-center my-2">
                                                                        {/* <div className="position-relative">
                                                                            <img className="img1a" src={`https://gateway.pinata.cloud/ipfs/${item?.attributes?.nftImg}`} alt="" />

                                                                        </div> */}
                                                                        <Link to={`/item-details/${item?.attributes?.nftId}`} >
                                                                            <h6 className="ml-2 my-2 mb-0 mb-1b">{item?.attributes?.ownerName}</h6>
                                                                        </Link>
                                                                        <Link to={`/item-details/${item?.attributes?.nftId}`} >
                                                                            <h6 className="ml-2 mb-0  " style={{ color: 'whitesmoke' }}>{item?.attributes?.auction} {item?.attributes?.bool ? "NFT" : "BNB"}</h6>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="seller d-flex align-items-center justify-content-between my-3">
                                                                        <Link to={`/item-details/${item?.attributes?.nftId}`} >
                                                                            <h6 className="ml-2 mb-0 mb-1b" style={{ color: 'whitesmoke' }}>Highest Bid</h6>
                                                                        </Link>
                                                                        <Link to={`/item-details/${item?.attributes?.nftId}`} >
                                                                            <h6 className="ml-2 mb-0 mb-1b" style={{ color: 'whitesmoke' }}>{(Number(item?.attributes?.auction)) > (Number(item?.attributes?.highbid)) ? Number(item?.attributes?.auction) : Number(item?.attributes?.highbid)} {item?.attributes?.bool ? "NFT" : "BNB"}</h6>
                                                                        </Link>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> : null}
                                        </>
                                    );
                                })}


                        </div>
                }

            </div>
        </section>
    );
}


export default AuctionsOne;