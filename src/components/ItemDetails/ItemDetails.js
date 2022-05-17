import React, { useEffect, useState } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import Web3 from 'web3'
import nft from '../../abi/nft.json'
import { addrs } from '../../abi/address'
import { Modal, Spinner } from 'react-bootstrap'
import ExploreFive from '../../components/Explore/Myasset';
import Explorethree from '../../components/Auctions/ExploreThree1'
import fromExponential from 'from-exponential';
import { useMoralisQuery,useMoralis } from "react-moralis";
import ERC20 from '../../abi/ERC20.json'
import AuctionsOne from '../Auctions/AuctionsOne';
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";



function ItemDetails({ acc, web3main }) {
    const location = useLocation()
    const fdata = location.state
    const [checkval, setcheckval] = useState(true)
    const [mfata, setmfadat] = useState()
    useEffect(() => {
        if (fdata) {
            window.scrollTo(0, 0)
        }
    }, [fdata])
    const { nftid } = useParams()
    const [buyprice, setbuyprice] = useState()
    const [buyaucprice, setaucbuyprice] = useState()
    const [openbid, setopenbid] = useState()
    const [auch, setauch] = useState()
    const [auctionprice, setauctionprice] = useState()
    const [time, settime] = useState()
    const [accountid, setaccountid] = useState()
    const [hour, sethour] = useState()
    const [days, setdays] = useState()
    const [min, setmin] = useState()
    const [saleval, setsaleval] = useState()
    const [auctionval, setauctionvalue] = useState()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [saleicon, setsaleicon] = useState()
    const [saleiconsale, setsaleiconsale] = useState()
    const history = useHistory()
    const [prop, setprop] = useState()
    const [copies, setcopies] = useState([])
    const [showprop, setshowprop] = useState(false)
    console.log('dd', prop)
    const [upgrade, setupgrade] = useState()
    const [newbid, setnewbid] = useState("")
    const [nowner, setnowner] = useState()
    const [add, setadd] = useState()
    const [gift, setgift] = useState(false)
    const [claimgift,setclaimgift] = useState()


    const dataa = useMoralisQuery('NEWNFT')
    const ffind = dataa?.data?.find((v) => v?.attributes?.nftId === nftid)
    console.log( "ffff",ffind)
    useEffect(async () => {
        if (acc && web3main) {

            salenft(nftid)
            auctiondetail(nftid)
            timer(nftid)
            const accounts = await web3main.eth.getAccounts();
            setaccountid(accounts[0])
            nftinfo(nftid)
            // nftcopies(nftid)
            proper(nftid)
            
            // owner(nftid)
            // owner(nftid)
        }
    }, [nftid, acc, web3main, ffind])
    useEffect(()=>{
        proper(nftid)
    },[nftid,web3main,ffind,mfata])



    const { Moralis } = useMoralis();

    useEffect(() => {
        if (ffind) {


        }

    }, [dataa?.data])



    const salenft = async (id) => {

        if (acc && web3main) {
            const accounts = await web3main.eth.getAccounts();
            ;
            let userwalletaddresss = accounts[0];
            // web3main = new Web3(web3main);
            let swaping = new web3main.eth.Contract(nft, addrs)
            swaping.methods.everGrowCoin(id).call({ from: userwalletaddresss })
                .then((value) => {
                    setsaleicon(value)
                    console.log('vvvnft',value)


                })

            swaping.methods.listOfSaleNft(id).call({ from: userwalletaddresss })
                .then((length) => {
                    console.log('vvvnft1',length)
                    setbuyprice((Number(length[3])).length > 21 ? (Number(length[3])) / 1000000000000000000000000000000000000 : (Number(length[3])) / 1000000000000000000)
                    setaucbuyprice((Number(length[2])).length > 21 ? (Number(length[2])) / 1000000000000000000000000000000000000 : (Number(length[2])) / 1000000000000000000)
                    ffind?.set('amout', `${((Number(length[3])).length > 21 ? (Number(length[3])) / 1000000000000000000000000000000000000 : (Number(length[3])) / 1000000000000000000)}`).save()
                    ffind?.set('auction', `${((Number(length[2])).length > 21 ? (Number(length[2])) / 1000000000000000000000000000000000000 : (Number(length[2])) / 1000000000000000000)}`).save()



                })
                .catch()

        }
    }
    const nftinfo = async (id) => {
        if (acc && web3main) {
            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            // web3main = new Web3(web3main);
            let swaping = new web3main.eth.Contract(nft, addrs)

            swaping.methods.nftInformation(id).call({ from: userwalletaddresss })
                .then((fees) => {
                    
                    console.log('ddddaaa', fees)
                    setmfadat(fees)
                    setcopies(Number(fees[4]))
                    ffind?.set("copy", `${fees[4]}`).save()

                }).catch()

        }
    }
    const nftcopies = async (tokenid) => {
        if (acc && web3main) {
            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            // web3main = new Web3(web3main);
            let swaping = new web3main.eth.Contract(nft, addrs)

            swaping.methods.numberOfCopies(tokenid).call({ from: userwalletaddresss })
                .then((length) => {
                    console.log("copies", length);
                    setcopies(Number(length))
                    ffind?.set("copy", `${length}`).save()
                })
                .catch()

        }
    }
    const buyfixednft = async (collectionid, tokenid, amount, boolval) => {



        if (acc && web3main) {

            const accounts = await web3main.eth.getAccounts();

            setShow(true)

            let userwalletaddresss = accounts[0];
            // web3main = new Web3(web3main);
            let swaping = new web3main.eth.Contract(nft, addrs)
            if (gift && add) {
                if (boolval) {


                    let tokenaddress = '0x5681caeEd9829E6E706DfFC221e48f65E177e34C';
                    const ercContract = await new web3main.eth.Contract(ERC20, tokenaddress);
                    let amountADesired = web3main.utils.toBN(fromExponential(parseInt((parseFloat(amount)) * Math.pow(10, 18))));
                    ercContract.methods.approve(addrs, amountADesired).send({ from: userwalletaddresss })
                        .then((res) => {

                            let swaping = new web3main.eth.Contract(nft, addrs)
                            swaping.methods.buyNft(collectionid, tokenid, tokenaddress, add).send({ from: userwalletaddresss })
                                .then((recipt) => {

                                    setShow(false)
                                    ffind?.set('amout', "0").save()

                                    history.push('/mycollection')
                                })
                        })
                        .catch(() => {
                            alert('Transaction failed')

                        })

                } else {
                    let amountIn = web3main.utils.toBN(fromExponential((amount) * Math.pow(10, 18)));

                    let address = '0x0000000000000000000000000000000000000000'
                    swaping.methods.buyNft(collectionid, tokenid, address, add).send({ from: userwalletaddresss, value: amountIn })
                        .then((recipt) => {
                            setShow(false)
                            ffind?.set('amout', "0").save()

                            history.push('/mycollection')
                        })
                        .catch((err) => {
                            setShow(false)

                        })

                }

            } else {
                if (boolval) {


                    let tokenaddress = '0x5681caeEd9829E6E706DfFC221e48f65E177e34C';
                    const ercContract = await new web3main.eth.Contract(ERC20, tokenaddress);
                    let amountADesired = web3main.utils.toBN(fromExponential(parseInt((parseFloat(amount)) * Math.pow(10, 18))));
                    ercContract.methods.approve(addrs, amountADesired).send({ from: userwalletaddresss })
                        .then((res) => {

                            let swaping = new web3main.eth.Contract(nft, addrs)
                            swaping.methods.buyNft(collectionid, tokenid, tokenaddress, userwalletaddresss).send({ from: userwalletaddresss })
                                .then((recipt) => {

                                    setShow(false)
                                    ffind?.set('amout', "0").save()

                                    history.push('/mycollection')
                                })
                        })
                        .catch(() => {
                            alert('Transaction failed')

                        })

                } else {
                    let amountIn = web3main.utils.toBN(fromExponential((amount) * Math.pow(10, 18)));

                    let address = '0x0000000000000000000000000000000000000000'
                    swaping.methods.buyNft(collectionid, tokenid, address, userwalletaddresss).send({ from: userwalletaddresss, value: amountIn })
                        .then((recipt) => {
                            setShow(false)
                            ffind?.set('amout', "0").save()

                            history.push('/mycollection')
                        })
                        .catch((err) => {
                            setShow(false)

                        })

                }
            }


        }
    }







    const buyfixedcopynft = async (collectionid, tokenid, amount, boolval) => {



        if (acc && web3main) {
            const accounts = await web3main.eth.getAccounts();

            setShow(true)

            let userwalletaddresss = accounts[0];
            // web3main = new Web3(web3main);
            let swaping = new web3main.eth.Contract(nft, addrs)
            if (gift && add) {
                if (boolval) {


                    let tokenaddress = '0x5681caeEd9829E6E706DfFC221e48f65E177e34C';
                    const ercContract = await new web3main.eth.Contract(ERC20, tokenaddress);
                    let amountADesired = web3main.utils.toBN(fromExponential(parseInt((parseFloat(amount)) * Math.pow(10, 18))));
                    ercContract.methods.approve(addrs, amountADesired).send({ from: userwalletaddresss })
                        .then((res) => {

                            let swaping = new web3main.eth.Contract(nft, addrs)
                            swaping.methods.buyCopies(tokenaddress, tokenid, add).send({ from: userwalletaddresss })
                                .then((recipt) => {

                                    setShow(false)
                                    ffind?.set('amout', "0").save()

                                    history.push('/mycollection')
                                })
                        })
                        .catch(() => {
                            alert('Transaction failed')

                        })

                } else {
                    let amountIn = web3main.utils.toBN(fromExponential((amount) * Math.pow(10, 18)));

                    let address = '0x0000000000000000000000000000000000000000'
                    swaping.methods.buyCopies(address, tokenid, add).send({ from: userwalletaddresss, value: amountIn })
                        .then((recipt) => {
                            setShow(false)
                            ffind?.set('amout', "0").save()

                            history.push('/mycollection')
                        })
                        .catch((err) => {
                            setShow(false)

                        })

                }

            } else {
                if (boolval) {



                    let tokenaddress = '0x5681caeEd9829E6E706DfFC221e48f65E177e34C';
                    const ercContract = await new web3main.eth.Contract(ERC20, tokenaddress);
                    let amountADesired = web3main.utils.toBN(fromExponential(parseInt((parseFloat(amount)) * Math.pow(10, 18))));
                    ercContract.methods.approve(addrs, amountADesired).send({ from: userwalletaddresss })
                        .then((res) => {

                            let swaping = new web3main.eth.Contract(nft, addrs)
                            swaping.methods.buyCopies(tokenaddress, nftid, userwalletaddresss).send({ from: userwalletaddresss })
                                .then((recipt) => {

                                    setShow(false)
                                    ffind?.set('amout', "0").save()

                                    history.push('/mycollection')
                                })
                        })
                        .catch(() => {
                            alert('Transaction failed')

                        })

                } else {
                    // alert(nftid)
                    let amountIn = web3main.utils.toBN(fromExponential((amount) * Math.pow(10, 18)));

                    let address = '0x0000000000000000000000000000000000000000'
                    swaping.methods.buyCopies(address, nftid, userwalletaddresss).send({ from: userwalletaddresss, value: amountIn })
                        .then((recipt) => {
                            setShow(false)
                            ffind?.set('amout', "0").save()

                            history.push('/mycollection')
                        })
                        .catch((err) => {
                            setShow(false)

                        })

                }
            }



        }
    }





    const auctiondetail = async (id) => {
        if (acc && web3main) {
            const accounts = await web3main.eth.getAccounts();

            let userwalletaddresss = accounts[0];
            // web3main = new Web3(web3main);
            let swaping = new web3main.eth.Contract(nft, addrs)


            swaping.methods.auctionDetail(id).call({ from: userwalletaddresss })
                .then((value) => {
                    console.log('vvv', value)
                    var aucde = {
                        id: value[1],
                        val: (Number(value[0]))?.length > 21 ? Number(value[0]) / 1000000000000000000000000000000000000 : Number(value[0]) / 1000000000000000000,
                        userid: id,
                        icon: value[2]
                    }
                    ffind?.set("highbid", `${aucde?.val}`).save()
                    
                    setauch(aucde)

                }).catch()

        }
    }
    const buyauctionnftn = async (id, boolvalue, amount) => {
        if (acc && web3main) {
            const accounts = await web3main.eth.getAccounts();

            let userwalletaddresss = accounts[0];
            // web3main = new Web3(web3main);
            let swaping = new web3main.eth.Contract(nft, addrs)
            if (boolvalue) {
                // alert('true')
                setShow(true)
                let tokenaddress = '0x5681caeEd9829E6E706DfFC221e48f65E177e34C';
                const ercContract = await new web3main.eth.Contract(ERC20, tokenaddress);
                let amountADesired = web3main.utils.toBN(fromExponential(parseInt((parseFloat(amount)) * Math.pow(10, 18))));
                ercContract.methods.approve(addrs, amountADesired).send({ from: userwalletaddresss })
                    .then((res) => {

                        let swaping = new web3main.eth.Contract(nft, addrs)
                        swaping.methods.buyAuction(id, tokenaddress, amountADesired).send({ from: userwalletaddresss })
                            .then((fees) => {
                                ffind?.set("highbid", `${amount}`).save()

                                setShow(false)
                                window.location.reload()
                            }).catch()
                    })
                    .catch(() => {
                        alert('Transaction failed')

                    })
            }
            else {
                // alert("false")
                setShow(true)

                let amountIn = web3main.utils.toBN(fromExponential((amount) * Math.pow(10, 18)));

                let tokenaddress = '0x0000000000000000000000000000000000000000'
                swaping.methods.buyAuction(id, tokenaddress, amountIn).send({ from: userwalletaddresss, value: amountIn })
                    .then((recipt) => {

                        setShow(false)
                        ffind?.set("highbid", `${amount}`).save()
                        window.location.reload()


                    })
                    .catch((err) => {
                        setShow(false)

                    })

            }
        }
    }
    const upgradebtn = async (tokenid) => {
        if (acc && window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)
            if (checkval) {



                // let amountIn = window.web3.utils.toBN(fromExponential((newbid) * Math.pow(10, 18)));
                
                if (auch?.icon) {
                    // alert('true')
                    setShow(true)
                    let tokenaddress = '0x5681caeEd9829E6E706DfFC221e48f65E177e34C';
                    const ercContract = await new web3main.eth.Contract(ERC20, tokenaddress);
                    let amountADesired = web3main.utils.toBN(fromExponential(parseInt((parseFloat(newbid)) * Math.pow(10, 18))));
                    ercContract.methods.approve(addrs, amountADesired).send({ from: userwalletaddresss })
                        .then((res) => {
    
                            let swaping = new web3main.eth.Contract(nft, addrs)
                            swaping.methods.upgradeAuction(tokenid, tokenaddress,checkval, amountADesired).send({ from: userwalletaddresss })
                                .then((fees) => {
                                    ffind?.set("highbid", `${newbid}`).save()
    
                                    setShow(false)
                                    window.location.reload()
                                }).catch()
                        })
                        .catch(() => {
                            alert('Transaction failed')
    
                        })
                }
                else {
                    // alert("false")
                    setShow(true)
    
                    let amountIn = web3main.utils.toBN(fromExponential((newbid) * Math.pow(10, 18)));
    
                    let tokenaddress = '0x0000000000000000000000000000000000000000'
                    swaping.methods.upgradeAuction(tokenid, tokenaddress,checkval, amountIn).send({ from: userwalletaddresss })
                        .then((recipt) => {
    
                            setShow(false)
                            ffind?.set("highbid", `${newbid}`).save()
                            window.location.reload()
    
    
                        })
                        .catch((err) => {
                            setShow(false)
    
                        })
    
                }
                
            } else {
                if(auch?.icon){
                    let tokenaddress = '0x5681caeEd9829E6E706DfFC221e48f65E177e34C';
                    const ercContract = await new web3main.eth.Contract(ERC20, tokenaddress);
                    
                    ercContract.methods.approve(addrs, 0).send({ from: userwalletaddresss })
                        .then((res) => {
    
                            let swaping = new web3main.eth.Contract(nft, addrs)
                            swaping.methods.upgradeAuction(tokenid, tokenaddress,checkval, 0).send({ from: userwalletaddresss })
                                .then((fees) => {
                                    ffind?.set("highbid", `${newbid}`).save()
    
                                    setShow(false)
                                    window.location.reload()
                                }).catch()
                        })
                        .catch(() => {
                            alert('Transaction failed')
    
                        })

                }else{
                let tokenaddress = '0x0000000000000000000000000000000000000000'
                swaping.methods.upgradeAuction(tokenid, tokenaddress,checkval,0).send({ from: userwalletaddresss })
                    .then((recipt) => {
                        console.log(recipt);
                    })
                    .catch()
                }
            }
        }
    }

    const timer = async (id) => {

        if (acc && web3main) {
            const accounts = await web3main.eth.getAccounts();

            let userwalletaddresss = accounts[0];
            // web3main = new Web3(web3main);
            let swaping = new web3main.eth.Contract(nft, addrs)


            swaping.methods.timing(id).call({ from: userwalletaddresss })
                .then((fees) => {

                    var day = Math.floor(fees / 86400)
                    var hr = Math.floor((fees - day * 86400) / 3600)
                    var minutesout = Math.floor((fees - day * 86400 - hr * 3600) / 60);
                    settime({ id: id, d: day, h: hr, m: minutesout })
                    // console.log('vvvxxd',`${day}`)
                    ffind?.set('days', `${day}`)
                    ffind?.set('mins', `${hr}`)
                    ffind?.set('hours',`${minutesout}`)
                    ffind?.save().then(v=>console.log('vvvxx',v))



                }).catch()

        }
    }
    const claimauctionnft = async (collectionid, tokenid) => {
        if (acc && web3main) {
            const accounts = await web3main.eth.getAccounts();

            setShow(true)
            let userwalletaddresss = accounts[0];
            // web3main = new Web3(web3main);
            let swaping = new web3main.eth.Contract(nft, addrs)
            swaping.methods.claim(collectionid, tokenid).send({ from: userwalletaddresss })
                .then((recipt) => {
                    setShow(false)
                    history.push('/mycollection')
                })
                .catch((err) => {
                    setShow(false)
                    // settokenid('')
                })
        }
    }
    const proper = async (tokenid) => {
        if (acc && web3main) {
            const accounts = await web3main.eth.getAccounts();


            let userwalletaddresss = accounts[0];
            // web3main = new Web3(web3main);
            let swaping = new web3main.eth.Contract(nft, addrs)
            swaping.methods.properties(tokenid).call({ from: userwalletaddresss })
                .then((recipt) => {
                    console.log('pppr', recipt)
                    ffind?.set('prop',JSON.stringify(recipt)).save().then(v=>console.log('pdone',v))
                    setprop(recipt)
                    // ffind?.set('prop',[recipt]).save().then(v=>console.log('pdone',v))

                })
                .catch((err) => {

                    // settokenid('')
                })
        }
    }

    const fixedsale = async (tokenid, price) => {

        setShow(true)
        if (acc && web3main) {
            const accounts = await web3main.eth.getAccounts();

            // alert(checkval)
            let userwalletaddresss = accounts[0];
            // web3main = new Web3(web3main);
            let swaping = new web3main.eth.Contract(nft, addrs)
            let amount = web3main.utils.toBN(fromExponential(((parseFloat(price)) * Math.pow(10, 18))));


            swaping.methods.fixedSales(tokenid, amount, checkval).send({ from: userwalletaddresss })
                .then((length) => {

                    if (length.status === true) {
                        setShow(false)
                        ffind?.set("amout", price).save()
                        ffind?.set("salebool", checkval).save()
                        history.push('/mycollection')

                    } else {
                        alert('failed')
                    }
                })
                .catch((err) => {
                    setShow(false)

                })

        }
    }
    const claimn = async (collectionid, id) => {

        if (acc && web3main) {
            setShow(true)
            const accounts = await web3main.eth.getAccounts();

            let userwalletaddresss = accounts[0];
            // web3main = new Web3(web3main);
            let swaping = new web3main.eth.Contract(nft, addrs)
            let token = '0x5681caeEd9829E6E706DfFC221e48f65E177e34C';
            if(claimgift && add){
                swaping.methods.claim(collectionid, id, token,add).send({ from: userwalletaddresss })
                .then((fees) => {
                    setShow(false)
                    ffind?.set("highbid", "0")
                    ffind?.set("auction", "0")
                    ffind?.save()
                    history.push('/')

                }).catch()

            }else{
                swaping.methods.claim(collectionid, id, token,userwalletaddresss).send({ from: userwalletaddresss })
                .then((fees) => {
                    setShow(false)
                    ffind?.set("highbid", "0")
                    ffind?.set("auction", "0")
                    ffind?.save()
                    history.push('/')

                }).catch()

            }

            

        }
    }
    const claimcopy = async (collectionid, id) => {

        if (acc && web3main) {
            setShow(true)
            const accounts = await web3main.eth.getAccounts();

            let userwalletaddresss = accounts[0];
            // web3main = new Web3(web3main);
            let swaping = new web3main.eth.Contract(nft, addrs)
            let token = '0x5681caeEd9829E6E706DfFC221e48f65E177e34C';
            console.log('cliamcopy')
            if(add && claimgift){

                swaping.methods.auctionCopyClaim(id, token,add).send({ from: userwalletaddresss })
                .then((fees) => {
                    setShow(false)
                    ffind?.set("highbid", "0")
                    ffind?.set("auction", "0")
                    ffind?.save()
                    history.push('/')

                }).catch()
            }else{
                swaping.methods.auctionCopyClaim(id, token,userwalletaddresss).send({ from: userwalletaddresss })
                .then((fees) => {
                    setShow(false)
                    ffind?.set("highbid", "0")
                    ffind?.set("auction", "0")
                    ffind?.save()
                    history.push('/')

                }).catch()
            }

            
        }
    }

    const auction = async (tokenid, price, endday, endhours, min) => {
        if (acc && web3main) {
            const accounts = await web3main.eth.getAccounts();


            setShow(true)


            let userwalletaddresss = accounts[0];
            // web3main = new Web3(web3main);
            let swaping = new web3main.eth.Contract(nft, addrs)
            let amountIn = web3main.utils.toBN(fromExponential((price) * Math.pow(10, 18)));

            swaping.methods.startAuction(tokenid, amountIn, endday, endhours, 5, checkval).send({ from: userwalletaddresss })
                .then((recipt) => {

                    if (recipt.status === true) {


                        ffind?.set("auction", price).save()
                        ffind?.set('bool', String(checkval)).save()
                        ffind?.set('days', endday).save()
                        ffind?.set('mins', "0").save()
                        ffind?.set('hours', endhours).save()
                        ffind?.save()

                        setShow(false)
                        history.push('/mycollection')

                    } else {
                        alert('failed')
                    }

                })
                .catch(err => {

                    setShow(false)


                })

        }
    }
    console.log('fff', ffind)
    const owner = async (tokenid) => {
        if (acc && window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)
            swaping.methods.originalOwner(tokenid).call({ from: userwalletaddresss })
                .then((length) => {
                    console.log("aaaa", length);
                    setnowner(length)
                })
                .catch()
        }
    }
 
    const removeauc = async (tokenid) => {
        if (acc && window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            setShow(true)
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)
            swaping.methods.removesFromAuction(tokenid).send({ from: userwalletaddresss })
                .then((length) => {
                    console.log(length);
                    ffind?.set('auction', "0")
                    ffind?.save()

                    window.location.reload()
                })
                .catch()
        }
    }
    const removesale = async (tokenid) => {
        if (acc && window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            setShow(true)
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)
            swaping.methods.cancelFixedSale(tokenid).send({ from: userwalletaddresss })
                .then((length) => {
                    console.log(length);
                    ffind?.set('nftPrice', "0")
                    ffind?.save()
                    window.location.reload()
                })
                .catch()
        }
    }
    console.log('ccc', time)
    useEffect(() => {
        if (dataa?.data?.length > 0 && nftid) {
            nftidone(nftid)
        }

    }, [dataa?.data, nftid])
    const nftidone = async (id) => {
        // console.log('four fun')
        if (acc && web3main) {
            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            console.log('ack', accounts)
            // web3main = new Web3(window.ethereum);
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)

            swaping.methods.nftInformation(id).call({ from: userwalletaddresss })
                .then(async (fees) => {
                    console.log("pop221", fees)
                    // setfdata(fees)
                    const findc = await dataa?.data?.find(p => p?.attributes?.nftId === fees[0])
                    console.log("vbvb", findc)
                    if (findc) {
                        console.log('vbvbyesss')

                    } else {
                        // getallasset(fees)
                        swaping.methods.properties(id).call({ from: userwalletaddresss })
                        .then((recipt) => {
                            console.log('pppr', recipt)
                            console.log('vbvbnoo')
                            const GameScore = Moralis.Object.extend("NEWNFT");
                            const gameScore = new GameScore();
                            gameScore?.set("nftName", fees[1]);
                            gameScore?.set("nftId", fees[0]);
                            gameScore?.set("ownerName", fees[3]);
                            gameScore?.set("nftDescription", fees[5]);
                            gameScore?.set("nftImg", fees[6]);
                            gameScore?.set("cath", fees[9]);
                            gameScore?.set('prop',JSON.stringify(recipt))
                            gameScore?.set("datatype",prop? (JSON.parse(recipt[recipt?.length-1])[1]):null)
                            gameScore?.save().then(v=>console.log('vbvb1',v))
                            
                            setprop(recipt)
                            // ffind?.set('prop',[recipt]).save().then(v=>console.log('pdone',v))
        
                        })
                        .catch((err) => {
        
                            // settokenid('')
                        })
                      

                    }
                    // getallasset(fees)
                    // const GameScore = Moralis.Object.extend("ALLCSDOGENFTNEW");
                    // const gameScore = new GameScore();
                    // gameScore?.set("nftName", fees[1]);
                    // gameScore?.set("nftId", fees[0]);
                    // gameScore?.set("nftOwner", fees[3]);
                    // gameScore?.set("nftDes", fees[5]);
                    // gameScore?.set("nftImg", fees[6]);
                    // gameScore?.save()

                }).catch()

        }
    }
    console.log('bb',mfata)

   const datatype =prop? (JSON.parse(prop[prop?.length-1])[1]):null
   
   console.log('datatype',ffind)
   useEffect(()=>{
       if(datatype){
           ffind?.set("datatype",datatype)
           ffind?.save()
       }

   },[datatype,ffind])
        
    

    return (
        <>
            {/* <p>{mfata?mfata[1]:null} {acc?"done":"not done"} {web3main?"dtrue":"Ntrue"} {accountid?accountid:null}lllllll</p> */}
            {
                !mfata ?
                    <>

                        <section className="item-details-area p-0 py-2" >

                            <div className="container" style={{ backgroundColor: 'transparent', padding: '20px 10px' }}>
                                <div className="row justify-content-between" >
                                    <div className="col-12 col-lg-5">
                                        <div className="item-info" >
                                            {/* <div className="item-thumb coll-img text-center" style={{ height: '450px' }}>
                                                <img src={`https://gateway.pinata.cloud/ipfs/${ffind?.attributes ? ffind?.attributes.nftImg : null}`} alt="" style={{ height: '450px', objectFit: 'contain' }} />
                                            </div> */}
                                            {
                                                            (ffind?.attributes?.datatype=== "video/mp4" || ffind?.attributes?.datatype=== "video/mov") || ffind?.attributes?.datatype=== "video/webm"?
                                                            <div className="item-thumb coll-img text-center" style={{ height: '450px' }}>
                                                                {/* <h2>video</h2> */}
                                                                 <video  alt="" style={{ height: '450px', objectFit: 'contain' }}  className='img-fluid' autoPlay loop >
                                                             <source src={`https://gateway.pinata.cloud/ipfs/${ffind?.attributes ? ffind?.attributes.nftImg : null}`} />
                                                             </video>
                                                           
                                                        </div>:null
                                                        }
                                                        
                                                        {
                                                            ( ffind?.attributes?.datatype === "image/jpeg" || ffind?.attributes?.datatype ==="image/png" || ffind?.attributes?.datatype ==="image/gif" || ffind?.attributes?.datatype ==="image/svg" || ffind?.attributes?.datatype ==="image/jpg" )?
                                                            <div className="item-thumb coll-img text-center" style={{ height: '450px' }}>
                                                                {/* <h2>img</h2> */}
                                                            <img src={`https://gateway.pinata.cloud/ipfs/${ffind?.attributes ? ffind?.attributes.nftImg : null}`} alt="" style={{ height: '450px', objectFit: 'contain' }} autoPlay />
                                                        </div>:null
                                                        }
                                                        {
                                                            ( ffind?.attributes?.datatype === "audio/mpeg" )?
                                                            <div className="item-thumb coll-img text-center" style={{ height: '450px' }}>
                                                                {/* <h2>img</h2> */}
                                                            <audio src={`https://gateway.pinata.cloud/ipfs/${ffind?.attributes ? ffind?.attributes.nftImg : null}`}  controls />
                                                        </div>:null
                                                        }

                                            {
                                                Number(ffind?.attributes?.auction) > 0 ?

                                                    <div className="card no-hover countdown-times my-4">

                                                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                                            <div style={{ display: 'flex', color: 'black', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                                                                {/* <p style={{ margin: '0px', fontSize: '20px', color: 'white' }}>Days</p> */}

                                                                <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0px', width: '60px', height: '80px', borderRadius: '5px', marginTop: '5px', fontSize: '40px', fontWeight: 'bold' }}>{ffind?.attributes?.days ? ffind?.attributes?.days : "0"} </p>
                                                                <p style={{ margin: '0px', fontSize: '15px', color: 'white' }}>Days</p>
                                                            </div>
                                                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >

                                                                <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0px', width: '60px', height: '80px', borderRadius: '5px', marginTop: '5px', fontSize: '40px', fontWeight: 'bold' }}>{ffind?.attributes?.days ? ffind?.attributes?.hours : "0"}</p>
                                                                <p style={{ margin: '0px', fontSize: '15px', color: 'white' }}>Hours</p>
                                                            </div>
                                                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                                                                <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0px', width: '60px', height: '80px', borderRadius: '5px', marginTop: '5px', fontSize: '40px', fontWeight: 'bold' }}>{ffind?.attributes?.mins ? ffind?.attributes?.mins : "0"}</p>
                                                                <p style={{ margin: '0px', fontSize: '15px', color: 'white' }}>Minutes</p>
                                                            </div>

                                                        </div>

                                                    </div> : null
                                            }



                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-6">
                                        {/* Content */}
                                        <div className="content mt-5 mt-lg-0">
                                            <h3 style={{ fontSize: '50px', color: '#99B7FF', textTransform: 'capitalize' }} className="m-0">{ffind?.attributes?.nftName}</h3>
                                            <p style={{ fontSize: '15px', color: 'black', textTransform: 'capitalize' }}>{ffind?.attributes?.nftDescription}</p>
                                            {/* Owner */}
                                            <div className="owner d-flex align-items-center">
                                                <span style={{ color: 'black' }}>Owned By</span>
                                                <a className="owner-meta no-hover d-flex align-items-center ml-3" >
                                                    {/* <img className="avatar-sm rounded-circle" src={`https://gateway.pinata.cloud/ipfs/${ffind?.attributes ? ffind?.attributes.nftImg : null}`} alt="" /> */}
                                                    <h6 className="ml-2" style={{ color: 'black',fontSize:'30px' }}>{ffind?.attributes?.ownerName}</h6>
                                                </a>
                                            </div>
                                            {/* Item Info List */}
                                            <div className="item-info-list mt-4">

                                            </div>
                                            <div className="row items">

                                                {Number(ffind?.attributes?.auction) ?
                                                    <div className="col-12 item px-lg-2">
                                                        <div className="card no-hover">
                                                            <h4 style={{ color: 'black' }} className="mt-0 mb-2">Highest Bid</h4>
                                                            <div className="price d-flex justify-content-between align-items-center">
                                                                <span style={{ color: 'black' }}>{Number(ffind?.attributes?.auction) > Number(ffind?.attributes?.highbid) ? Number(ffind?.attributes?.auction) : Number(ffind?.attributes?.highbid)} {ffind?.attributes?.bool ? "NFT" : "BNB"}</span>
                                                                <span style={{ color: 'black' }}>{ffind?.attributes?.auction} {ffind?.attributes?.bool ? "NFT" : "BNB"}</span>
                                                                <span>Copies left:{ffind?.attributes?.copy}</span>
                                                            </div>
                                                        </div>
                                                    </div> : null}
                                                {
                                                    Number(ffind?.attributes?.amout) > 0 ? <div className="col-12 item px-lg-2">
                                                        <div className="card no-hover">
                                                            <h4 style={{ color: 'black' }} className="mt-0 mb-2">Price</h4>
                                                            <div className="price d-flex justify-content-between align-items-center">
                                                                <span style={{ color: 'black' }}>{ffind?.attributes?.amout} {ffind?.attributes?.salebool ? "NFT" : "BNB"}</span>
                                                                <span>Copies left:{ffind?.attributes?.copy}</span>

                                                            </div>
                                                        </div>
                                                    </div> : null
                                                }
                                                <div className="col-12 item px-lg-2">
                                                    <div className="card no-hover">

                                                        <div className="price d-flex justify-content-between align-items-center">
                                                            <h4 style={{ color: 'black' }} className="mt-0 mb-2">Properties</h4>
                                                            <>
                                                                {
                                                                    showprop ? <AiFillCaretUp onClick={() => setshowprop(!showprop)} /> : <AiFillCaretDown onClick={() => setshowprop(!showprop)} />
                                                                }


                                                            </>



                                                        </div>
                                                        {
                                                            showprop ? <div className="row">
                                                                {
                                                                    
                                                                    JSON.parse(ffind?.attributes?.prop)?.slice(0,(JSON.parse(ffind?.attributes?.prop)?.length -1))?.map((v) => {
                                                                        return <div className="col-4 ">
                                                                            <div className="propcard text-center">
                                                                                <h4 className="m-0">{JSON.parse(v) ? JSON.parse(v)[0] : null}</h4>
                                                                                <h5 className="mt-2">{JSON.parse(v) ? JSON.parse(v)[1] : null}</h5>
                                                                            </div>

                                                                        </div>
                                                                    })
                                                                }

                                                            </div> : null
                                                        }

                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                    <Modal
                                        show={show}
                                        onHide={handleClose}
                                        backdrop="static"
                                        keyboard={false}
                                    >

                                        <Modal.Body>


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






                                        </Modal.Body>
                                    </Modal>
                                </div>
                            </div>
                        </section>

                        {
                            Number(ffind?.attributes?.auction) > 0 ?
                                <AuctionsOne /> : null
                        }
                        {
                            Number(ffind?.attributes?.amout) > 0 ?
                                <Explorethree /> : null
                        }
                    </>
                    :
                    <>
                        {

                            mfata && web3main ?
                                <>
                                    <section className="item-details-area p-0 py-2" >
                                        <div className="container" style={{ backgroundColor: 'transparent', padding: '20px 10px' }}>
                                            <div className="row justify-content-between" >
                                                <div className="col-12 col-lg-5">
                                                    <div className="item-info" >
                                                        {
                                                            (datatype=== "video/mp4" || datatype=== "video/mov") || datatype=== "video/webm"?
                                                            <div className="item-thumb coll-img text-center" style={{ height: '450px' }}>
                                                                {/* <h2>video</h2> */}
                                                                 <video  alt="" style={{ height: '450px', objectFit: 'contain' }}  className='img-fluid' autoPlay loop >
                                                             <source src={`${mfata ? `https://gateway.pinata.cloud/ipfs/${mfata[6]} ` : null}`} />
                                                             </video>
                                                           
                                                        </div>:null
                                                        }
                                                        
                                                        {
                                                            ( datatype === "image/jpeg" || datatype ==="image/png" || datatype ==="image/gif" || datatype ==="image/svg" || datatype ==="image/jpg" )?
                                                            <div className="item-thumb coll-img text-center" style={{ height: '450px' }}>
                                                                {/* <h2>img</h2> */}
                                                            <img src={`${mfata ? `https://gateway.pinata.cloud/ipfs/${mfata[6]} ` : null}`} alt="" style={{ height: '450px', objectFit: 'contain' }} autoPlay />
                                                        </div>:null
                                                        }
                                                        {
                                                            ( datatype === "audio/mpeg" )?
                                                            <div className="item-thumb coll-img text-center" style={{ height: '450px' }}>
                                                                {/* <h2>img</h2> */}
                                                            <audio src={`${mfata ? `https://gateway.pinata.cloud/ipfs/${mfata[6]} ` : null}`}  controls />
                                                        </div>:null
                                                        }

                                                        {
                                                            buyaucprice > 0 ?

                                                                <div className="card no-hover countdown-times my-4">

                                                                    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                                                        <div style={{ display: 'flex', color: 'black', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                                                                            {/* <p style={{ margin: '0px', fontSize: '20px', color: 'white' }}>Days</p> */}

                                                                            <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0px', width: '60px', height: '80px', borderRadius: '5px', marginTop: '5px', fontSize: '40px', fontWeight: 'bold' }}>{time?.d} </p>
                                                                            <p style={{ margin: '0px', fontSize: '15px', color: 'white' }}>Days</p>
                                                                        </div>
                                                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >

                                                                            <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0px', width: '60px', height: '80px', borderRadius: '5px', marginTop: '5px', fontSize: '40px', fontWeight: 'bold' }}>{time?.h}</p>
                                                                            <p style={{ margin: '0px', fontSize: '15px', color: 'white' }}>Hours</p>
                                                                        </div>
                                                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                                                                            <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0px', width: '60px', height: '80px', borderRadius: '5px', marginTop: '5px', fontSize: '40px', fontWeight: 'bold' }}>{time?.m}</p>
                                                                            <p style={{ margin: '0px', fontSize: '15px', color: 'white' }}>Minutes</p>
                                                                        </div>

                                                                    </div>

                                                                </div> : null
                                                        }

                                                        {/* Tab Content */}

                                                        {
                                                            mfata[8].toLowerCase() === accountid?.toLowerCase() && buyprice === 0 && buyaucprice === 0 ?

                                                                <div className="item-info-list mt-5 card" style={{ borderRadius: '20px', backgroundColor: 'whitesmoke', padding: '20px 10px' }} >
                                                                    <form onSubmit={(e) => {
                                                                        e.preventDefault()
                                                                        fixedsale(mfata[0], saleval)

                                                                    }}>
                                                                        <div className="col-12">
                                                                            <div className="form-group row">
                                                                                <div className="col-12 md-6 ">
                                                                                    <label for="html" className="text-center">BNB</label>
                                                                                    <input type="radio" id="bnb" name="fav_language" checked={checkval === false} onClick={() => setcheckval(false)} />
                                                                                </div>
                                                                                <div className="col-12 md-6">
                                                                                    <label for="ETH" className="text-center">NFT</label>
                                                                                    <input type="radio" id="ETH" name="fav_language" checked={checkval === true} onClick={() => setcheckval(true)} />
                                                                                </div>


                                                                            </div>
                                                                        </div>

                                                                        <div className="item-info-list mt-4">
                                                                            <h3 style={{ fontSize: '25px', color: 'whitesmoke', textTransform: 'capitalize' }}>Sale</h3>
                                                                            <input style={{ border: '2px solid rgba(255, 255, 255, 0.12)', color: 'black', borderRadius: '5px', outline: 'none' }} type="Number" placeholder="Enter bid value" step="any" min={buyaucprice > auch?.val ? buyaucprice : auch?.val} onChange={(e) => setsaleval(e.target.value)} required />
                                                                            <button type="submit" className="d-block btn btn-bordered-black mt-4 w-100" >Sale</button>
                                                                        </div>
                                                                    </form>

                                                                </div> : null
                                                        }


                                                    </div>
                                                </div>
                                                <div className="col-12 col-lg-6">
                                                    {/* Content */}
                                                    <div className="content mt-5 mt-lg-0">
                                                        <h3 style={{ fontSize: '50px', color: '#99B7FF', textTransform: 'capitalize' }} className="m-0">{mfata[1]}</h3>
                                                        <p style={{ fontSize: '15px', color: 'black', textTransform: 'capitalize' }}>{mfata[5]}</p>
                                                        {/* Owner */}
                                                        <div className="owner d-flex align-items-center">
                                                            <span style={{ color: 'black' }}>Owned By</span>
                                                            
                                                            <a className="owner-meta no-hover d-flex align-items-center ml-3" >
                                                                {/* <img className="avatar-sm rounded-circle" src={`${mfata ? `https://gateway.pinata.cloud/ipfs/${mfata[6]} ` : null}`} alt="" /> */}
                                                                <h6 className="ml-0" style={{ color: 'black',fontSize:'30px' }}>{mfata[3]}</h6>
                                                            </a>
                                                        </div>
                                                        {/* Item Info List */}
                                                        <div className="item-info-list mt-4">
                                                            <span>Copies left: {copies}</span>

                                                        </div>
                                                        <div className="row items">

                                                            {buyaucprice ?
                                                                <div className="col-12 item px-lg-2">
                                                                    <div className="card no-hover">
                                                                        <h4 style={{ color: 'black' }} className="mt-0 mb-2">Highest Bid</h4>
                                                                        <div className="price d-flex justify-content-between align-items-center">
                                                                            <span style={{ color: 'black' }}>{buyaucprice > auch?.val ? buyaucprice : auch?.val} {auch?.icon ? "NFT" : "BNB"}</span>
                                                                            <span style={{ color: 'black' }}>{buyaucprice} {auch?.icon ? "NFT" : "BNB"}</span>
                                                                            <span>Copies left: {copies}</span>
                                                                        </div>
                                                                        <h6 style={{ color: 'black' }} className="mt-2 mb-2">Highest Bid User</h6>
                                                                        <span style={{ color: 'black' }}>{auch?.id}</span>
                                                                    </div>
                                                                </div> : null}
                                                            {time?.d === 0 && time?.h === 0 && time?.m === 0 ? null
                                                                : buyaucprice > 0 ? <button style={{ border: '2px solid #99B7FF' }} className="d-block btn btn-bordered-white mt-4 w-100" onClick={() => setupgrade(true)} >Upgrade</button> : null
                                                            }

                                                            {
                                                                upgrade ? <div className="item-info-list col-12 mt-4">
                                                                    <div className="form-group row my-3">
                                                                        <div className="col-12 md-6 ">
                                                                            <label for="CLAIM">Claim</label>
                                                                            <input type="radio" id="CLAIM" name="fav_language" checked={checkval === false} onClick={() => setcheckval(false)} />
                                                                        </div>
                                                                        <div className="col-12 md-6">
                                                                            <label for="BID" >Bid</label>
                                                                            <input type="radio" id="BID" name="fav_language" checked={checkval === true} onClick={() => setcheckval(true)} />
                                                                        </div>


                                                                    </div>
                                                                    {
                                                                        checkval ? <input style={{ border: '1px solid white', outline: 'none' }} type="Number" placeholder="Enter bid value" step="any" onChange={(e) => setnewbid(e.target.value)} required /> : null
                                                                    }
                                                                    <button style={{ border: '2px solid #99B7FF' }} className="d-block btn btn-bordered-white mt-4 w-100" onClick={() => upgradebtn(mfata[0])}  >{checkval ? "Place Bid" : "Claim"}</button>

                                                                </div> : null}
                                                            {
                                                                buyprice > 0 ? <div className="col-12 item px-lg-2">
                                                                    <div className="card no-hover">
                                                                        <h4 style={{ color: 'black' }} className="mt-0 mb-2">Price</h4>
                                                                        <div className="price d-flex justify-content-between align-items-center">
                                                                            <span style={{ color: 'black' }}>{buyprice} {saleicon?"NFT" : "BNB"}</span>
                                                                            <span>Copies left: {copies}</span>
                                                                        </div>
                                                                    </div>
                                                                </div> : null
                                                            }
                                                            <div className="col-12 item px-lg-2">
                                                                <div className="card no-hover">

                                                                    <div className="price d-flex justify-content-between align-items-center">
                                                                        <h4 style={{ color: 'black' }} className="mt-0 mb-2">Properties</h4>
                                                                        <>
                                                                            {
                                                                                showprop ? <AiFillCaretUp onClick={() => setshowprop(!showprop)} /> : <AiFillCaretDown onClick={() => setshowprop(!showprop)} />
                                                                            }


                                                                        </>



                                                                    </div>
                                                                    {
                                                                        showprop ? <div className="row">
                                                                            {
                                                                                prop?.slice(0, prop.length-1)?.map((v) => {
                                                                                    return <div className="col-4 ">
                                                                                        <div className="propcard text-center">
                                                                                            <h4 className="m-0">{JSON.parse(v) ? JSON.parse(v)[0] : null}</h4>
                                                                                            <h5 className="mt-2">{JSON.parse(v) ? JSON.parse(v)[1] : null}</h5>
                                                                                        </div>

                                                                                    </div>
                                                                                })
                                                                            }

                                                                        </div> : null
                                                                    }

                                                                </div>
                                                            </div>
                                                        </div>
                                                        {
                                                            buyprice > 0 ?
                                                                copies === 0 ?

                                                                    <button style={{ border: '2px solid #99B7FF' }} className="d-block btn btn-bordered-black mt-4 w-100" onClick={() => buyfixednft(mfata[7], mfata[0], buyprice, saleicon)} >BUY</button> : <button style={{ border: '2px solid #99B7FF' }} className="d-block btn btn-bordered-black mt-4 w-100" onClick={() => buyfixedcopynft(mfata[7], mfata[0], buyprice, saleicon)} >BUY COPY</button> : null
                                                        }
                                                        {
                                                            buyprice > 0 ?
                                                                <button style={{ border: '2px solid #99B7FF' }} className="d-block btn btn-bordered-black mt-4 w-100" onClick={() => setgift(true)} >Gift</button> : null
                                                        }
                                                        {
                                                            gift ? <div >
                                                                <form onSubmit={(e) => {
                                                                    e.preventDefault()
                                                                    if (copies === 0) {
                                                                        buyfixednft(mfata[7], mfata[0], buyprice, saleicon)
                                                                    } else {
                                                                        buyfixedcopynft(mfata[7], mfata[0], buyprice, saleicon)
                                                                    }

                                                                }}>

                                                                    <input type="text" className="mt-1" placeholder="Address" onChange={(e) => setadd(e.target.value)} />
                                                                    <button style={{ border: '2px solid #99B7FF' }} className="d-block btn btn-bordered-white mt-4 w-100" >Send Gift</button>
                                                                </form> </div> : null
                                                        }
                                                        {
                                                            buyprice > 0 && mfata[10].toLowerCase() === accountid?.toLowerCase() ? <button style={{ border: '2px solid #99B7FF' }} className="d-block btn btn-bordered-white mt-4 w-100" onClick={() => removesale(mfata[0])} >Cancel</button> : null
                                                        }
                                                        {openbid ? null :
                                                            buyaucprice > 0 ?
                                                                time?.d === 0 && time?.h === 0 && time?.m === 0 ? null :
                                                                    <button style={{ border: '2px solid #99B7FF' }} className="d-block btn btn-bordered-white mt-4 w-100" onClick={() => setopenbid(true)} >BID</button> : null
                                                        }
                                                        {time?.d === 0 && time?.h === 0 && time?.m === 0 && auch?.id.toLowerCase() === accountid?.toLowerCase() ?
                                                            buyaucprice > 0 && !(buyaucprice > auch?.val) ? Number(copies)===0?<button style={{ border: '2px solid #99B7FF' }} className="d-block btn btn-bordered-white mt-4 w-100" onClick={() => claimn(mfata[7], mfata[0])}  >CLAIM</button> : <button style={{ border: '2px solid #99B7FF' }} className="d-block btn btn-bordered-white mt-4 w-100" onClick={() => claimcopy(mfata[7], mfata[0])}  >CLAIM COPY</button> : buyaucprice > 0 && buyaucprice > auch?.val ? <button style={{ border: '2px solid #99B7FF' }} className="d-block btn btn-bordered-white mt-4 w-100" onClick={() => removeauc(fdata[0])} >Cancel Auction</button> : null
                                                            : null}
                                                            {time?.d === 0 && time?.h === 0 && time?.m === 0 && auch?.id.toLowerCase() === accountid?.toLowerCase() ?
                                                            buyaucprice > 0 && !(buyaucprice > auch?.val) ? Number(copies)===0?<button style={{ border: '2px solid #99B7FF' }} className="d-block btn btn-bordered-white mt-4 w-100" onClick={() => setclaimgift(!claimgift)}  >CLAIM (Gift)</button> : <button style={{ border: '2px solid #99B7FF' }} className="d-block btn btn-bordered-white mt-4 w-100" onClick={() => setclaimgift(!claimgift)}  >CLAIM COPY (Gift)</button> : null : null
                                                            }

{
                                                            claimgift ? <div >
                                                                <form onSubmit={(e) => {
                                                                    e.preventDefault()
                                                                    if (copies === 0) {
                                                                        claimn(mfata[7], mfata[0])
                                                                    } else {
                                                                        claimcopy(mfata[7], mfata[0])
                                                                    }

                                                                }}>

                                                                    <input type="text" className="mt-1" placeholder="Address" onChange={(e) => setadd(e.target.value)} />
                                                                    <button style={{ border: '2px solid #99B7FF' }} className="d-block btn btn-bordered-white mt-4 w-100" >Send Gift</button>
                                                                </form> </div> : null
                                                        }

                                                        {
                                                            buyaucprice > 0 && mfata[10] === accountid && time?.d === 0 && time?.h === 0 && time?.m === 0 && buyaucprice >= Number(auch?.val) ? <button style={{ border: '2px solid #99B7FF' }} className="d-block btn btn-bordered-white mt-4 w-100" onClick={() => removeauc(mfata[0])} >Cancel Auction</button> : null
                                                        }

                                                        <form onSubmit={(e) => {
                                                            e.preventDefault()
                                                            buyauctionnftn(mfata[0], auch?.icon, auctionprice)

                                                        }}>
                                                            {openbid ?
                                                                <div className="item-info-list mt-4">
                                                                    <input style={{ border: 'none', outline: 'none', color: 'black' }} type="Number" placeholder="Enter bid value" step="any" min={buyaucprice > auch?.val ? buyaucprice : auch?.val} onChange={(e) => setauctionprice(e.target.value)} required />

                                                                </div> : null
                                                            }
                                                            {openbid ?
                                                                buyaucprice > 0 ?
                                                                    <button style={{ border: '2px solid #99B7FF' }} type="submit" className="btn w-100 mt-3 mt-sm-4" >BID</button> : null
                                                                : null}
                                                        </form>


                                                        {
                                                            mfata[8].toLowerCase() === accountid?.toLowerCase() && buyprice === 0 && buyaucprice === 0 ?

                                                                <div className="item-info-list mt-5 card" style={{ borderRadius: '20px', backgroundColor: 'whitesmoke', padding: '20px 10px' }}>

                                                                    <form onSubmit={(e) => {
                                                                        e.preventDefault()
                                                                        auction(mfata[0], auctionval, days, hour, min)
                                                                    }}>
                                                                        <div className="col-12">
                                                                            <div className="form-group row">
                                                                                <div className="col-12 md-6 ">
                                                                                    <label for="html" className="text-center">BNB</label>
                                                                                    <input type="radio" id="bnb" name="fav_language" checked={checkval === false} onClick={() => setcheckval(false)} />
                                                                                </div>
                                                                                <div className="col-12 md-6">
                                                                                    <label for="ETH" className="text-center">NFT</label>
                                                                                    <input type="radio" id="ETH" name="fav_language" checked={checkval === true} onClick={() => setcheckval(true)} />
                                                                                </div>


                                                                            </div>
                                                                        </div>
                                                                        <div className="item-info-list mt-4" >
                                                                            <h3 style={{ fontSize: '25px', color: 'whitesmoke', textTransform: 'capitalize' }}>Auction</h3>

                                                                            <input style={{ border: '2px solid rgba(255, 255, 255, 0.12)', borderRadius: '5px', outline: 'none', marginBottom: '4px', color: 'black' }} type="Number" placeholder="Enter bid value" step="any" min={buyaucprice > auch?.val ? buyaucprice : auch?.val} onChange={(e) => setauctionvalue(e.target.value)} required />
                                                                            <input style={{ border: '2px solid rgba(255, 255, 255, 0.12)', borderRadius: '5px', outline: 'none', marginBottom: '4px', color: 'black' }} type="Number" placeholder="Enter Days" min="0" max="30" onChange={(e) => setdays(e.target.value)} required />
                                                                            <input style={{ border: '2px solid rgba(255, 255, 255, 0.12)', borderRadius: '5px', outline: 'none', marginBottom: '4px', color: 'black' }} type="Number" placeholder="Enter Hours" min="0" max="24" onChange={(e) => sethour(e.target.value)} required />
                                                                            {/* <input style={{ border: '2px solid rgba(255, 255, 255, 0.12)', borderRadius: '5px', outline: 'none', marginBottom: '4px', color: 'black' }} type="Number" placeholder="Enter Minutes" min="0" max="24" onChange={(e) => setmin(e.target.value)} required /> */}
                                                                            <button type="submit" className="d-block btn btn-bordered-black mt-4 w-100" >Auction</button>
                                                                        </div>
                                                                    </form>
                                                                </div> : null
                                                        }

                                                    </div>
                                                </div>
                                                <Modal
                                                    show={show}
                                                    onHide={handleClose}
                                                    backdrop="static"
                                                    keyboard={false}
                                                >

                                                    <Modal.Body>


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






                                                    </Modal.Body>
                                                </Modal>
                                            </div>
                                        </div>
                                    </section>
                                    <ExploreFive colid={mfata ? mfata[7] : null} ckkid={mfata ? mfata[1] : null} />
                                </> : null
                        }
                    </>
            }
        </>
    );
}


export default ItemDetails;