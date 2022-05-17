import React, { Component } from 'react';
import axios from 'axios';
import { BsImageFill } from "react-icons/bs";
import img from './avatar_7.jpg'

const BASE_URL = "https://my-json-server.typicode.com/themeland/netstorm-json-1/author";
function AuthorProfile (props) {
  
   console.log('cc',props)
 
        return (
            <div className="card no-hover text-center" style={{backgroundColor:'#16151A',borderRadius:'10px'}}>
                <div className="image-over px-3">
                    <div className="card-img-top" style={{ height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {
                            props?.sendpic? null: <img src={img} style={{objectFit:'contain'}}/>
                        }
                        {
                            (props?.datatype?.type === "video/mp4"|| props?.datatype?.type === "video/webm" || props?.datatype?.type === "video/mov" ||props?.datatype?.type === "video/quicktime" ) && props?.sendpic? <video src={props?.sendpic} style={{objectFit:'contain',maxHeight:'400px'}} className="selectimg img-fluid" alt=""  autoPlay/>:null
                        }
                        {
                           ( props?.datatype?.type === "image/jpeg" || props?.datatype?.type ==="image/png" || props?.datatype?.type ==="image/gif" || props?.datatype?.type ==="image/svg" || props?.datatype?.type ==="image/jpg" )&& props?.sendpic? <img src={props?.sendpic} style={{objectFit:'contain',maxHeight:'400px'}} className="selectimg img-fluid" alt=""  />: null
                        }
                        {
                           ( props?.datatype?.type === "audio/mpeg")&& props?.sendpic? <audio src={props?.sendpic}   controls  />: null
                        }
                        {/* image/png */}
                        {/* Author */}
                       
                    </div>
                    {/* Author */}
                    <div className="author">
                        <div className="author-thumb avatar-lg">
                            {/* <img className="rounded-circle" src={props?.sendpic} alt="" /> */}
                        </div>
                    </div>
                </div>
                {/* Card Caption */}
                <div className="card-caption col-12 p-0">
                    {/* Card Body */}
                    
                    <div className="card-body mt-4">
                        {/* <h5 className="mb-3">{this.state.data.author}</h5>
                        <p className="my-3">{this.state.data.content}</p> */}
                        {/* <div className="input-group">
                            <input type="text" className="form-control" placeholder={this.state.data.authorId} />
                            <div className="input-group-append">
                                <button><i className="icon-docs" /></button>
                            </div>
                        </div> */}
                        {/* Social Icons */}
                        {/* <div className="social-icons d-flex justify-content-center my-3">
                            {this.state.socialData.map((item, idx) => {
                                return (
                                    <a key={`asd_${idx}`} className={item.link} href="#">
                                        <i className={item.icon} />
                                        <i className={item.icon} />
                                    </a>
                                );
                            })}
                        </div> */}
                        {/* <a className="btn btn-bordered-white btn-smaller" href="#">{this.state.data.btnText}</a> */}
                    </div>
                </div>
            </div>
        );
    }


export default AuthorProfile;