import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import nft from '../../abi/nft.json'
import { addrs } from '../../abi/address'
import { Link } from 'react-router-dom';
import { useMoralisQuery, useMoralis } from "react-moralis";




function Allasset({ allnft, acc, web3main }) {
    const [assetist, setassetlist] = useState()
    const [allcolllist, allsetcolllist] = useState([])
    const [accountid, setaccountid] = useState()
    const [chainid, setchainid] = useState()



    useEffect(async () => {
        if (acc && web3main) {
            const accounts1 = await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            setchainid(chainId)
            totalnft()

        }
    }, [acc, web3main])
    const dataa = useMoralisQuery('NEWNFT')
    // const del = dataa?.data?.find(v=>v?.attributes?.nftId==="2")
    // console.log('ffind',del)
    // const dd = del?.destroy()
    // const del = dataa?.data?.map((v)=>v.destroy())
    const { Moralis } = useMoralis();




    const totalnft = async () => {
        if (acc && web3main) {


            // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3main.eth.getAccounts();
            setaccountid(accounts)
            let userwalletaddresss = accounts[0];
            // window.web3 = new Web3(window.ethereum);
            let swaping = new web3main.eth.Contract(nft, addrs)

            swaping.methods.tokenidmint().call({ from: userwalletaddresss })
                .then((length) => {


                    setassetlist(length)

                })
                .catch()

        }
    }
    useEffect(() => {
        for (let i = 1; i <= assetist; i++) {
            nftinfo(i);


        }


    }, [assetist])

    const nftinfo = async (id) => {
        if (acc && web3main) {
            // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3main.eth.getAccounts();

            let userwalletaddresss = accounts[0];
            // window.web3 = new Web3(window.ethereum);
            let swaping = new web3main.eth.Contract(nft, addrs)

            swaping.methods.nftInformation(id).call({ from: userwalletaddresss })
                .then(async (fees) => {
                    swaping.methods.properties(id).call({ from: userwalletaddresss })
                        .then((recipt) => {

                            console.log('llll', fees)
                            getallasset({...fees,20:recipt? (JSON.parse(recipt[recipt?.length-1])[1]):null})
                        })

            


           

        }).catch ()

        }
}
const getallasset = async (data) => {
    allsetcolllist(old => [
        ...old, data
    ])

}

return (

    <section className="explore-area allasset">
        <div className="container">
            <div className="row ">
                <div className="col-12">
                    {/* Intro */}
                    <div className="intro d-flex justify-content-between align-items-end m-0">
                        <div className="intro-content">
                            <span>ALL NFTs</span>
                            <h3 className="mt-3 mb-0">ALL NFTs</h3>
                        </div>
                        {
                            allnft === "allnft" ? null : <div className="intro-btn">
                                <a className="btn content-btn text-left" href="/allnft">More</a>
                            </div>
                        }

                    </div>


                </div>
            </div>
            {
                accountid && chainid == 0x61 ?

                    <div className="row items  ">
                        {allnft === "allnft" ?
                            allcolllist?.map((item, idx) => {
                                return (
                                    <div key={`exo_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                                        <div className="card">
                                            <div className="image-over" style={{ padding: '20px' }}>
                                                {/* {
                                                    item[20]? JSON.parse(item[20][item[20]?.length]):null[1]
                                                } */}
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
                                                    <Link to={`/item-details/${item[0]}`} >
                                                        {/* <h6>Hello</h6> */}
                                                        <h5 className="mb-0 ">{item ? item[1] : null}</h5>
                                                    </Link>
                                                    <div className="seller d-flex align-items-center my-3">
                                                        <span>Owned By</span>
                                                        <Link to={`/item-details/${item[0]}`} >
                                                            <h6>cc {(dataa?.data?.find(p => p?.attributes?.nftId === item[0])?.attributes?.type)}</h6>
                                                            <h6 className="mb-0 ml-2">{item ? item[3] : null} aaa</h6>
                                                        </Link>
                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }) : allcolllist?.slice(0, 4).map((item, idx) => {
                                return (
                                    <div key={`exo_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                                        <div className="card">
                                            <div className="image-over" style={{ padding: '20px' }}>
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
                                                    <Link to={`/item-details/${item[0]}`} >
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


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                    </div> :
                    <div className="row items  ">
                        {allnft === "allnft" ?
                            dataa?.data?.map((val, idx) => {
                                return (
                                    <div key={`exo_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                                        <div className="card">
                                            <div className="image-over" style={{ padding: '20px' }}>
                                            <div style={{ minHeight: '230px' }} >
                                                            {
                                                                    (val?.attributes?.datatype === "video/mp4" || val?.attributes?.datatype === "video/mov") || val?.attributes?.datatype === "video/webm" ?
                                                                        <Link to={`/item-details/${val?.attributes?.nftId}`}>
                                                                            <video className="card-img-top" src={`https://gateway.pinata.cloud/ipfs/${val?.attributes?.nftImg}`} style={{ height: '220px', borderRadius: '7px' }} alt="" autoPlay loop />
                                                                        </Link>
                                                                        : null
                                                                }
                                                                {
                                                                    (val?.attributes?.datatype === "image/jpeg" || val?.attributes?.datatype === "image/png" || val?.attributes?.datatype === "image/gif" || val?.attributes?.datatype === "image/svg" || val?.attributes?.datatype === "image/jpg") ?
                                                                        <Link to={`/item-details/${val?.attributes?.nftId}`}>
                                                                            <img className="card-img-top" src={`https://gateway.pinata.cloud/ipfs/${val?.attributes?.nftImg}`} style={{ height: '220px', borderRadius: '7px' }} alt="" />
                                                                        </Link>
                                                                        : null
                                                                }
                                                                {
                                                                    (val?.attributes?.datatype === "audio/mpeg") ?
                                                                        <Link to={`/item-details/${val?.attributes?.nftId}`}>
                                                                            <audio className="card-img-top" src={`https://gateway.pinata.cloud/ipfs/${val?.attributes?.nftImg}`} controls />
                                                                        </Link>
                                                                        : null
                                                                }
                                                                </div>
                                            </div>
                                            {/* Card Caption */}
                                            <div className="card-caption col-12 p-0">
                                                {/* Card Body */}
                                                <div className="card-body">
                                                    <Link to={`/item-details/${val?.attributes?.nftId}`} >
                                                        {/* <h6>Hello</h6> */}
                                                        <h5 className="mb-0 ">{val?.attributes ? val?.attributes?.nftName : null}</h5>
                                                    </Link>
                                                    <div className="seller d-flex align-items-center my-3">
                                                        <span>Owned By</span>
                                                        <Link to={`/item-details/${val?.attributes?.nftId}`} >
                                                            {/* <h6>Hello</h6> */}
                                                            <h6 className="mb-0 ml-2">{val?.attributes ? val?.attributes?.ownerName : null}</h6>
                                                        </Link>
                                                    </div>

                                                    {/* <a className="btn btn-bordered-white btn-smaller mt-2" href="/login"><i className="icon-handbag mr-2" />Buy</a> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }) : dataa?.data?.slice(0, 4)?.map((val, idx) => {
                                return (
                                    <div key={`exo_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                                        <div className="card">
                                            <div className="image-over" style={{ padding: '20px' }}>
                                            <div style={{ minHeight: '230px' }} >
                                                            {
                                                                    (val?.attributes?.datatype === "video/mp4" || val?.attributes?.datatype === "video/mov") || val?.attributes?.datatype === "video/webm" ?
                                                                        <Link to={`/item-details/${val?.attributes?.nftId}`}>
                                                                            <video className="card-img-top" src={`https://gateway.pinata.cloud/ipfs/${val?.attributes?.nftImg}`} style={{ height: '220px', borderRadius: '7px' }} alt="" autoPlay loop />
                                                                        </Link>
                                                                        : null
                                                                }
                                                                {
                                                                    (val?.attributes?.datatype === "image/jpeg" || val?.attributes?.datatype === "image/png" || val?.attributes?.datatype === "image/gif" || val?.attributes?.datatype === "image/svg" || val?.attributes?.datatype === "image/jpg") ?
                                                                        <Link to={`/item-details/${val?.attributes?.nftId}`}>
                                                                            <img className="card-img-top" src={`https://gateway.pinata.cloud/ipfs/${val?.attributes?.nftImg}`} style={{ height: '220px', borderRadius: '7px' }} alt="" />
                                                                        </Link>
                                                                        : null
                                                                }
                                                                {
                                                                    (val?.attributes?.datatype === "audio/mpeg") ?
                                                                        <Link to={`/item-details/${val?.attributes?.nftId}`}>
                                                                            <audio className="card-img-top" src={`https://gateway.pinata.cloud/ipfs/${val?.attributes?.nftImg}`} controls />
                                                                        </Link>
                                                                        : null
                                                                }
                                                                </div>
                                            </div>
                                            {/* Card Caption */}
                                            <div className="card-caption col-12 p-0">
                                                {/* Card Body */}
                                                <div className="card-body">
                                                    <Link to={`/item-details/${val?.attributes?.nftId}`} >
                                                        {/* <h6>Hello</h6> */}
                                                        <h5 className="mb-0 ">{val?.attributes ? val?.attributes?.nftName : null}</h5>
                                                    </Link>
                                                    <div className="seller d-flex align-items-center my-3">
                                                        <span>Owned By</span>
                                                        <Link to={`/item-details/${val?.attributes?.nftId}`} >
                                                            {/* <h6>Hello</h6> */}
                                                            <h6 className="mb-0 ml-2">{val?.attributes ? val?.attributes?.ownerName : null}</h6>
                                                        </Link>
                                                    </div>

                                                    {/* <a className="btn btn-bordered-white btn-smaller mt-2" href="/login"><i className="icon-handbag mr-2" />Buy</a> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
            }

        </div>
    </section>
);
}


export default Allasset;