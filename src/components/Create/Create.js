import React, { Component, useState } from 'react';
import AuthorProfile from "../AuthorProfile/AuthorProfile";
import Web3 from 'web3'
import nft from '../../abi/nft.json'
import { addrs } from '../../abi/address'
import { useHistory } from 'react-router-dom'
import { useMoralis, useMoralisQuery } from "react-moralis";
import { Modal, Spinner } from 'react-bootstrap'

import axios from 'axios'

import FormData from 'form-data'





function Create({ acc }) {

    const [img, setimg] = useState();
    const [buffer, setbuffer] = useState();

    const [displayimage, setdisplayimg] = useState();
    const [cath, setcath] = useState()
    const [data, setdata] = useState({
        collectionName: "", displayName: "", websiteUrl: "", collectionDescription: "", marketFee: "0"
    })
    const [show, setShow] = useState(false);
    const { Moralis } = useMoralis();
    const handleClose = () => setShow(false);
    const [datatype, setdatatype] = useState()
    const history = useHistory()
    const choosepic = (e) => {
        // console.log('img',e.target.files)
        if(e.target.files[0]?.type === "image/jpeg" || e.target.files[0]?.type ==="image/png" || e.target.files[0]?.type ==="image/gif" || e.target.files[0]?.type ==="image/svg" || e.target.files[0]?.type ==="image/jpg" ){
        setimg(e.target.files[0])
        setdatatype(e.target.files[0])
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
        if (e.target.files[0]) {
            render.readAsDataURL(e.target.files[0]);
        }
    }else{
        alert('Choose the supported file')
    }
    }
    const dataa = useMoralisQuery('NEWCREATECOLONE')
    console.log(dataa?.data?.length)
    const submit = (e) => {
        e.preventDefault()
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
            console.log('hash', response?.data)
            swaps(response?.data?.IpfsHash);
        }).catch(function (error) {
            //handle error here
            console.log('ere',error)

        });
    };
    const submit1 = async (e) => {
        e.preventDefault()
        if (img) {
            const data = new FormData()
            data.append("file", img)
            data.append("upload_preset", "insta-clone")
            data.append("cloud_name", "sannu")
            fetch("https://api.cloudinary.com/v1_1/sannu/image/upload", {
                method: "post",
                body: data
            }).then(res =>
                res.json())
                .then(data => {

                    swaps(data.url);

                }).catch()
        }

 
    }

    const swaps = async (e) => {    
        if (acc && window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setShow(true)
            // setpay('')
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)
            swaping.methods.createCollection(data.collectionName, data.displayName, data.websiteUrl, data.collectionDescription, e, parseInt(data.marketFee)).send({ from: userwalletaddresss })
                .then((fees) => {
                    if (fees.status === true) {
                        // settokenid('')
                        // setpay('suceess')
                        const GameScore = Moralis.Object.extend("NEWCREATECOLONE");
                        const gameScore = new GameScore();
                        gameScore.set("collectionName", data.collectionName);
                        gameScore.set("displayName", data.displayName);
                        gameScore.set("websiteUrl", data.websiteUrl);
                        gameScore.set("collectionDescription", data.collectionDescription);
                        gameScore.set("collectionImg", e);
                        gameScore.set("collectionId", `${dataa?.data.length + 1}`);
                        gameScore.save()
                        setShow(false)
                        history.push('/mycollection')
                    }
                    else {
                    }


                }).catch((err) => {
                    setShow(false)

                })
        }
    }

    return (
        <section className="author-area p-0" >
            <div className="container p-2" >

                <div className="row justify-content-between p-2" style={{ backgroundColor: "transparent", borderRadius: '20px' }}>
                    <div className="col-12 col-md-4 mt-5" style={{ backgroundColor: 'transparent' }}>
                        {/* Author Profile */}
                        <AuthorProfile sendpic={displayimage} datatype={datatype} />
                    </div>
                    {/* <img src={displayimage} /> */}
                    <div className="col-12 col-md-7">
                        {/* Intro */}<div className="intro mt-5 mt-lg-0 mb-4 mb-lg-5">
                            <div className="intro-content">
                                <span>Get Started</span>
                                <h3 className="mt-3 mb-0">Create Collection</h3>
                            </div>
                        </div>


                        {/* Item Form */}
                        <form className="item-form card no-hover" style={{ backgroundColor: '#16151A', borderRadius: '10px' }} onSubmit={submit}>
                            <div className="row">
                                <div className="col-12">
                                    <div className="input-group form-group" style={{ backgroundColor: "rgb(25,25,25)" }}>
                                    <label>File type supported: JPG,JPEG,PNG,GIF</label>
                                        <div className="custom-file">

                                            <input type="file" style={{ backgroundColor: "#09080D" }} className="custom-file-input" onChange={choosepic} id="inputGroupFile01" />
                                            <label className="custom-file-label" style={{ backgroundColor: "#09080D" }} htmlFor="inputGroupFile01">Choose file</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group mt-3">
                                        <input style={{ backgroundColor: "#09080D" }} type="text" className="form-control" name="name" placeholder="Collection Name" onChange={(e) => setdata({ ...data, collectionName: e.target.value })} required="required" />
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="form-group">
                                        <textarea style={{ backgroundColor: "#09080D" }} className="form-control" name="textarea" placeholder="Description" onChange={(e) => setdata({ ...data, collectionDescription: e.target.value })} cols={30} rows={3} defaultValue={""} />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="form-group mt-3">
                                        <input style={{ backgroundColor: "#09080D" }} type="text" className="form-control" name="dname" onChange={(e) => setdata({ ...data, displayName: e.target.value })} placeholder="Display Name" required="required" />
                                    </div>
                                </div>

                                <div className="col-12 col-md-6">
                                    <div className="form-group mt-3">
                                        <input style={{ backgroundColor: "#09080D" }} type="text" className="form-control" name="url" type="text" onChange={(e) => setdata({ ...data, websiteUrl: e.target.value })} placeholder="Website URL" required="required" />
                                    </div>
                                </div>


                                <div className="col-12">
                                    <button className="btn w-100 mt-3 mt-sm-4" type="submit">Create Collection</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >

                    <Modal.Body>


                        <div style={{ display: 'flex', alignItems: 'center', alignContent: 'center', justifyContent: 'space-evenly' }}><Spinner animation="grow" variant="light" />
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






                    </Modal.Body>
                </Modal>
                {/* <MyExplore /> */}
            </div>
        </section>
    );

}

export default Create;