import React, { Component, useEffect, useState } from 'react';
import { useHistory, useParams, useLocation } from 'react-router';
import AuthorProfile from "../AuthorProfile/AuthorProfile";
// import React, { Component, useState } from 'react';
import { useMoralis, useMoralisQuery } from "react-moralis";
import Web3 from 'web3'
import nft from '../../abi/nft.json'
import { addrs } from '../../abi/address'
import axios from 'axios'
import fromExponential from 'from-exponential'
import { Modal, Spinner } from 'react-bootstrap'
import MyExplore from '../../components/Explore/MyExplore';
import { GoDiffAdded } from "react-icons/go";
import { AiOutlineCloseSquare } from "react-icons/ai";
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';
import { listen } from 'dom-helpers';

function Astcreate({ acc }) {
    const { colid } = useParams()
    const [img, setimg] = useState()
    const [buffer, setbuffer] = useState();
    const [displayimage, setdisplayimg] = useState()
    const [checkval, setcheckval] = useState(true)
    const [checkvalclaim, setcheckvalclaim] = useState(true)
    const [checkvalroy, setcheckvalroy] = useState(true)
    const [ownername, setownername] = useState()
    const [assetname, setassetname] = useState()
    const [assetdescrip, setassetdescrip] = useState()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [alldatan, setalldatan] = useState([])
    const history = useHistory()
    const { Moralis } = useMoralis();
    const [price, setprice] = useState()
    const [royal, setroyal] = useState()
    const [supply, setsupply] = useState()
    const [cath, setcath] = useState()
    const [p, setp] = useState(false)
    const [pnum, setpunm] = useState(1)
    const [plist, setplist] = useState([])
    const [pnewlist, setnewplist] = useState([])
    const [type, settype] = useState([])
    const [name, setname] = useState([])
    const [datatype, setdatatype] = useState()
    const [datatypeone, setdatatypeone] = useState()
    const location = useLocation()
    const [tokid, settokid] = useState()
    const from = location.state
    // const ddd = JSON.stringify(plist)
    console.log("ddd", plist)
    // console.log(JSON.parse(ddd))

    const [collectionid, setcollectionid] = useState()
    useEffect(() => {
        if (acc) {
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


    const choosepic = (e) => {
        console.log('sss', e.target.files[0]?.type)
        if (e.target.files[0]?.type === "video/mp4" || e.target.files[0]?.type === "video/webm" || e.target.files[0]?.type === "audio/mpeg" || e.target.files[0]?.type === "image/jpeg" || e.target.files[0]?.type === "image/png" || e.target.files[0]?.type === "image/gif" || e.target.files[0]?.type === "image/svg" || e.target.files[0]?.type === "image/jpg") {
            setimg(e.target.files[0])
            setdatatypeone(e.target.files[0])
            setdatatype(e.target.files[0]?.type)
            const file = e.target.files[0];
            const render = new FileReader()
            render.onload = () => {
                if (render.readyState === 2) {
                    setdisplayimg(render.result)
                }
                const reader = new window.FileReader()
                reader.readAsArrayBuffer(file)
                reader.onloadend = () => {
                    const buffer = Buffer.from(reader.result);
                    setbuffer(buffer);
                }
            }
            render.readAsDataURL(e.target.files[0])
        } else {
            alert('choose suppoeted file')
        }
    }
    const submit = async (e) => {
        e.preventDefault()
        setp(false)
        // setplist([...plist, JSON.stringify(['type',`${datatype}`])])
        setShow(true)
        if (price) {

            const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
            let data = new FormData();
            data.append('file', img);
            return axios.post(url,
                data,
                {
                    headers: {
                        'Content-Type': `multipart/form-data; boundary= ${data._boundary}`,
                        'pinata_api_key': "ec9effdc900b62256d28",
                        'pinata_secret_api_key': "9d335121cc2b2dd362b4a1c0de445d91a04017c4428a35003c02395e56e4f8ab"
                    }
                }
            ).then(function (response) {
                //handle response here
                console.log('hash', response?.data)
                swaps(response?.data?.IpfsHash);
            }).catch(function (error) {
                //handle error here
                console.log('ere', error)

            });
        } else {
            const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
            //we gather a local file from the API for this example, but you can gather the file from anywhere
            let data = new FormData();
            data.append('file', img);
            return axios.post(url,
                data,
                {
                    headers: {
                        'Content-Type': `multipart/form-data; boundary= ${data._boundary}`,
                        'pinata_api_key': "ec9effdc900b62256d28",
                        'pinata_secret_api_key': "9d335121cc2b2dd362b4a1c0de445d91a04017c4428a35003c02395e56e4f8ab"
                    }
                }
            ).then(function (response) {
                //handle response here

                swapsnull(response?.data?.IpfsHash);
            }).catch(function (error) {
                //handle error here

            });

        }



    }


    const nftidn = async () => {
        if (acc && window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)

            swaping.methods.tokenidmint().call({ from: userwalletaddresss })
                .then((id) => {
                    fixedsale(id)

                })
                .catch()

        }
    }

    const swaps = async (e) => {
        if (acc && window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setShow(true)
            // setplist([...plist, JSON.stringify(['type',`${datatype}`])])
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)
            // let collectionid = colid;
            const maindata = [...plist, JSON.stringify(['type', `${datatype}`])]
            let copies = 1;
            console.log({ collectionid, userwalletaddresss, e, assetname, ownername, supply, assetdescrip, copies, royal, cath })
            swaping.methods.create(collectionid, userwalletaddresss, e, assetname, ownername, supply, assetdescrip, royal, cath, checkvalclaim, maindata).send({ from: userwalletaddresss })
                .then((data) => {
                    if (data.status === true) {
                        const GameScore = Moralis.Object.extend("NEWNFT");
                        const gameScore = new GameScore();
                        gameScore.set("nftName", assetname);
                        gameScore.set("ownerName", ownername);
                        gameScore.set("amout", price);
                        gameScore.set("nftDescription", assetdescrip);
                        gameScore.set("nftImg", e);
                        gameScore.set("collectionId", collectionid);
                        gameScore.set("nftId", data?.events?.Transfer?.returnValues?.tokenId);
                        gameScore.set("cath", cath);
                        gameScore.set("copy", `${supply}`);
                        gameScore.set('salebool', checkval)
                        gameScore.set('prop', JSON.stringify(maindata))
                        gameScore.set('datatype', `${img?.type}`)
                        settokid(data?.events?.Transfer?.returnValues?.tokenId)


                        gameScore.save()
                        nftidn()


                    } else {
                        alert('failed')
                    }
                }).catch((err) => {
                    setShow(false)
                    window.location.reload()


                })

        }
    }
    const swapsnull = async (e) => {
        if (acc && window.ethereum && collectionid) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setShow(true)

            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)
            // let collectionid = colid;
            // console.log('plost',[plist,{'type':datatype}])
            const maindata = [...plist, JSON.stringify(['type', `${datatype}`])]
            console.log('maindata', maindata)
            let copies = 1;
            swaping.methods.create(collectionid, userwalletaddresss, e, assetname, ownername, supply, assetdescrip, royal, cath, checkvalclaim, maindata).send({ from: userwalletaddresss })
                .then((fees) => {
                    if (fees.status === true) {
                        const GameScore = Moralis.Object.extend("NEWNFT");
                        const gameScore = new GameScore();
                        gameScore.set("nftName", assetname);
                        gameScore.set("ownerName", ownername);
                        gameScore.set("nftDescription", assetdescrip);
                        gameScore.set("nftImg", e);
                        gameScore.set("collectionId", collectionid);
                        gameScore.set("cath", cath);
                        gameScore.set("copy", supply);
                        gameScore.set("nftId", fees?.events?.Transfer?.returnValues?.tokenId);
                        gameScore.set('prop', JSON.stringify(maindata))
                        gameScore.set('datatype', `${img?.type}`)

                        gameScore.save()
                        // history.push(`/item-details/${fees?.events?.Transfer?.returnValues?.tokenId}`)
                        history.goBack()
                        setShow(false)



                    } else {
                        alert('failed')
                    }
                }).catch((err) => {
                    setShow(false)
                    window.location.reload()


                })

        }
    }

    const fixedsale = async (tokenid) => {
        if (acc && window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)
            let amount = window.web3.utils.toBN(fromExponential(((parseFloat(price)) * Math.pow(10, 18))));
            swaping.methods.fixedSales(tokenid, amount, checkval).send({ from: userwalletaddresss })
                .then((length) => {
                    if (length.status === true) {

                        setShow(false)
                        history.goBack()
                        // history.push(`/item-details/${tokenid}`)

                    } else {
                        alert('failed')
                    }
                })
                .catch((err) => {
                    setShow(false)
                    window.location.reload()

                })

        }
    }
    console.log('cccc', collectionid)
    const rem = (item) => {
        setplist(plist?.filter((v) => v !== item))
    }


    return (
        <section className="author-area p-0">
            <div className="container p-2">

                <div className="row justify-content-between p-2" style={{ borderRadius: '20px' }}>
                    <div className="col-12 col-md-4 mt-5" style={{ backgroundColor: 'transparent' }}>
                        {/* Author Profile */}
                        <AuthorProfile sendpic={displayimage} datatype={datatypeone} />
                    </div>
                    <div className="col-12 col-md-7">

                        <div className="intro mt-5 mt-lg-0 mb-4 mb-lg-5">
                            <div className="intro-content">
                                <span>Get Started</span>
                                <h3 className="mt-3 mb-0">Create NFTS</h3>
                            </div>
                        </div>
                        {/* Item Form */}
                        <form className="item-form card no-hover" style={{ backgroundColor: '#16151A', borderRadius: '10px' }} onSubmit={submit}>
                            <div className="row">
                                <div className="col-12">
                                    <div className="input-group form-group">
                                        <label>File type supported: JPG,JPEG,PNG,GIF,SVG,MP4 ,WEBM,MP3</label>
                                        <div className="custom-file">

                                            <input type="file" style={{ backgroundColor: "#09080D" }} className="custom-file-input" onChange={choosepic} id="inputGroupFile01" />
                                            <label style={{ backgroundColor: "#09080D" }} className="custom-file-label" htmlFor="inputGroupFile01">Choose files </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group mt-3">
                                        <input style={{ backgroundColor: "#09080D" }} type="text" className="form-control" name="name" onChange={(e) => setownername(e.target.value)} placeholder="Owner Name" required="required" />
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="form-group">
                                        <textarea style={{ backgroundColor: "#09080D" }} className="form-control" name="textarea" placeholder="Description" onChange={(e) => setassetdescrip(e.target.value)} cols={30} rows={3} defaultValue={""} />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="form-group mt-3">
                                        <input type="text" style={{ backgroundColor: "#09080D" }} className="form-control" name="dname" placeholder="Asset Name" onChange={(e) => setassetname(e.target.value)} required="required" />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6" >
                                    <div className="form-group mt-3 d-flex" >
                                        <input style={{ backgroundColor: "#09080D" }} type="number" className="form-control" name="Royalty" placeholder="Royalty" min="0" step="any" onChange={(e) => setroyal(e.target.value)} />





                                    </div>


                                </div>
                                <div className="col-12 mt-2" style={{ backgroundColor: "#09080D" }}>
                                    <h5>Royalty In:</h5>
                                    <div className="form-group row">
                                        <div className="col-12 col-md-6 ">
                                            <label for="claim1" className="text-center">BNB</label>
                                            <input type="radio" id="claim1" name="fav_language7" checked={checkvalclaim === false} onClick={() => setcheckvalclaim(false)} />
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <label for="claim2" className="text-center">NFT</label>
                                            <input type="radio" id="claim2" name="fav_language8" checked={checkvalclaim === true} onClick={() => setcheckvalclaim(true)} />
                                        </div>


                                    </div>
                                </div>


                                <div className="col-12 col-md-12">
                                    <div className="form-group mt-3" >
                                        {/* <label style={{color:'white',padding:'5px'}}>Choose Collection:</label> */}
                                        <select style={{ overflow: 'hidden', backgroundColor: '#09080D' }} value={collectionid} onChange={(e) => setcollectionid(e.target.value)}>
                                            <option value="">Choose Collection</option>
                                            {
                                                alldatan?.map((v) => {
                                                    return <option style={{ overflow: 'hidden', backgroundColor: '#09080D' ,color: 'white'}} value={v[0]} >{v ? v[2] : null}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12 col-md-12">
                                    <div className="form-group mt-3" >
                                        {/* <label style={{color:'white',padding:'5px'}}>Choose Collection:</label> */}
                                        <select style={{ overflow: 'hidden', backgroundColor: '#09080D' }} onChange={(e) => setcath(e.target.value)} required>
                                            <option value="">Choose Category</option>
                                            <option style={{ overflow: 'hidden', backgroundColor: '#09080D' , color: 'white' }} value="Art" >Art</option>
                                            <option style={{ overflow: 'hidden', backgroundColor: '#09080D' , color: 'white' }} value="Trading Card" >Trading Card</option>
                                            <option style={{ overflow: 'hidden', backgroundColor: '#09080D' , color: 'white' }} value="Collectibles" >Collectibles</option>
                                            <option style={{ overflow: 'hidden', backgroundColor: '#09080D' , color: 'white' }} value="Sports" >Sports</option>
                                            <option style={{ overflow: 'hidden', backgroundColor: '#09080D' , color: 'white' }} value="Utility" >Utility</option>

                                        </select>
                                    </div>
                                </div>
                                <div className="col-12 col-md-12">
                                    <div className="form-group mt-3">
                                        <div style={{ backgroundColor: "#09080D", display: 'flex', justifyContent: 'space-between', padding: '7px', alignItems: 'center' }} >
                                            <div>
                                                <h5 className="p-0 m-0">Properties</h5>
                                                <p className="p-0 m-0">Textual trails that show up as rectangles</p>
                                            </div>
                                            <GoDiffAdded style={{ fontSize: '35px' }} onClick={() => {
                                                setShow(true)
                                                setp(true)
                                            }}

                                            />
                                            {/* <Popup style={{ padding: '15px', backgroundColor: '#141324' }} trigger={<button>Click</button>} position="top ">
                                                                                {close => (
                                                                                    <div>
                                                                          <h4>Hello</h4>

                                                                                    </div>
                                                                                )}
                                                                            </Popup> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-12">
                                    <div className="form-group mt-3">
                                        <input style={{ backgroundColor: "#09080D" }} type="number" className="form-control" name="supply" placeholder="Supply" min="0" onChange={(e) => setsupply(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-12 col-md-12">
                                    <div className="form-group mt-3">
                                        <input style={{ backgroundColor: "#09080D" }} type="number" className="form-control" name="price" placeholder="Price" min="0" step="any" onChange={(e) => setprice(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-12 mt-2">
                                    <div className="form-group row">
                                        <div className="col-12 col-md-6 ">
                                            <label for="html" className="text-center">BNB</label>
                                            <input type="radio" id="bnb" name="fav_language5" checked={checkval === false} onClick={() => setcheckval(false)} />
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <label for="ETH" className="text-center">NFT</label>
                                            <input type="radio" id="ETH" name="fav_language6" checked={checkval === true} onClick={() => setcheckval(true)} />
                                        </div>


                                    </div>
                                </div>

                                <div className="col-12">
                                    <button className="btn w-100 mt-3 mt-sm-4" type="submit">Create Asset</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}


                    >

                        <Modal.Body className="bg-grey">

                            {
                                p ?
                                    <div className="row w-100 bg">
                                        <div className="col-12" style={{ color: 'black' }}>
                                            <h4 style={{ color: 'black', textAlign: 'center' }}>Add Properties</h4>
                                        </div>
                                        {
                                            plist?.map((v, i) => {
                                                return <>

                                                    <div className="col-6 mt-2 d-flex">
                                                        <AiOutlineCloseSquare style={{ fontSize: '25px' }} onClick={() => rem(v)} />

                                                        <input style={{ backgroundColor: "#09080D" }} type="text" className="form-control" name="Type" value={JSON.parse(v) ? JSON.parse(v)[0] : ""} placeholder="Type" min="0" step="any" onChange={(e) => settype(e.target.value)} />
                                                    </div>
                                                    <div className="col-6 mt-2">
                                                        <input style={{ backgroundColor: "#09080D" }} type="text" className="form-control" name="Name" value={JSON.parse(v) ? JSON.parse(v)[1] : ""} placeholder="Name" min="0" step="any" onChange={(e) => setname(e.target.value)} />
                                                    </div>
                                                </>
                                            })
                                        }
                                        {
                                            // [...Array(pnum)?.keys()]?.map((v, i) => {
                                            //     return <>
                                            <>
                                                <div className="col-6 mt-2 d-flex">
                                                    <AiOutlineCloseSquare style={{ fontSize: '25px' }} />

                                                    <input style={{ backgroundColor: "#09080D" }} type="text" value={type} className="form-control" name="Type" placeholder="Type" min="0" step="any" onChange={(e) => settype(e.target.value)} />
                                                </div>
                                                <div className="col-6 mt-2">
                                                    <input style={{ backgroundColor: "#09080D" }} type="text" value={name} className="form-control" name="Name" placeholder="Name" min="0" step="any" onChange={(e) => setname(e.target.value)} />
                                                </div>
                                            </>
                                            // })
                                        }

                                        <button className="m-2" style={{ border: '2px solid #003B80', padding: '5px', color: '#003B80' }} onClick={() => {
                                            setpunm(pnum + 1)
                                            setplist([...plist, JSON.stringify([type, name])])
                                            setnewplist([...plist, type, name])
                                            setname("")
                                            settype('')
                                        }}>Add More</button>
                                        <div className="col-12" style={{ borderTop: '2px solid black' }}>
                                            <button className="btn w-50 mt-3 mt-sm-4" onClick={() => {
                                                setShow(false)
                                                setplist([])

                                                setpunm(1)
                                            }} >Close</button>
                                            <button className="btn w-50 mt-3 mt-sm-4" onClick={() => {
                                                setShow(false)
                                                setplist([...plist, JSON.stringify([type, name])])
                                                setname("")
                                                settype('')
                                            }}>Save</button>

                                        </div>

                                    </div>
                                    :

                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}><Spinner animation="grow" variant="light" />
                                        <Spinner animation="grow" variant="dark" />
                                        <Spinner animation="grow" variant="dark" />
                                        <Spinner animation="grow" variant="dark" />
                                        <Spinner animation="grow" variant="dark" />
                                        <Spinner animation="grow" variant="dark" />
                                        <Spinner animation="grow" variant="dark" />
                                        <Spinner animation="grow" variant="dark" />
                                        <Spinner animation="grow" variant="dark" />
                                        <Spinner animation="grow" variant="dark" />
                                        <Spinner animation="grow" variant="dark" />
                                    </div>
                            }





                        </Modal.Body>

                    </Modal>
                </div>
            </div>


        </section>
    );
}


export default Astcreate;