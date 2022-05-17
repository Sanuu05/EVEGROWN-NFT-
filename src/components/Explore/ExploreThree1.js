import React, { useEffect, useState } from 'react'
// import axios from 'axios';
import Web3 from 'web3'
import nft from '../../abi/nft.json'
import { Link, useHistory } from 'react-router-dom';
// import { useHistory } from 'react-router-dom'
import { Modal, Spinner } from 'react-bootstrap'


import { addrs } from '../../abi/address'
import fromExponential from 'from-exponential'

const initData = {
    pre_heading: "Explore",
    heading: "Exclusive Digital Assets",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
    filter_1: "Creation",
    filter_2: "Collection",
    filter_3: "Music",
    filter_4: "Collectibles",
    filter_5: "Sports"
}

const data = [
    {
        id: "1",
        img: "https://raroin.creabik.com/assets/img/items/item_1.png",
        group: '["art","sports"]',
        title: "pop art Painting",
        owner: "@luka_fenn..",
        price: "0.001 ETH",
        bidPrice: "0.022 ETH",
        img1: "https://raroin.creabik.com/assets/img/avatars/avatar_1.png",
        img2: "	https://raroin.creabik.com/assets/img/avatars/avatar_2.png",
        count: "1 of 1",
        btnText: "Place a Bid"
    },
    {
        id: "2",
        img: "https://raroin.creabik.com/assets/img/items/item_2.png",
        group: '["art","sports"]',
        title: "pop art Painting",
        owner: "@luka_fenn..",
        price: "0.001 ETH",
        bidPrice: "0.022 ETH",
        img1: "https://raroin.creabik.com/assets/img/avatars/avatar_1.png",
        img2: "	https://raroin.creabik.com/assets/img/avatars/avatar_2.png",
        count: "1 of 1",
        btnText: "Place a Bid"
    },
    {
        id: "3",
        img: "https://raroin.creabik.com/assets/img/items/item_3.png",
        group: '["art","sports"]',
        title: "pop art Painting",
        owner: "@luka_fenn..",
        price: "0.001 ETH",
        bidPrice: "0.022 ETH",
        img1: "https://raroin.creabik.com/assets/img/avatars/avatar_1.png",
        img2: "	https://raroin.creabik.com/assets/img/avatars/avatar_2.png",
        count: "1 of 1",
        btnText: "Place a Bid"
    },
    {
        id: "4",
        img: "	https://raroin.creabik.com/assets/img/items/item_4.png",
        group: '["art","sports"]',
        title: "pop art Painting",
        owner: "@luka_fenn..",
        price: "0.001 ETH",
        bidPrice: "0.022 ETH",
        img1: "https://raroin.creabik.com/assets/img/avatars/avatar_1.png",
        img2: "	https://raroin.creabik.com/assets/img/avatars/avatar_2.png",
        count: "1 of 1",
        btnText: "Place a Bid"
    },
    {
        id: "5",
        img: "	https://raroin.creabik.com/assets/img/items/item_5.png",
        group: '["art","sports"]',
        title: "pop art Painting",
        owner: "@luka_fenn..",
        price: "0.001 ETH",
        bidPrice: "0.022 ETH",
        img1: "https://raroin.creabik.com/assets/img/avatars/avatar_1.png",
        img2: "	https://raroin.creabik.com/assets/img/avatars/avatar_2.png",
        count: "1 of 1",
        btnText: "Place a Bid"
    },
    {
        id: "6",
        img: "https://raroin.creabik.com/assets/img/items/item_6.png",
        group: '["art","sports"]',
        title: "pop art Painting",
        owner: "@luka_fenn..",
        price: "0.001 ETH",
        bidPrice: "0.022 ETH",
        img1: "https://raroin.creabik.com/assets/img/avatars/avatar_1.png",
        img2: "	https://raroin.creabik.com/assets/img/avatars/avatar_2.png",
        count: "1 of 1",
        btnText: "Place a Bid"
    },
    // {
    //     id: "7",
    //     img: "/img/auction_7.jpg",
    //     group: '["art","sports"]',
    //     title: "Cartoon Heroes",
    //     owner: "Junaid",
    //     price: "3.2 ETH",
    //     count: "1 of 1",
    //     btnText: "Place a Bid"
    // },
    // {
    //     id: "8",
    //     img: "/img/auction_8.jpg",
    //     group: '["music","sports","art","collectibles"]',
    //     title: "Gaming Chair",
    //     owner: "Johnson",
    //     price: "0.69 ETH",
    //     count: "1 of 1",
    //     btnText: "Place a Bid"
    // },
    // {
    //     id: "9",
    //     img: "/img/auction_9.jpg",
    //     group: '["music","sports","collectibles"]',
    //     title: "Photography",
    //     owner: "Sara",
    //     price: "2.3 ETH",
    //     count: "1 of 1",
    //     btnText: "Place a Bid"
    // },
    // {
    //     id: "10",
    //     img: "/img/auction_10.jpg",
    //     group: '["art","music"]',
    //     title: "Zed Run",
    //     owner: "SpaceMan",
    //     price: "3.7 ETH",
    //     count: "1 of 1",
    //     btnText: "Place a Bid"
    // },
    // {
    //     id: "11",
    //     img: "/img/auction_11.jpg",
    //     group: '["sports","art","music"]',
    //     title: "Rare Tyres",
    //     owner: "Monas",
    //     price: "2.2 ETH",
    //     count: "1 of 1",
    //     btnText: "Place a Bid"
    // },
    // {
    //     id: "12",
    //     img: "/img/auction_12.jpg",
    //     group: '["music","sports","collectibles"]',
    //     title: "World of Women",
    //     owner: "Victor",
    //     price: "4.3 ETH",
    //     count: "1 of 1",
    //     btnText: "Place a Bid"
    // }
]

function ExploreThree() {
    const [list, setlist] = useState([])
    // const [list2, setlist2] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [newlist, setnewlist] = useState([])

    // const location = useLocation()
    const history = useHistory()
    // const [mainlist, setmainlist] = useState([])
    // const [mainlistauc, setmainlistauc] = useState([])
    const [arr, setArr] = useState([]);
    // const [arrauc, setArrauc] = useState([]);
    const [price, setprice] = useState([])
    const [pricearr, setpricearr] = useState()
    const [payvalue, setpayvalue] = useState()
    // const [modaldatao, setmodaldatao] = useState()
    // const [modaldatac, setmodaldatac] = useState()
    // const [modaldatai, setmodaldatai] = useState()
    // const [modaldataaa, setmodaldataaa] = useState()
    // const [modaldatap, setmodaldatap] = useState()
    // const [modaldatacol, setmodaldatacol] = useState()
    // const [modaldatatok, setmodaldatatok] = useState()
    const [allfixed, setallfix] = useState([])
    const [allp, setallp] = useState([])
    const [spin, setspin] = useState()
    const [tokenid, settokenid] = useState()
    const [allprice, setallprice] = useState()
    const [dogid, setdogid] = useState([])
    const [colllist, setcolllist] = useState()
    const [alldata, setalldata] = useState([])
    const[asset,setasset] = useState(true)
    useEffect(() => {
        // console.log('1')

        salenft(0)
        nftidnew()

    }, [])

    const nftidnew = async () => {
        if (accountid && window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)

            swaping.methods.csdogenft().call({ from: userwalletaddresss })
                .then((id) => {
                    console.log("id", id);
                    setdogid(id)
                    var listlen = id?.length
                    // console.log('bn',length[0])
                    // for (let i = 0; i < listlen; i++) {
                    //     // console.log(`akk${i}`,length[0][i])
                    //     // console.log(id[i])
                    //     // nftinfo(id[i])
                    //     // salenftprie(id[i])

                    // }
                })
                .catch()
        }
    }

    const salenft = async (id) => {
        // console.log('2')
        if (accountid && window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)

            swaping.methods.listofsalenft(id).call({ from: userwalletaddresss })
                .then((length) => {
                    // console.log('aaa', length);
                    setlist(length[0])
                    // setlist2(length[1])
                    // console.log('listone', length[0])
                    var listlen = length[0]?.length
                    // console.log('bn',length[0])
                    for (let i = 0; i < listlen; i++) {
                        // console.log(`akk${i}`,length[0][i])
                        const ll = length[0][i]
                        nftinfo(ll)

                    }
                })
                .catch()

        }
    }



    const nftinfo = async (id) => {
        // console.log('4')
        if (accountid && window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)

            swaping.methods.nftinformation(id).call({ from: userwalletaddresss })
                .then((fees) => {
                    swaping.methods.listofsalenft(id).call({ from: userwalletaddresss })
                        .then((length) => {
                            const val = {
                                id: id, value: length[3]
                            }
                            // console.log('aaaprice',length);
                            // setlist(length[1])
                            // setlist2(length[1])
                            localStorage.setItem(`normasale${id}`, (length[3]))
                            setpricearr(id)
                            getallprice(val)
                            savelist({...fees,10:length[3],11:length[2]})
                            localStorage.setItem(`buylist${id}`, JSON.stringify(fees))
                            setArr(id)
                            salenftprie(fees[0])
                        })
                        .catch()
                    // console.log(`detail${id}`, fees);
                    setspin(fees)




                }).catch()

        }
    }
    const savelist = (data) => {
        setallfix((old) => [
            ...old, data
        ])


    }
    // const nftinfo2 = async (id) => {
    // console.log('alldata', allfixed)



    // useEffect(() => {
    //     // console.log('5')
    //     // console.log('lls',localStorage.getItem(`buylist1`))
    //     newlist.map((val, i) => {
    //         const pist = JSON.parse(localStorage.getItem(`buylist${val}`))
    //         // console.log('ppp',pist)
    //         setmainlist((old) => {
    //             return [...old, pist===mainlist?null:pist]
    //         })

    //     })
    // }, [arr])

    const salenftprie = async (id) => {
        // console.log('riht',id)
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)

            swaping.methods.listofsalenft(id).call({ from: userwalletaddresss })
                .then((length) => {
                    const val = {
                        id: id, value: length[3]
                    }
                    // console.log('aaaprice',length);
                    // setlist(length[1])
                    // setlist2(length[1])
                    localStorage.setItem(`normasale${id}`, (length[3]))
                    setpricearr(id)
                    getallprice(val)
                })
                .catch()

        }
    }
    const getallprice = (data) => {
        if (data.id === "0") {
            // console.log('notallowed',data)
        } else {
            // console.log('dataaallower',data)
            setallp((old) => [
                ...old, data
            ])
            setallprice(allp)
        }

    }
    // console.log('popeice', allp)
    // console.log('allpopeice', allprice)
    useEffect(() => {
        // console.log('5')
        // console.log('lls',localStorage.getItem(`buylist1`))
        newlist.map((val, i) => {
            const pist = localStorage.getItem(`normalsale${val}`)
            // console.log('ppp',pist)
            setprice((old) => {
                return [...old, pist]
            })


        })
    }, [arr, pricearr])
    const buyfixednft = async (collectionid, tokenid) => {

        let amount = Number((allp.find(p => p.id === tokenid ? allp : null)).value)
        let ckamout = amount?.length > 21 ? amount / 1000000000000000000000000000000000000 : amount / 1000000000000000000
        // console.log(collectionid, tokenid, ckamout)

        if (window.ethereum && ckamout) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            setShow(true)
            settokenid(accounts)
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)
            let amountIn = window.web3.utils.toBN(fromExponential((ckamout) * Math.pow(10, 18)));
            console.log('amout', amountIn)
            let address = '0x0000000000000000000000000000000000000000'
            swaping.methods.buynft(collectionid, tokenid, address).send({ from: userwalletaddresss, value: amountIn })
                .then((recipt) => {
                    // console.log(recipt);
                    setShow(false)
                    // localStorage.removeItem(`buylist${tokenid}`)
                    history.push('/mycollection')
                })
                .catch((err) => {
                    setShow(false)
                    settokenid('')
                })

        }
    }
    useEffect(async () => {

        totalcolection()

    }, [])
    const totalcolection = async () => {

        if (accountid && window.ethereum) {
            // setshow(true)

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)

            swaping.methods.collectionform().call({ from: userwalletaddresss })
                .then((length) => {
                    setcolllist(length)
                    // console.log('lklength', length)

                })
                .catch()

        }
    }
    useEffect(() => {
        for (let i = 1; i <= colllist; i++) {
            collectiondetails(i);
            // setspin(i)
        }


    }, [colllist])
    const collectiondetails = async (id) => {
        if (accountid && window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)

            swaping.methods.collectiondetails(id).call({ from: userwalletaddresss })
                .then((fees) => {
                    // console.log("fff", fees);
                    // setactive(id)
                    getalllist(fees)


                }).catch()

        }
    }

    const getalllist = (data) => {
        setalldata((old) => [
            ...old, data
        ])


    }
    console.log('aallcoll', alldata)
    console.log('aallfix', allfixed)

    return (
        <section className="explore-area">
            <div className="container">
                <div className="row justify-content-center text-center" >
                    <div className="col-12">
                        {/* Explore Menu */}
                        <div className="explore-menu btn-group btn-group-toggle flex-wrap d-flex justify-content-center align-item-center text-center mb-4" data-toggle="buttons">
                            <label className="btn p-2 swt-btn" onClick={()=>setasset(true)}>
                                <input type="radio" defaultValue="all" defaultChecked className="explore-btn" />
                                <span className="btn-text" >Asset</span>
                            </label>
                            <label className="btn d-table text-uppercase p-2 swt-btn" onClick={()=>setasset(false)}>
                                <input type="radio" defaultValue="art" className="explore-btn" />
                                <span className="btn-text" >Collection</span>
                            </label>
                        </div>
                    </div>
                </div>
                {
                    asset?
                
                <div className="row items">
                        {allfixed.map((item, idx) => {
                            return (
                                <div  className="col-12 col-sm-6 col-lg-4 col-md-4 item explore-item " >
                                    <div className="card">
                                        <div className="image-over card-head">
                                        <Link to={{
                                            pathname: "/item-details",
                                            state: item
                                        }} >
                                                <img className="card-img-top" src={item?item[6]:null} alt="" />
                                            </Link>
                                        </div>
                                       
                                        <div className="card-caption col-12 p-0">
                                           
                                            <div className="card-body">
                                            <Link to={{
                                            pathname: "/item-details",
                                            state: item
                                        }} >
                                                    {/* <h6>Hello</h6> */}
                                                    <h5 className="mb-0 mb-1a">{item?item[1]:null}</h5>
                                                </Link>
                                                <div className="seller d-flex align-items-center my-3 mbottom">
                                                    <div className="position-relative">
                                                        <img className="img1a" src={item?item[6]:null} alt="" />
                                                        <img className="img1b" src={item?item[6]:null} alt="" />
                                                    </div>
                                                    <Link to={{
                                            pathname: "/item-details",
                                            state: item
                                        }} >
                                                        <h6 className="ml-2 mb-0 mb-1b">{item?item[3]:null}</h6>
                                                    </Link>
                                                    <Link to={{
                                            pathname: "/item-details",
                                            state: item
                                        }} >
                                                        <h6 className="ml-2 mb-0 eth-price">{item?item[10]/1000000000000000000:null} BNB</h6>
                                                    </Link>
                                                </div>
                                                {
                                                    item?item[11]==="0"?null:
                                                    <div className="seller d-flex align-items-center my-3">
                                                    <Link to={{
                                                pathname: "/item-details",
                                                state: item
                                            }} >
                                                            <h6 className="ml-2 mb-0 mb-1b">Highest Bid</h6>
                                                        </Link>
                                                        <Link to={{
                                                pathname: "/item-details",
                                                state: item
                                            }} >
                                                            <h6 className="ml-2 mb-0 mb-1b">{item.bidPrice}</h6>
                                                        </Link>
                                                    </div>:null
                                                }
                                                {/* <div className="seller d-flex align-items-center my-3">
                                                <Link to={{
                                            pathname: "/item-details",
                                            state: item
                                        }} >
                                                        <h6 className="ml-2 mb-0 mb-1b">Highest Bid</h6>
                                                    </Link>
                                                    <Link to={{
                                            pathname: "/item-details",
                                            state: item
                                        }} >
                                                        <h6 className="ml-2 mb-0 mb-1b">{item.bidPrice}</h6>
                                                    </Link>
                                                </div> */}
                                                <Link to={{
                                            pathname: "/item-details",
                                            state: item
                                        }}className="btn btn-bordered-black btn-smaller mt-0 " href="/wallet-connect" >BUY</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>:
                    <div className="popular-collections-area myexpl">
                     <div className="row">
                    {alldata.map((val, idx) => {
                        return (
                            <>{
                                

                                <div key={`cd_${idx}`} className="col-12 col-sm-6 col-lg-4 mb-3 item">
                                <div className="card no-hover text-center">
                                    <div className="image-over" style={{height:'270px'}}>
                                    <Link to={{
                                                pathname: "/col-details",
                                                state: val
                                            }} >
                                                <img className="card-img-top"   src={`${val ? val[6] : null}`}   style={{height:'270px',objectFit:'cover'}} alt="" />
                                            </Link>
                                        {/* Seller */}
                                        <Link className="seller" to={{
                                                pathname: "/col-details",
                                                state: val
                                            }} >
                                        
                                            <div className="seller-thumb avatar-lg">
                                                <img className="rounded-circle" src={`${val ? val[6] : null}`} alt="" />
                                            </div>
                                        </Link>
                                    </div>
                                    {/* Card Caption */}
                                    <div className="card-caption col-12 p-0 pt-2">
                                        {/* Card Body */}
                                        <div className="card-body mt-4"  style={{height:'100px'}}>
                                        <Link to={{
                                                    pathname: "/col-details",
                                                    state: val
                                                }} >
                                                    <h5 className="mb-2" style={{color:'black'}}>{val ? val[2] : null}</h5>
                                                </Link>
                                                <span>{val ? val[3] : null}</span>
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
}
            </div>
        </section>
    );
}


export default ExploreThree;